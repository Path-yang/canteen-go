import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, CheckCircleIcon, ClockIcon, BellIcon } from '@heroicons/react/24/solid';

interface Order {
  id: string;
  customerName: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed';
  orderTime: string;
  paymentMethod: string;
  storeId: string;
  storeName: string;
}

// Mock orders data
const mockOrders: Order[] = [
  {
    id: 'ORD001',
    customerName: 'John Tan',
    items: [
      { name: 'Hainanese Chicken Rice', quantity: 2, price: 4.50 },
      { name: 'Brown Sugar Bubble Tea', quantity: 1, price: 3.20 }
    ],
    total: 12.20,
    status: 'pending',
    orderTime: '2025-10-27 12:30',
    paymentMethod: 'Credit Card',
    storeId: 'chicken-rice-express',
    storeName: 'Chicken Rice Express'
  },
  {
    id: 'ORD002',
    customerName: 'Sarah Lim',
    items: [
      { name: 'Nasi Lemak', quantity: 1, price: 5.50 }
    ],
    total: 5.50,
    status: 'preparing',
    orderTime: '2025-10-27 12:25',
    paymentMethod: 'Cash',
    storeId: 'mamas-malay',
    storeName: "Mama's Malay Kitchen"
  },
  {
    id: 'ORD003',
    customerName: 'David Wong',
    items: [
      { name: 'Char Kway Teow', quantity: 1, price: 4.80 },
      { name: 'Teh Tarik', quantity: 1, price: 2.00 }
    ],
    total: 6.80,
    status: 'ready',
    orderTime: '2025-10-27 12:20',
    paymentMethod: 'Credit Card',
    storeId: 'noodle-haven',
    storeName: 'Noodle Haven'
  },
  {
    id: 'ORD004',
    customerName: 'Amy Chen',
    items: [
      { name: 'Cheese Prata', quantity: 2, price: 3.50 }
    ],
    total: 7.00,
    status: 'pending',
    orderTime: '2025-10-27 12:32',
    paymentMethod: 'Cash',
    storeId: 'mr-prata',
    storeName: 'Mr. Prata'
  }
];

const StaffDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'preparing' | 'ready' | 'completed'>('all');

  const updateOrderStatus = (orderId: string, newStatus: 'pending' | 'preparing' | 'ready' | 'completed') => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));

    // Simulate push notification when order is ready
    if (newStatus === 'ready') {
      const order = orders.find(o => o.id === orderId);
      if (order && 'Notification' in window && Notification.permission === 'granted') {
        new Notification('Order Ready! 🍽️', {
          body: `Order ${orderId} for ${order.customerName} is ready for pickup!`,
          icon: '/favicon.ico'
        });
      }
    }
  };

  const requestNotificationPermission = () => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter(order => order.status === filterStatus);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'preparing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'ready': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'completed': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/menu')}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Back to Menu</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Staff Dashboard</h1>
        </div>

        <button
          onClick={requestNotificationPermission}
          className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <BellIcon className="w-5 h-5" />
          <span>Enable Notifications</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto">
        {['all', 'pending', 'preparing', 'ready', 'completed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status as any)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              filterStatus === status
                ? 'bg-orange-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
            <span className="ml-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-2 py-0.5 rounded-full text-sm">
              {status === 'all' ? orders.length : orders.filter(o => o.status === status).length}
            </span>
          </button>
        ))}
      </div>

      {/* Orders Grid */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No orders found</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {filterStatus === 'all' ? 'No orders yet' : `No ${filterStatus} orders`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-fade-in"
            >
              {/* Order Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{order.id}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{order.customerName}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {getStatusLabel(order.status)}
                </span>
              </div>

              {/* Store Info */}
              <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Store:</span> {order.storeName}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Payment:</span> {order.paymentMethod}
                </p>
              </div>

              {/* Order Items */}
              <div className="mb-4 space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-700 dark:text-gray-300">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="mb-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                  <span className="text-lg font-bold text-orange-600">${order.total.toFixed(2)}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  {order.orderTime}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                {order.status === 'pending' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'preparing')}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition-colors"
                  >
                    Start Preparing
                  </button>
                )}
                {order.status === 'preparing' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'ready')}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <CheckCircleIcon className="w-5 h-5" />
                    <span>Mark as Ready</span>
                  </button>
                )}
                {order.status === 'ready' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'completed')}
                    className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg font-medium transition-colors"
                  >
                    Mark as Completed
                  </button>
                )}
                {order.status === 'completed' && (
                  <div className="text-center py-2 text-gray-500 dark:text-gray-400 flex items-center justify-center space-x-2">
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    <span>Order Completed</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StaffDashboard;
