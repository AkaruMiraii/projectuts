// Layanan API untuk aplikasi React Native bakery
// URL dasar untuk Android Emulator: 10.0.2.2 mengarah ke mesin host
const API_BASE_URL = 'http://10.0.2.2:3000/api';

// Tipe data untuk aplikasi
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string | null;
}

export interface User {
  id: number;
  name: string;
  email: string;
  profile_image: string | null;
}

export interface AuthResponse {
  message: string;
  user: User;
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

// Objek layanan API
const api = {
  // Metode autentikasi
  register: async (data: { name: string; email: string; password: string; profile_image?: string }): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const result: AuthResponse = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  },

  login: async (data: { email: string; password: string }): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const result: AuthResponse = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  },

  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Product[] = await response.json();
      return data;
    } catch (error) {
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
      throw error;
    }
  },

  // Update jumlah item keranjang (bisa negatif untuk mengurangi)
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
      throw error;
    }
  }
};

export default api;