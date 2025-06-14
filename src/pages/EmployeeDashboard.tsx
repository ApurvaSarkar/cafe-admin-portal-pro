
import { useState } from "react";
import { Coffee, Clock, TrendingUp, LogOut, Menu, X, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  const tasks = [
    { id: 1, title: "Clean espresso machine", status: "completed", time: "09:00 AM" },
    { id: 2, title: "Restock coffee beans", status: "pending", time: "10:30 AM" },
    { id: 3, title: "Update daily specials board", status: "pending", time: "11:00 AM" },
    { id: 4, title: "Inventory check - milk products", status: "completed", time: "02:00 PM" }
  ];

  const recentOrders = [
    { id: "ORD001", customer: "Sarah Johnson", items: "Large Latte, Blueberry Muffin", total: "$8.50", time: "10:45 AM" },
    { id: "ORD002", customer: "Mike Chen", items: "Cappuccino, Croissant", total: "$6.75", time: "11:20 AM" },
    { id: "ORD003", customer: "Emily Davis", items: "Americano, Danish", total: "$5.25", time: "11:35 AM" }
  ];

  const Sidebar = () => (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
      <div className="flex items-center justify-between h-16 px-6 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="flex items-center">
          <Coffee className="h-8 w-8 text-white mr-2" />
          <span className="text-white font-bold text-lg">CafeFlow</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-white hover:bg-white/20"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <nav className="mt-8 px-4">
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start text-blue-700 bg-blue-50">
            <TrendingUp className="h-4 w-4 mr-3" />
            Dashboard
          </Button>
        </div>
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full text-red-600 border-red-200 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold text-gray-800">Employee Dashboard</h1>
          <div className="text-sm text-gray-600">
            Welcome back, John Doe
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Today's Orders</p>
                    <p className="text-3xl font-bold text-gray-900">23</p>
                  </div>
                  <Coffee className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Hours Worked</p>
                    <p className="text-3xl font-bold text-green-600">6.5</p>
                  </div>
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Tasks Completed</p>
                    <p className="text-3xl font-bold text-amber-600">2/4</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-amber-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily Tasks */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {task.status === 'completed' ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-amber-500" />
                        )}
                        <div>
                          <p className={`font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
                            {task.title}
                          </p>
                          <p className="text-sm text-gray-500">{task.time}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        task.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">{order.customer}</p>
                          <p className="text-sm text-gray-600">{order.id}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-green-600">{order.total}</p>
                          <p className="text-sm text-gray-500">{order.time}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">{order.items}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
