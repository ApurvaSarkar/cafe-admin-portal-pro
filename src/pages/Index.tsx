
import { Coffee, Users, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Coffee className="h-12 w-12 text-amber-800 mr-3" />
            <h1 className="text-4xl md:text-6xl font-bold text-amber-900">
              CafeFlow
            </h1>
          </div>
          <p className="text-xl text-amber-700 max-w-2xl mx-auto">
            Streamline your cafe operations with our comprehensive management system
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Admin Card */}
          <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-amber-200">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-amber-900 mb-2">
                  Administrator
                </h2>
                <p className="text-amber-700 mb-6">
                  Manage employees, oversee operations, and access detailed analytics
                </p>
              </div>
              <Button 
                onClick={() => navigate('/admin/login')}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
              >
                Admin Login
              </Button>
            </CardContent>
          </Card>

          {/* Employee Card */}
          <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-amber-200">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <UserCheck className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-amber-900 mb-2">
                  Employee
                </h2>
                <p className="text-amber-700 mb-6">
                  Access your daily tasks, manage orders, and track your performance
                </p>
              </div>
              <Button 
                onClick={() => navigate('/employee/login')}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
              >
                Employee Login
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-amber-900 mb-8">
            Why Choose CafeFlow?
          </h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-amber-200">
              <Coffee className="h-8 w-8 text-amber-600 mx-auto mb-3" />
              <h4 className="font-semibold text-amber-900 mb-2">Easy Management</h4>
              <p className="text-amber-700 text-sm">Streamlined operations for busy cafe environments</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-amber-200">
              <Users className="h-8 w-8 text-amber-600 mx-auto mb-3" />
              <h4 className="font-semibold text-amber-900 mb-2">Team Collaboration</h4>
              <p className="text-amber-700 text-sm">Connect your team with powerful collaboration tools</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-amber-200">
              <UserCheck className="h-8 w-8 text-amber-600 mx-auto mb-3" />
              <h4 className="font-semibold text-amber-900 mb-2">Secure Access</h4>
              <p className="text-amber-700 text-sm">Role-based permissions ensure data security</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
