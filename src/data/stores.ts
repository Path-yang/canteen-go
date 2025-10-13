export interface Store {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  icon: string;
  rating: number;
  isHalal?: boolean;
  stallNumber?: string;
}

export const stores: Store[] = [
  {
    id: 'chicken-rice-express',
    name: 'Chicken Rice Express',
    description: 'Famous Hainanese chicken rice & roasted delights',
    cuisine: 'Chinese',
    icon: '🍗',
    rating: 4.8,
    isHalal: false,
    stallNumber: '#01-12'
  },
  {
    id: 'mamas-malay',
    name: "Mama's Malay Kitchen",
    description: 'Authentic Malay dishes with homemade sambal',
    cuisine: 'Malay',
    icon: '🍚',
    rating: 4.9,
    isHalal: true,
    stallNumber: '#01-15'
  },
  {
    id: 'noodle-haven',
    name: 'Noodle Haven',
    description: 'Fresh noodles & laksa made daily',
    cuisine: 'Chinese',
    icon: '🍜',
    rating: 4.6,
    isHalal: false,
    stallNumber: '#01-08'
  },
  {
    id: 'uncle-bak-kut-teh',
    name: "Uncle Wong's Bak Kut Teh",
    description: 'Traditional herbal pork rib soup',
    cuisine: 'Chinese',
    icon: '🥘',
    rating: 4.5,
    isHalal: false,
    stallNumber: '#01-23'
  },
  {
    id: 'western-grill',
    name: 'Western Grill',
    description: 'Local-style western chops & grills',
    cuisine: 'Western',
    icon: '🍖',
    rating: 4.4,
    isHalal: false,
    stallNumber: '#01-18'
  },
  {
    id: 'fish-ball-specialist',
    name: 'Fish Ball Specialist',
    description: 'Handmade fish balls & meatballs',
    cuisine: 'Chinese',
    icon: '🍲',
    rating: 4.3,
    isHalal: false,
    stallNumber: '#01-05'
  },
  {
    id: 'mr-prata',
    name: 'Mr. Prata',
    description: 'Crispy prata with variety of curries',
    cuisine: 'Indian',
    icon: '🥞',
    rating: 4.6,
    isHalal: true,
    stallNumber: '#01-28'
  },
  {
    id: 'bubble-tea-corner',
    name: 'Bubble Tea Corner',
    description: 'Fresh brewed teas with pearls',
    cuisine: 'Beverages',
    icon: '🧋',
    rating: 4.7,
    isHalal: true,
    stallNumber: '#01-32'
  },
  {
    id: 'dessert-paradise',
    name: 'Dessert Paradise',
    description: 'Traditional local desserts & ice',
    cuisine: 'Desserts',
    icon: '🍧',
    rating: 4.5,
    isHalal: true,
    stallNumber: '#01-35'
  }
];
