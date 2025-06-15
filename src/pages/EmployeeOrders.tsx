import { useState } from "react";
import { Coffee, Clock, TrendingUp, LogOut, Menu, X, CheckCircle, AlertCircle, Package, ShoppingCart, Plus, Minus, Trash2, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const EmployeeOrders = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Customer details state
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  
  // Order state
  const [orderItems, setOrderItems] = useState([]);
  const [activeTab, setActiveTab] = useState("coffee");

  // Sample menu data
  const menuItems = {
    coffee: [
      { id: 1, name: "Espresso", price: 2.50, image: "☕" },
      { id: 2, name: "Americano", price: 3.00, image: "☕" },
      { id: 3, name: "Cappuccino", price: 3.50, image: "☕" },
      { id: 4, name: "Latte", price: 3.75, image: "☕" },
      { id: 5, name: "Mocha", price: 4.00, image: "☕" },
      { id: 6, name: "Macchiato", price: 3.25, image: "☕" },
    ],
    tea: [
      { id: 7, name: "Green Tea", price: 2.75, image: "🍵" },
      { id: 8, name: "Black Tea", price: 2.75, image: "🍵" },
      { id: 9, name: "Chai Tea Latte", price: 3.50, image: "🍵" },
      { id: 10, name: "Herbal Tea", price: 2.50, image: "🍵" },
    ],
    pastries: [
      { id: 11, name: "Croissant", price: 2.50, image: "🥐" },
      { id: 12, name: "Blueberry Muffin", price: 2.75, image: "🧁" },
      { id: 13, name: "Chocolate Chip Cookie", price: 1.50, image: "🍪" },
      { id: 14, name: "Cinnamon Roll", price: 3.00, image: "🍩" },
    ],
    sandwiches: [
      { id: 15, name: "Avocado Toast", price: 5.50, image: "🥪" },
      { id: 16, name: "Chicken Panini", price: 6.50, image: "🥪" },
      { id: 17, name: "Veggie Wrap", price: 5.75, image: "🌯" },
      { id: 18, name: "BLT Sandwich", price: 6.00, image: "🥪" },
    ],
  };

  // Customization options
  const customizationOptions = {
    coffee: [
      { id: "milk", name: "Milk", options: ["Regular", "Skim", "Almond", "Oat", "Soy"] },
      { id: "sugar", name: "Sugar", options: ["None", "Regular", "Brown", "Stevia"] },
      { id: "shots", name: "Extra Shots", options: ["0", "1", "2"] },
      { id: "syrup", name: "Syrup", options: ["None", "Vanilla", "Caramel", "Hazelnut", "Chocolate"] },
    ],
    tea: [
      { id: "milk", name: "Milk", options: ["None", "Regular", "Skim", "Almond", "Oat", "Soy"] },
      { id: "sugar", name: "Sugar", options: ["None", "Regular", "Brown", "Honey"] },
    ],
    pastries: [
      { id: "warmed", name: "Warmed", options: ["Yes", "No"] },
    ],
    sandwiches: [
      { id: "toasted", name: "Toasted", options: ["Yes", "No"] },
      { id: "side", name: "Side", options: ["None", "Chips", "Fruit", "Salad"] },
    ],
  };

  // Add item to order
  const addItemToOrder = (item) => {
    const newItem = {
      ...item,
      quantity: 1,
      customizations: {},
      itemTotal: item.price,
      uniqueId: Date.now(),
    };
    
    // Initialize default customizations
    if (customizationOptions[activeTab]) {
      customizationOptions[activeTab].forEach(option => {
        newItem.customizations[option.id] = option.options[0];
      });
    }
    
    setOrderItems([...orderItems, newItem]);
    toast({
      title: "Item Added",
      description: `${item.name} added to order.`,
    });
  };

  // Update item quantity
  const updateQuantity = (uniqueId, change) => {
    const updatedItems = orderItems.map(item => {
      if (item.uniqueId === uniqueId) {
        const newQuantity = Math.max(1, item.quantity + change);
        return {
          ...item,
          quantity: newQuantity,
          itemTotal: newQuantity * item.price
        };
      }
      return item;
    });
    setOrderItems(updatedItems);
  };

  // Remove item from order
  const removeItem = (uniqueId) => {
    setOrderItems(orderItems.filter(item => item.uniqueId !== uniqueId));
  };

  // Update customization
  const updateCustomization = (uniqueId, optionId, value) => {
    const updatedItems = orderItems.map(item => {
      if (item.uniqueId === uniqueId) {
        return {
          ...item,
          customizations: {
            ...item.customizations,
            [optionId]: value
          }
        };
      }
      return item;
    });
    setOrderItems(updatedItems);
  };

  // Calculate order total
  const orderTotal = orderItems.reduce((total, item) => total + item.itemTotal, 0);

  // Process order
  const processOrder = () => {
    if (!customerName) {
      toast({
        title: "Missing Information",
        description: "Please enter customer name.",
        variant: "destructive",
      });
      return;
    }

    if (orderItems.length === 0) {
      toast({
        title: "Empty Order",
        description: "Please add items to the order.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would send the order to a backend
    toast({
      title: "Order Placed",
      description: `Order for ${customerName} has been placed successfully.`,
    });

    // Reset form
    setCustomerName("");
    setCustomerPhone("");
    setOrderItems([]);
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
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
            className="w-full justify-start"
            onClick={() => navigate("/employee/inventory")}
          >
            <Package className="h-4 w-4 mr-3" />
            Inventory
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-blue-700 bg-blue-50"
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
          <h1 className="text-xl font-semibold text-gray-800">Order Management</h1>
          <div className="flex items-center gap-4">
            {/* Admin-only Add Button */}
            {localStorage.getItem('userRole') === 'admin' && (
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-1" />
                New Order
              </Button>
            )}
            <div className="text-sm text-gray-600">
              Welcome back, John Doe
            </div>
          </div>
        </div>

        {/* Order Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Customer Info & Order Summary */}
            <div className="lg:col-span-1 space-y-6">
              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Customer Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerName">Name</Label>
                    <Input 
                      id="customerName" 
                      placeholder="Customer Name" 
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customerPhone">Phone (Optional)</Label>
                    <Input 
                      id="customerPhone" 
                      placeholder="Phone Number" 
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                  <CardDescription>
                    {orderItems.length} item{orderItems.length !== 1 ? 's' : ''}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orderItems.length > 0 ? (
                      orderItems.map((item) => (
                        <div key={item.uniqueId} className="border rounded-lg p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center">
                                <span className="text-xl mr-2">{item.image}</span>
                                <span className="font-medium">{item.name}</span>
                              </div>
                              <div className="text-sm text-gray-500 mt-1">
                                {Object.entries(item.customizations).map(([key, value]) => (
                                  <div key={key}>
                                    {customizationOptions[activeTab]?.find(opt => opt.id === key)?.name}: {value}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">${item.itemTotal.toFixed(2)}</div>
                              <div className="flex items-center mt-1">
                                <Button 
                                  variant="outline" 
                                  size="icon" 
                                  className="h-6 w-6"
                                  onClick={() => updateQuantity(item.uniqueId, -1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="mx-2">{item.quantity}</span>
                                <Button 
                                  variant="outline" 
                                  size="icon" 
                                  className="h-6 w-6"
                                  onClick={() => updateQuantity(item.uniqueId, 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-6 w-6 ml-2 text-red-500"
                                  onClick={() => removeItem(item.uniqueId)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        No items in order yet
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <div className="w-full flex justify-between text-lg font-bold mb-4">
                    <span>Total:</span>
                    <span>${orderTotal.toFixed(2)}</span>
                  </div>
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={processOrder}
                    disabled={orderItems.length === 0}
                  >
                    <Receipt className="mr-2 h-4 w-4" />
                    Process Order
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Right Column - Menu Items */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Menu Items</CardTitle>
                  <div className="flex space-x-2 mt-2">
                    <Button 
                      variant={activeTab === "coffee" ? "default" : "outline"}
                      onClick={() => setActiveTab("coffee")}
                    >
                      Coffee
                    </Button>
                    <Button 
                      variant={activeTab === "tea" ? "default" : "outline"}
                      onClick={() => setActiveTab("tea")}
                    >
                      Tea
                    </Button>
                    <Button 
                      variant={activeTab === "pastries" ? "default" : "outline"}
                      onClick={() => setActiveTab("pastries")}
                    >
                      Pastries
                    </Button>
                    <Button 
                      variant={activeTab === "sandwiches" ? "default" : "outline"}
                      onClick={() => setActiveTab("sandwiches")}
                    >
                      Sandwiches
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {menuItems[activeTab].map((item) => (
                      <div 
                        key={item.id} 
                        className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => addItemToOrder(item)}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">{item.image}</span>
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-gray-500">${item.price.toFixed(2)}</div>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeOrders;