import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import LoginPage from "./pages/Login";
import NotFound from "./pages/NotFound";
import Schedule from "./pages/Schedule";
import News from "./pages/News";
import Events from "./pages/Events";
import LessonPlanning from "./pages/LessonPlanning";
import MyClasses from "./pages/MyClasses";
import Homework from "./pages/Homework";
import Projects from "./pages/Projects";
import Reports from "./pages/Reports";
import ExtracurricularPlanning from "./pages/ExtracurricularPlanning";
import GroupJournals from "./pages/GroupJournals";
import ActivityPlan from "./pages/ActivityPlan";
import { Loader2 } from "lucide-react";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#f0f3f8" }}>
        <Loader2 size={32} className="animate-spin text-blue-500" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#f0f3f8" }}>
        <Loader2 size={32} className="animate-spin text-blue-500" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Index />
          </ProtectedRoute>
        }
      />
      <Route path="/schedule" element={<ProtectedRoute><Schedule /></ProtectedRoute>} />
      <Route path="/news" element={<ProtectedRoute><News /></ProtectedRoute>} />
      <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
      <Route path="/lesson-planning" element={<ProtectedRoute><LessonPlanning /></ProtectedRoute>} />
      <Route path="/my-classes" element={<ProtectedRoute><MyClasses /></ProtectedRoute>} />
      <Route path="/homework" element={<ProtectedRoute><Homework /></ProtectedRoute>} />
      <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
      <Route path="/extracurricular-planning" element={<ProtectedRoute><ExtracurricularPlanning /></ProtectedRoute>} />
      <Route path="/group-journals" element={<ProtectedRoute><GroupJournals /></ProtectedRoute>} />
      <Route path="/activity-plan" element={<ProtectedRoute><ActivityPlan /></ProtectedRoute>} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;