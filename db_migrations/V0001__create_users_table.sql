CREATE TABLE t_p6420067_teacher_journal_max.users (
  id SERIAL PRIMARY KEY,
  login VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'teacher',
  created_at TIMESTAMP DEFAULT NOW()
);