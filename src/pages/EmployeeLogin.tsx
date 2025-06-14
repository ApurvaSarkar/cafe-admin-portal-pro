
import { useState } from "react";
import { Coffee, Lock, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { authService } from "@/services/authService";

const EmployeeLogin = () => {
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authService.login({ employeeId, password });
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${response.user.name}!`,
      });
      
      navigate("/employee/dashboard");
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: "Invalid employee ID or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 text-blue-700 hover:text-blue-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <Card className="bg-white/90 backdrop-blur-sm border-blue-200 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                <Coffee className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-blue-900">
              Employee Login
            </CardTitle>
            <p className="text-blue-700 text-sm">
              Access your employee dashboard
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="employeeId" className="text-blue-900 font-medium">
                  Employee ID
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-600" />
                  <Input
                    id="employeeId"
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    placeholder="Enter your employee ID"
                    className="pl-10 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-blue-900 font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-600" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 mt-6"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeLogin;
