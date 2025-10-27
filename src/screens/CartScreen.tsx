import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, TrashIcon, PlusIcon, MinusIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { useCart } from '../contexts/CartContext';
import ConfirmModal from '../components/ConfirmModal';
import PaymentModal from '../components/PaymentModal';

const CartScreen: React.FC = () => {
  const navigate = useNavigate();
  const { state, updateQuantity, removeItem, clearCart } = useCart();
  const [showClearCartModal, setShowClearCartModal] = useState(false);
  const [showRemoveItemModal, setShowRemoveItemModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<{ id: string; name: string } | null>(null);

  const handleClearCart = () => {
    setShowClearCartModal(true);
  };

  const confirmClearCart = () => {
    clearCart();
  };

  const handleRemoveItem = (itemId: string, itemName: string) => {
    setItemToRemove({ id: itemId, name: itemName });
    setShowRemoveItemModal(true);
  };

  const confirmRemoveItem = () => {
    if (itemToRemove) {
      removeItem(itemToRemove.id);
      setItemToRemove(null);
    }
  };

  const handleCheckout = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentComplete = (paymentMethod: 'card' | 'cash') => {
    const paymentMethodText = paymentMethod === 'card' ? 'credit card' : 'cash';
    alert(`Order placed successfully! Payment method: ${paymentMethodText}\nTotal: $${state.total.toFixed(2)}\n\nYour order will be ready in 15-20 minutes. You will receive a notification when it's ready.`);
    clearCart();
    navigate('/menu');
  };

  if (state.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/menu')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors animate-fade-in-down"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Back to Menu</span>
        </button>

        <div className="text-center py-12 animate-fade-in">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some delicious items from our menu!</p>
          <button
            onClick={() => navigate('/menu')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate('/menu')}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors animate-fade-in-down"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        <span>Back to Menu</span>
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3 animate-fade-in">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Your Order</h2>
                <button
                  onClick={handleClearCart}
                  className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {state.items.map((item) => (
                <div key={item.id} className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl flex-shrink-0">{item.image}</div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                      <p className="text-orange-600 font-semibold mt-1">${item.price.toFixed(2)} each</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                        >
                          <MinusIcon className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                        >
                          <PlusIcon className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right min-w-0">
                        <p className="text-lg font-bold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item.id, item.name)}
                        className="text-red-500 hover:text-red-700 p-2 transition-colors"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3 animate-fade-in delay-100">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Items ({state.itemCount})</span>
                <span>${state.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Service Fee</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span>$0.00</span>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>${state.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              <CheckCircleIcon className="w-6 h-6" />
              <span>Place Order</span>
            </button>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                Estimated preparation time: 15-20 minutes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modals */}
      <ConfirmModal
        isOpen={showClearCartModal}
        onClose={() => setShowClearCartModal(false)}
        onConfirm={confirmClearCart}
        title="Clear Cart"
        message="Are you sure you want to clear your cart? All items will be removed."
        confirmText="Clear Cart"
        cancelText="Keep Items"
      />

      <ConfirmModal
        isOpen={showRemoveItemModal}
        onClose={() => {
          setShowRemoveItemModal(false);
          setItemToRemove(null);
        }}
        onConfirm={confirmRemoveItem}
        title="Remove Item"
        message={`Remove ${itemToRemove?.name || 'this item'} from your cart?`}
        confirmText="Remove"
        cancelText="Keep"
      />

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPaymentComplete={handlePaymentComplete}
        total={state.total}
      />
    </div>
  );
};

export default CartScreen;
