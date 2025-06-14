
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AdminLogin from "./pages/AdminLogin";
import EmployeeLogin from "./pages/EmployeeLogin";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/employee/login" element={<EmployeeLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/employee/dashboard" 
            element={
              <ProtectedRoute requiredRole="EMPLOYEE">
                <EmployeeDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
