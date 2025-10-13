import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, StarIcon, FireIcon, BuildingStorefrontIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { foodItems } from '../data/foodItems';
import { stores } from '../data/stores';
import type { FoodItem } from '../contexts/CartContext';

const MenuScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStore, setSelectedStore] = useState('All');
  const [showPopularOnly, setShowPopularOnly] = useState(false);
  const [showVegetarianOnly, setShowVegetarianOnly] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const categories = ['All', ...Array.from(new Set(foodItems.map(item => item.category)))];

  const toggleFavorite = (itemId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(itemId)) {
      newFavorites.delete(itemId);
    } else {
      newFavorites.add(itemId);
    }
    setFavorites(newFavorites);
  };

  const filteredItems = foodItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesStore = selectedStore === 'All' || item.storeId === selectedStore;
    const matchesPopular = !showPopularOnly || item.isPopular;
    const matchesVegetarian = !showVegetarianOnly || item.isVegetarian;
    return matchesSearch && matchesCategory && matchesStore && matchesPopular && matchesVegetarian;
  });

  const getSpiceIndicator = (level?: number) => {
    if (!level) return null;
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: level }).map((_, i) => (
          <span key={i} className="text-red-500 text-xs">🌶️</span>
        ))}
      </div>
    );
  };

  const FoodCard: React.FC<{ item: FoodItem }> = ({ item }) => {
    const isFavorite = favorites.has(item.id);
    const store = stores.find(s => s.id === item.storeId);

    return (
      <div className="block bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden group relative">
        <Link to={`/item/${item.id}`}>
          <div className="p-6">
            <div className="flex items-start space-x-4">
              <div className="text-5xl flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                {item.image}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                        {item.name}
                      </h3>
                      {item.isPopular && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          <FireIcon className="w-3 h-3 mr-1" />
                          Popular
                        </span>
                      )}
                      {item.isVegetarian && (
                        <span className="text-green-600 text-xs">🌱</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <BuildingStorefrontIcon className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{item.storeName}</span>
                      {store?.stallNumber && (
                        <span className="text-xs text-gray-400">{store.stallNumber}</span>
                      )}
                      {store?.isHalal && (
                        <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">Halal</span>
                      )}
                    </div>
                  </div>
                  <span className="text-lg font-bold text-orange-600 ml-2">${item.price.toFixed(2)}</span>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center space-x-1">
                      <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-700">{item.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {item.prepTime}
                    </span>
                    {getSpiceIndicator(item.spiceLevel)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>

        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(item.id);
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors z-10"
        >
          {isFavorite ? (
            <HeartSolid className="w-5 h-5 text-red-500" />
          ) : (
            <HeartOutline className="w-5 h-5 text-gray-400 hover:text-red-500" />
          )}
        </button>
      </div>
    );
  };

  const StoreCard: React.FC<{ store: typeof stores[0] }> = ({ store }) => {
    const storeItems = foodItems.filter(item => item.storeId === store.id);
    const isSelected = selectedStore === store.id;

    return (
      <button
        onClick={() => setSelectedStore(isSelected ? 'All' : store.id)}
        className={`flex items-start space-x-3 p-4 rounded-xl border-2 transition-all ${
          isSelected
            ? 'border-orange-500 bg-orange-50'
            : 'border-gray-200 hover:border-orange-300 bg-white'
        }`}
      >
        <div className="text-3xl">{store.icon}</div>
        <div className="flex-1 text-left">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900">{store.name}</h3>
            {store.isHalal && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Halal</span>
            )}
          </div>
          <p className="text-xs text-gray-600 mt-0.5">{store.description}</p>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center space-x-1">
              <StarIcon className="w-3 h-3 text-yellow-400" />
              <span className="text-xs text-gray-600">{store.rating}</span>
            </div>
            <span className="text-xs text-gray-500">{storeItems.length} items</span>
            {store.stallNumber && (
              <span className="text-xs text-gray-400">{store.stallNumber}</span>
            )}
          </div>
        </div>
      </button>
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to CanteenGo
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Order from your favorite hawker stalls and skip the queues. Fresh, authentic Singapore flavors delivered fast.
        </p>
      </div>

      {/* Stores Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Browse by Stall</h2>
          {selectedStore !== 'All' && (
            <button
              onClick={() => setSelectedStore('All')}
              className="text-sm text-orange-600 hover:text-orange-700 font-medium"
            >
              View All Stalls
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stores.map(store => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for food items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowPopularOnly(!showPopularOnly)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                showPopularOnly
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FireIcon className="w-4 h-4" />
              Popular
            </button>
            <button
              onClick={() => setShowVegetarianOnly(!showVegetarianOnly)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                showVegetarianOnly
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🌱 Vegetarian
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(selectedCategory === category ? 'All' : category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      {(searchTerm || selectedCategory !== 'All' || selectedStore !== 'All' || showPopularOnly || showVegetarianOnly) && (
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Found <span className="font-semibold text-gray-900">{filteredItems.length}</span> items
            {selectedStore !== 'All' && (
              <span> from <span className="font-semibold text-orange-600">{stores.find(s => s.id === selectedStore)?.name}</span></span>
            )}
          </p>
        </div>
      )}

      {/* Food Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredItems.map(item => (
          <FoodCard key={item.id} item={item} />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSelectedStore('All');
              setShowPopularOnly(false);
              setShowVegetarianOnly(false);
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuScreen;
