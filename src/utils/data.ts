export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number; // Price in INR
  images: string[];
  category: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  stock: number;
  sku: string;
  material: string;
  brand: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  photoURL?: string; // Add optional photoURL property
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  total: number;
  date: Date;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  paymentMethod: 'credit_card' | 'paypal';
}

// Sample Products
export const products: Product[] = [
  {
    _id: '1',
    name: 'Designer Slim Fit T-Shirt',
    description: 'A premium slim-fit t-shirt made with organic cotton for maximum comfort and durability.',
    price: 49.99 * 83,
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=2787&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=2787&auto=format&fit=crop',
    ],
    category: 'men',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Navy'],
    inStock: true,
    featured: true,
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01',
    stock: 10,
    sku: 'TSH001',
    material: 'Organic Cotton',
    brand: 'Designer Apparel'
  },
  {
    _id: '2',
    name: 'Luxury Cashmere Sweater',
    description: 'Luxurious cashmere sweater designed for exceptional warmth and style.',
    price: 129.99 * 83,
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=3036&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=3036&auto=format&fit=crop',
    ],
    category: 'women',
    sizes: ['S', 'M', 'L'],
    colors: ['Beige', 'Gray', 'Black'],
    inStock: true,
    featured: true,
    createdAt: '2023-02-01',
    updatedAt: '2023-02-01',
    stock: 5,
    sku: 'CSW001',
    material: 'Cashmere',
    brand: 'Luxury Apparel'
  },
  {
    _id: '3',
    name: 'Designer Jeans',
    description: 'Premium denim jeans with modern fit',
    price: 89.99 * 83,
    images: ["/images/products/jeans-1.jpg", "/images/products/jeans-2.jpg"],
    category: 'Jeans',
    sizes: ['30', '32', '34', '36'],
    colors: ['Blue', 'Black', 'Gray'],
    inStock: true,
    featured: false,
    createdAt: '2023-03-01',
    updatedAt: '2023-03-01',
    stock: 8,
    sku: 'DJ001',
    material: 'Denim',
    brand: 'Premium Apparel'
  },
  {
    _id: '4',
    name: 'Designer Silk Blouse',
    description: 'Elegant silk blouse crafted with premium materials for a sophisticated look.',
    price: 79.99 * 83,
    images: [
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=2940&auto=format&fit=crop',
    ],
    category: 'women',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['White', 'Black', 'Pink'],
    inStock: true,
    featured: true,
    createdAt: '2023-04-01',
    updatedAt: '2023-04-01',
    stock: 3,
    sku: 'BS001',
    material: 'Silk',
    brand: 'Designer Apparel'
  },
  {
    _id: '5',
    name: 'Business Suit',
    description: 'Classic business suit for formal occasions',
    price: 299.99 * 83,
    images: ["/images/products/suit-1.jpg", "/images/products/suit-2.jpg"],
    category: 'Suits',
    sizes: ['38', '40', '42', '44'],
    colors: ['Navy', 'Charcoal', 'Black'],
    inStock: true,
    featured: false,
    createdAt: '2023-05-01',
    updatedAt: '2023-05-01',
    stock: 2,
    sku: 'WB001',
    material: 'Wool',
    brand: 'Tailored Apparel'
  },
  {
    _id: '6',
    name: 'Leather Ankle Boots',
    description: 'Premium leather ankle boots with durable construction and timeless style.',
    price: 159.99 * 83,
    images: [
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=2940&auto=format&fit=crop',
    ],
    category: 'women',
    sizes: ['36', '37', '38', '39', '40'],
    colors: ['Black', 'Brown', 'Tan'],
    inStock: true,
    featured: true,
    createdAt: '2023-06-01',
    updatedAt: '2023-06-01',
    stock: 7,
    sku: 'LB001',
    material: 'Leather',
    brand: 'Premium Footwear'
  }
];

// Sample Orders
export const orders: Order[] = [
  {
    id: 'order1',
    userId: 'user1',
    items: [
      {
        product: products[0],
        quantity: 2,
        size: 'M',
        color: 'Black'
      },
      {
        product: products[2],
        quantity: 1,
        size: '32',
        color: 'Blue'
      }
    ],
    status: 'delivered',
    total: 189.97,
    date: new Date('2023-10-10'),
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA'
    },
    paymentMethod: 'credit_card'
  },
  {
    id: 'order2',
    userId: 'user1',
    items: [
      {
        product: products[3],
        quantity: 1,
        size: 'S',
        color: 'White'
      }
    ],
    status: 'shipped',
    total: 79.99,
    date: new Date('2023-11-05'),
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA'
    },
    paymentMethod: 'paypal'
  },
  {
    id: 'order3',
    userId: 'user2',
    items: [
      {
        product: products[5],
        quantity: 1,
        size: '38',
        color: 'Black'
      }
    ],
    status: 'processing',
    total: 159.99,
    date: new Date('2023-11-15'),
    shippingAddress: {
      street: '456 Elm St',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90001',
      country: 'USA'
    },
    paymentMethod: 'credit_card'
  }
];

// Sample Users
export const users: User[] = [
  {
    id: 'user1',
    name: 'John Doe',
    email: 'john@example.com',
    isAdmin: false,
    photoURL: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 'user2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    isAdmin: false,
    photoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 'admin2',
    name: 'Shahzaib Admin',
    email: 'shaz80170@gmail.com',
    isAdmin: true,
    photoURL: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

// For admin dashboard
export const salesData = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 5000 },
  { month: 'Apr', sales: 4500 },
  { month: 'May', sales: 6000 },
  { month: 'Jun', sales: 5500 },
  { month: 'Jul', sales: 7000 },
  { month: 'Aug', sales: 8000 },
  { month: 'Sep', sales: 7500 },
  { month: 'Oct', sales: 9000 },
  { month: 'Nov', sales: 10000 },
  { month: 'Dec', sales: 12000 },
];

export const categoryData = [
  { name: 'Men', value: 40 },
  { name: 'Women', value: 45 },
  { name: 'Kids', value: 15 },
];
