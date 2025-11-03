import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, StarIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import ReviewModal from '../components/ReviewModal';

interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  hasReviewed: boolean;
}

interface PastOrder {
  orderId: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: 'completed' | 'cancelled';
  storeName: string;
}

// Mock past orders data
const mockPastOrders: PastOrder[] = [
  {
    orderId: 'ORD001',
    date: '2025-10-25',
    items: [
      {
        id: '1',
        name: 'Hainanese Chicken Rice',
        image: '🍗',
        price: 4.50,
        quantity: 2,
        hasReviewed: true
      },
      {
        id: '9',
        name: 'Brown Sugar Bubble Tea',
        image: '🧋',
        price: 3.20,
        quantity: 1,
        hasReviewed: false
      }
    ],
    total: 12.20,
    status: 'completed',
    storeName: 'Chicken Rice Express'
  },
  {
    orderId: 'ORD002',
    date: '2025-10-24',
    items: [
      {
        id: '4',
        name: 'Nasi Lemak',
        image: '🍚',
        price: 5.50,
        quantity: 1,
        hasReviewed: false
      },
      {
        id: '8',
        name: 'Roti Prata Kosong',
        image: '🥞',
        price: 2.50,
        quantity: 2,
        hasReviewed: false
      }
    ],
    total: 10.50,
    status: 'completed',
    storeName: "Mama's Malay Kitchen"
  },
  {
    orderId: 'ORD003',
    date: '2025-10-23',
    items: [
      {
        id: '3',
        name: 'Char Kway Teow',
        image: '🍝',
        price: 4.80,
        quantity: 1,
        hasReviewed: true
      }
    ],
    total: 4.80,
    status: 'completed',
    storeName: 'Noodle Haven'
  }
];

const OrderHistory: React.FC = () => {
  const navigate = useNavigate();
  const [pastOrders, setPastOrders] = useState<PastOrder[]>(mockPastOrders);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ orderId: string; item: OrderItem } | null>(null);

  const handleReviewClick = (orderId: string, item: OrderItem) => {
    setSelectedItem({ orderId, item });
    setReviewModalOpen(true);
  };

  const handleReviewSubmit = (rating: number, comment: string) => {
    if (!selectedItem) return;

    // Update the order to mark item as reviewed
    setPastOrders(orders =>
      orders.map(order => {
        if (order.orderId === selectedItem.orderId) {
          return {
            ...order,
            items: order.items.map(item =>
              item.id === selectedItem.item.id
                ? { ...item, hasReviewed: true }
                : item
            )
          };
        }
        return order;
      })
    );

    // Show success message
    alert(`Thank you for your ${rating}-star review!\n\nReview: "${comment}"\n\nYour feedback helps other students make better choices.`);

    setReviewModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <button
        onClick={() => navigate('/menu')}
        className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors animate-fade-in-down"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        <span>Back to Menu</span>
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Order History</h1>
        <p className="text-gray-600 dark:text-gray-400">View your past orders and leave reviews</p>
      </div>

      {/* Orders List */}
      {pastOrders.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No orders yet</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Start ordering to see your history here</p>
          <button
            onClick={() => navigate('/menu')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Browse Menu
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {pastOrders.map((order) => (
            <div
              key={order.orderId}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in"
            >
              {/* Order Header */}
              <div className="bg-gray-50 dark:bg-gray-750 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Order #{order.orderId}
                      </h3>
                      <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                        <CheckCircleIcon className="w-4 h-4" />
                        <span>Completed</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <ClockIcon className="w-4 h-4" />
                        <span>{order.date}</span>
                      </div>
                      <span>•</span>
                      <span>{order.storeName}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${order.total.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {order.items.map((item) => (
                  <div key={item.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="text-3xl">{item.image}</div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {item.name}
                          </h4>
                          <div className="flex items-center space-x-3 mt-1">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Qty: {item.quantity}
                            </span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">•</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Review Button */}
                      <div>
                        {item.hasReviewed ? (
                          <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                            <StarIcon className="w-5 h-5 fill-current" />
                            <span className="text-sm font-medium">Reviewed</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleReviewClick(order.orderId, item)}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                          >
                            <StarIcon className="w-4 h-4" />
                            <span>Write Review</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      {selectedItem && (
        <ReviewModal
          isOpen={reviewModalOpen}
          onClose={() => {
            setReviewModalOpen(false);
            setSelectedItem(null);
          }}
          itemName={selectedItem.item.name}
          itemImage={selectedItem.item.image}
          onSubmit={handleReviewSubmit}
        />
      )}
    </div>
  );
};

export default OrderHistory;
