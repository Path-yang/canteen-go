import React, { useState } from 'react';
import { XMarkIcon, CreditCardIcon, BanknotesIcon } from '@heroicons/react/24/solid';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete: (paymentMethod: 'card' | 'cash') => void;
  total: number;
}

type PaymentMethod = 'selection' | 'card' | 'cash';

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onPaymentComplete, total }) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('selection');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const resetForm = () => {
    setPaymentMethod('selection');
    setCardNumber('');
    setCardName('');
    setExpiryDate('');
    setCvv('');
    setIsProcessing(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleCardPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentComplete('card');
      handleClose();
    }, 2000);
  };

  const handleCashPayment = () => {
    onPaymentComplete('cash');
    handleClose();
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : cleaned;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, '');
    if (/^\d{0,16}$/.test(value)) {
      setCardNumber(formatCardNumber(value));
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\//g, '');
    if (/^\d{0,4}$/.test(value)) {
      if (value.length >= 2) {
        setExpiryDate(value.slice(0, 2) + '/' + value.slice(2));
      } else {
        setExpiryDate(value);
      }
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,3}$/.test(value)) {
      setCvv(value);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={handleClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-scale-in">
          {/* Header */}
          <div className="bg-orange-500 px-6 py-4 flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">
              {paymentMethod === 'selection' && 'Select Payment Method'}
              {paymentMethod === 'card' && 'Credit Card Payment'}
              {paymentMethod === 'cash' && 'Cash Payment'}
            </h3>
            <button
              onClick={handleClose}
              className="text-white hover:text-orange-100 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-6">
            {/* Payment Method Selection */}
            {paymentMethod === 'selection' && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <p className="text-gray-600 mb-2">Total Amount</p>
                  <p className="text-3xl font-bold text-gray-900">${total.toFixed(2)}</p>
                </div>

                <button
                  onClick={() => setPaymentMethod('card')}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-3"
                >
                  <CreditCardIcon className="w-8 h-8" />
                  <span className="text-xl font-semibold">Pay with Credit Card</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('cash')}
                  className="w-full bg-green-500 hover:bg-green-600 text-white p-6 rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-3"
                >
                  <BanknotesIcon className="w-8 h-8" />
                  <span className="text-xl font-semibold">Pay with Cash</span>
                </button>
              </div>
            )}

            {/* Credit Card Form */}
            {paymentMethod === 'card' && (
              <form onSubmit={handleCardPayment} className="space-y-4">
                <div className="text-center mb-4">
                  <p className="text-gray-600 mb-1">Total Amount</p>
                  <p className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={expiryDate}
                      onChange={handleExpiryChange}
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={cvv}
                      onChange={handleCvvChange}
                      placeholder="123"
                      maxLength={3}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('selection')}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition-colors"
                    disabled={isProcessing}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors disabled:bg-orange-300 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Processing...' : 'Pay Now'}
                  </button>
                </div>
              </form>
            )}

            {/* Cash Payment Confirmation */}
            {paymentMethod === 'cash' && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl mb-4">💵</div>
                  <p className="text-gray-600 mb-2">Total Amount to Pay</p>
                  <p className="text-3xl font-bold text-gray-900 mb-4">${total.toFixed(2)}</p>
                  <p className="text-gray-600">
                    Please prepare the exact amount and pay at the collection counter when you pick up your order.
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> Your order will be confirmed. Please pay in cash when collecting your food.
                  </p>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setPaymentMethod('selection')}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleCashPayment}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    Confirm Order
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
