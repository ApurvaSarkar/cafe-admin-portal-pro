import { useState } from "react";
import { Coffee, Clock, TrendingUp, LogOut, Menu, X, CheckCircle, AlertCircle, Package, Plus, Edit, Trash2, Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const EmployeeInventory = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  // Sample inventory data
  const inventoryItems = [
    { 
      id: 1, 
      name: "Coffee Beans - Arabica", 
      category: "Beans",
      quantity: 24, 
      unit: "kg", 
      status: "In Stock", 
      lastUpdated: "2023-10-15",
      threshold: 10
    },
    { 
      id: 2, 
      name: "Coffee Beans - Robusta", 
      category: "Beans",
      quantity: 8, 
      unit: "kg", 
      status: "Low Stock", 
      lastUpdated: "2023-10-12",
      threshold: 10
    },
    { 
      id: 3, 
      name: "Milk - Whole", 
      category: "Dairy",
      quantity: 35, 
      unit: "liters", 
      status: "In Stock", 
      lastUpdated: "2023-10-17",
      threshold: 15
    },
    { 
      id: 4, 
      name: "Milk - Almond", 
      category: "Dairy Alternative",
      quantity: 12, 
      unit: "liters", 
      status: "In Stock", 
      lastUpdated: "2023-10-16",
      threshold: 8
    },
    { 
      id: 5, 
      name: "Sugar - White", 
      category: "Sweeteners",
      quantity: 5, 
      unit: "kg", 
      status: "Low Stock", 
      lastUpdated: "2023-10-10",
      threshold: 7
    },
    { 
      id: 6, 
      name: "Chocolate Syrup", 
      category: "Syrups",
      quantity: 0, 
      unit: "bottles", 
      status: "Out of Stock", 
      lastUpdated: "2023-10-05",
      threshold: 3
    },
    { 
      id: 7, 
      name: "Vanilla Syrup", 
      category: "Syrups",
      quantity: 8, 
      unit: "bottles", 
      status: "In Stock", 
      lastUpdated: "2023-10-14",
      threshold: 5
    },
    { 
      id: 8, 
      name: "Caramel Syrup", 
      category: "Syrups",
      quantity: 4, 
      unit: "bottles", 
      status: "Low Stock", 
      lastUpdated: "2023-10-11",
      threshold: 5
    },
  ];

  // Filter inventory items based on search query
  const filteredItems = inventoryItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get counts for dashboard cards
  const totalItems = inventoryItems.length;
  const lowStockItems = inventoryItems.filter(item => item.status === "Low Stock").length;
  const outOfStockItems = inventoryItems.filter(item => item.status === "Out of Stock").length;

  const getStatusColor = (status) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800";
      case "Low Stock":
        return "bg-amber-100 text-amber-800";
      case "Out of Stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
          <Button 
            variant="ghost" 
            className="w-full justify-start"
            onClick={() => navigate("/employee/dashboard")}
          >
            <TrendingUp className="h-4 w-4 mr-3" />
            Dashboard
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-blue-700 bg-blue-50"
          >
            <Package className="h-4 w-4 mr-3" />
            Inventory
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start"
            onClick={() => navigate("/employee/orders")}
          >
            <ShoppingCart className="h-4 w-4 mr-3" />
            Orders
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
          <h1 className="text-xl font-semibold text-gray-800">Inventory Management</h1>
          <div className="text-sm text-gray-600">
            Welcome back, John Doe
          </div>
        </div>

        {/* Inventory Content */}
        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Items</p>
                    <p className="text-3xl font-bold text-gray-900">{totalItems}</p>
                  </div>
                  <Package className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                    <p className="text-3xl font-bold text-amber-600">{lowStockItems}</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-amber-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                    <p className="text-3xl font-bold text-red-600">{outOfStockItems}</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Inventory Management */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Inventory Items</CardTitle>
                  <CardDescription>Manage your cafe inventory</CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input 
                      type="text" 
                      placeholder="Search items..." 
                      className="pl-8 w-full sm:w-64"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Category</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Quantity</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Last Updated</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                          <tr key={item.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <td className="p-4 align-middle">{item.name}</td>
                            <td className="p-4 align-middle">
                              <Badge variant="outline" className="font-normal">
                                {item.category}
                              </Badge>
                            </td>
                            <td className="p-4 align-middle">
                              {item.quantity} {item.unit}
                            </td>
                            <td className="p-4 align-middle">
                              <Badge className={getStatusColor(item.status)}>
                                {item.status}
                              </Badge>
                            </td>
                            <td className="p-4 align-middle">{item.lastUpdated}</td>
                            <td className="p-4 align-middle">
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="p-4 text-center text-muted-foreground">
                            No inventory items found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmployeeInventory;