# 🍽️ CanteenGo - Campus Food Ordering App

A modern, responsive web application for ordering food from campus canteens. Built with React, TypeScript, and Tailwind CSS, featuring a beautiful UI inspired by modern design principles.

## ✨ Features

- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **🔍 Smart Search**: Search and filter food items by name, description, or category
- **🛒 Shopping Cart**: Add items, adjust quantities, and manage your order
- **⚡ Fast Performance**: Built with Vite for lightning-fast development and builds
- **🎨 Beautiful UI**: Modern design with smooth animations and intuitive interactions
- **📊 Real-time Updates**: Cart updates instantly as you add or remove items

## 🚀 Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd canteen-go
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to see the app in action!

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Header.tsx      # Navigation header with cart indicator
├── contexts/           # React Context for state management
│   └── CartContext.tsx # Cart state and operations
├── data/              # Mock data and constants
│   └── foodItems.ts   # Sample food items data
├── screens/           # Main application screens
│   ├── MenuScreen.tsx      # Food menu with search and filters
│   ├── ItemDetailsScreen.tsx # Individual item details
│   └── CartScreen.tsx      # Shopping cart and checkout
├── App.tsx            # Main app component with routing
└── main.tsx           # Application entry point
```

## 🎯 Core Screens

### 1. Menu Screen
- Browse all available food items
- Search by name or description
- Filter by category (Main Course, Soup, Noodles, etc.)
- View ratings and preparation times
- Click any item to see details

### 2. Item Details Screen
- Detailed view of selected food item
- Adjust quantity before adding to cart
- View preparation time and category
- Add multiple quantities to cart

### 3. Shopping Cart Screen
- Review all selected items
- Modify quantities or remove items
- See order summary with total
- Place order (simulated checkout)

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Heroicons** - Beautiful SVG icons
- **Context API** - State management for cart

## 🎨 Design Features

- **Modern Color Scheme**: Orange primary colors with clean grays
- **Smooth Animations**: Hover effects and transitions
- **Card-based Layout**: Clean, organized item presentation
- **Responsive Grid**: Adapts to different screen sizes
- **Intuitive Navigation**: Clear back buttons and breadcrumbs
- **Visual Feedback**: Loading states and success messages

## 📱 Mobile-First Design

The app is designed mobile-first and includes:
- Touch-friendly buttons and interactions
- Responsive navigation
- Optimized layouts for small screens
- Fast loading and smooth scrolling

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect it's a Vite React app
   - Deploy with zero configuration!

### Deploy to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `dist` folder to [netlify.com](https://netlify.com)
   - Or connect your GitHub repository for automatic deployments

### Deploy to GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deploy script to package.json**
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```

3. **Deploy**
   ```bash
   npm run build
   npm run deploy
   ```

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Food Items

Edit `src/data/foodItems.ts` to add new items:

```typescript
{
  id: 'unique-id',
  name: 'Item Name',
  description: 'Delicious description',
  price: 5.99,
  image: '🍕', // Emoji or image URL
  category: 'Category',
  rating: 4.5,
  prepTime: '10-15 min'
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspired by modern food delivery apps
- Icons by [Heroicons](https://heroicons.com/)
- Built with [Vite](https://vitejs.dev/) and [React](https://reactjs.org/)

---

**Ready to reduce queues at your campus canteen?** 🚀

[Live Demo](https://your-deployed-url.vercel.app) | [Report Bug](https://github.com/your-username/canteen-go/issues) | [Request Feature](https://github.com/your-username/canteen-go/issues)