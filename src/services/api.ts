// API service for React Native app
// Base URL for Android Emulator: 10.0.2.2 points to host machine
const API_BASE_URL = 'http://10.0.2.2:3000/api';

// Types
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string | null;
}

export interface CartItem {
  id: number;
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  image: string | null;
}

export interface CartResponse {
  items: CartItem[];
  total: number;
}

// API service object
const api = {
  // Fetch all products
  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Product[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Add more API methods here as needed
  addToCart: async (data: { user_id: number; product_id: number; quantity: number }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },

  getCart: async (userId: number): Promise<CartResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/${userId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: CartResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  },

  // Update cart item quantity (can be negative to decrease)
  updateCartItem: async (data: { user_id: number; product_id: number; quantity: number }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  },

  createOrder: async (data: { user_id: number }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }
};

export default api;