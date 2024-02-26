type DisplayMode = 'list' | 'grid';

interface ProductCard {
  id: string;
  title: string;
  image: string;
  price: string;
  classes?: string;
}

interface OrderAttributes {
  name: string;
  address: string;
  numItemsInCart: number;
  orderTotal: string;
  createdAt: string;
}

interface Order {
  id: string;
  attributes: OrderAttributes;
}

interface OrderPlacement {
  payload: {
    data: {
      name: string;
      address: string;
      chargeTotal: number;
      orderTotal: string;
      cartItems: CartItem[];
      numItemsInCart: number;
    };
  };
}

interface CartItem {
  cartID: string;
  productID: number;
  image: string;
  title: string;
  price: string;
  company: string;
  productColor: string;
  amount: number;
}

interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

interface URLParams {
  search?: string;
  category?: string;
  company?: string;
  order?: string;
  price?: number;
  shipping?: boolean;
  page?: number;
}

interface RegisteredUser {
  user: User;
  jwt: string;
}

interface RegistrationErrorResponse {
  message: string;
  details: {
    errors?: [{ message?: string }];
  };
}

interface OrderPlacementResponse {
  id: number;
  address: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  name: string;
  orderTotal: string;
  cartItems: CartItem[];
  numItemsInCart: number;
}

interface CartTotals {
  cartTotal: number;
  numItemsInCart: number;
  orderTotal: number;
  shipping: number;
  tax: number;
}
