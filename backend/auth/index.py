import os
import json
import hashlib
import secrets
import base64
import time
import psycopg
from http.server import BaseHTTPRequestHandler

DB_URL = os.environ.get("DATABASE_URL", "")
SCHEMA = os.environ.get("MAIN_DB_SCHEMA", "public")

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Content-Type": "application/json",
}


def hash_password(password: str) -> str:
    salt = secrets.token_hex(16)
    h = hashlib.sha256((salt + password).encode()).hexdigest()
    return f"{salt}:{h}"


def verify_password(password: str, stored: str) -> bool:
    salt, stored_hash = stored.split(":")
    h = hashlib.sha256((salt + password).encode()).hexdigest()
    return h == stored_hash


def generate_token(user_id: int, login: str) -> str:
    payload = {"userId": user_id, "login": login, "exp": int(time.time() * 1000) + 7 * 24 * 60 * 60 * 1000}
    return base64.b64encode(json.dumps(payload).encode()).decode()


def verify_token(token: str):
    try:
        payload = json.loads(base64.b64decode(token).decode())
        if payload["exp"] < int(time.time() * 1000):
            return None
        return payload
    except Exception:
        return None


def json_response(data, status=200):
    return {"statusCode": status, "headers": CORS_HEADERS, "body": json.dumps(data, ensure_ascii=False)}


def handler(request, context):
    method = request.get("method", "GET")
    path = request.get("path", "/")
    headers = request.get("headers", {})

    if method == "OPTIONS":
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": ""}

    try:
        body = json.loads(request.get("body", "{}") or "{}")
    except Exception:
        body = {}

    try:
        conn = psycopg.connect(DB_URL)
        cur = conn.cursor()

        # POST /register
        if path.endswith("/register") and method == "POST":
            login = body.get("login", "").strip()
            password = body.get("password", "")
            full_name = body.get("full_name", "").strip()
            role = body.get("role", "teacher")

            if not login or not password or not full_name:
                return json_response({"error": "Заполните все обязательные поля"}, 400)

            if len(login) < 3:
                return json_response({"error": "Логин должен содержать минимум 3 символа"}, 400)

            if len(password) < 6:
                return json_response({"error": "Пароль должен содержать минимум 6 символов"}, 400)

            cur.execute(f"SELECT id FROM {SCHEMA}.users WHERE login = %s", (login,))
            if cur.fetchone():
                return json_response({"error": "Пользователь с таким логином уже существует"}, 409)

            password_hash = hash_password(password)
            cur.execute(
                f"INSERT INTO {SCHEMA}.users (login, password_hash, full_name, role) VALUES (%s, %s, %s, %s) RETURNING id, login, full_name, role",
                (login, password_hash, full_name, role)
            )
            row = cur.fetchone()
            conn.commit()

            user = {"id": row[0], "login": row[1], "full_name": row[2], "role": row[3]}
            token = generate_token(user["id"], user["login"])
            return json_response({"token": token, "user": user}, 201)

        # POST /login
        if path.endswith("/login") and method == "POST":
            login = body.get("login", "").strip()
            password = body.get("password", "")

            if not login or not password:
                return json_response({"error": "Введите логин и пароль"}, 400)

            cur.execute(
                f"SELECT id, login, password_hash, full_name, role FROM {SCHEMA}.users WHERE login = %s",
                (login,)
            )
            row = cur.fetchone()

            if not row:
                return json_response({"error": "Неверный логин или пароль"}, 401)

            user_id, user_login, password_hash, full_name, role = row

            if not verify_password(password, password_hash):
                return json_response({"error": "Неверный логин или пароль"}, 401)

            token = generate_token(user_id, user_login)
            user = {"id": user_id, "login": user_login, "full_name": full_name, "role": role}
            return json_response({"token": token, "user": user}, 200)

        # POST /me
        if path.endswith("/me") and method == "POST":
            auth_header = headers.get("authorization", "") or headers.get("Authorization", "")
            if not auth_header.startswith("Bearer "):
                return json_response({"error": "Не авторизован"}, 401)

            token = auth_header[7:]
            payload = verify_token(token)

            if not payload:
                return json_response({"error": "Токен недействителен или истёк"}, 401)

            cur.execute(
                f"SELECT id, login, full_name, role FROM {SCHEMA}.users WHERE id = %s",
                (payload["userId"],)
            )
            row = cur.fetchone()

            if not row:
                return json_response({"error": "Пользователь не найден"}, 404)

            user = {"id": row[0], "login": row[1], "full_name": row[2], "role": row[3]}
            return json_response({"user": user}, 200)

        return json_response({"error": "Маршрут не найден"}, 404)

    except Exception as e:
        print(f"Auth error: {e}")
        return json_response({"error": "Внутренняя ошибка сервера"}, 500)

    finally:
        try:
            cur.close()
            conn.close()
        except Exception:
            pass
