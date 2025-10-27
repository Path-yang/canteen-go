import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, StarIcon, ClockIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/solid';
import { foodItems } from '../data/foodItems';
import { useCart } from '../contexts/CartContext';
import ReviewForm from '../components/ReviewForm';

const ItemDetailsScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const item = foodItems.find(food => food.id === id);

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Item not found</h2>
        <button
          onClick={() => navigate('/menu')}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors"
        >
          Back to Menu
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(item);
    }
    // After adding to cart, return to the menu
    navigate('/menu');
  };

  const handleReviewSubmit = (rating: number, comment: string) => {
    // In a real app, this would send to an API
    alert(`Thank you for your review!\nRating: ${rating} stars\nComment: ${comment}`);
    setShowReviewForm(false);
  };

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

      <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-fade-in">
        <div className="md:flex">
          {/* Image Section */}
          <div className="md:w-1/2 bg-gradient-to-br from-orange-50 to-orange-100 p-12 flex items-center justify-center">
            <div className="text-8xl">{item.image}</div>
          </div>

          {/* Details Section */}
          <div className="md:w-1/2 p-8">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{item.name}</h1>
                <span className="text-3xl font-bold text-orange-600">${item.price.toFixed(2)}</span>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <StarIcon className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-gray-700 font-medium">{item.rating}</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-600">
                  <ClockIcon className="w-5 h-5" />
                  <span>{item.prepTime}</span>
                </div>
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                  {item.category}
                </span>
              </div>

              <p className="text-gray-700 leading-relaxed">{item.description}</p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">Quantity</label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <MinusIcon className="w-5 h-5 text-gray-600" />
                </button>
                <span className="text-xl font-semibold text-gray-900 w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <PlusIcon className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              <PlusIcon className="w-6 h-6" />
              <span>Add to Cart - ${(item.price * quantity).toFixed(2)}</span>
            </button>

            {/* Additional Info */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Preparation Time:</span>
                  <p>{item.prepTime}</p>
                </div>
                <div>
                  <span className="font-medium">Category:</span>
                  <p>{item.category}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nutritional Information */}
        {(item.calories || item.allergens) && (
          <div className="border-t border-gray-200 p-8 animate-fade-in">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Nutritional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {item.calories && (
                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Calories</div>
                  <div className="text-2xl font-bold text-orange-600">{item.calories} kcal</div>
                </div>
              )}
              {item.allergens && item.allergens.length > 0 && (
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-2">Allergens</div>
                  <div className="flex flex-wrap gap-2">
                    {item.allergens.map((allergen, index) => (
                      <span
                        key={index}
                        className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {allergen}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {item.allergens && item.allergens.length === 0 && (
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Allergens</div>
                  <div className="text-lg font-semibold text-green-600">No known allergens</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Reviews Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-8 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Customer Reviews</h3>
            {!showReviewForm && (
              <button
                onClick={() => setShowReviewForm(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Write Review
              </button>
            )}
          </div>

          {showReviewForm && (
            <div className="mb-6">
              <ReviewForm
                itemName={item.name}
                onSubmit={handleReviewSubmit}
                onCancel={() => setShowReviewForm(false)}
              />
            </div>
          )}

          {item.reviews && item.reviews.length > 0 ? (
            <div className="space-y-4">
              {item.reviews.map((review) => (
                <div key={review.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900 dark:text-white">{review.userName}</span>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'} fill-current`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            !showReviewForm && (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No reviews yet. Be the first to review this item!
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsScreen;
