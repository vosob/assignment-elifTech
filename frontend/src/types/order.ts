export interface OrderItem {
  id: string;
  name: string;
  price: string;
}

export interface CreateOrder {
  name: string;
  email: string;
  phone: string;
  address: string;
  totalPrice: number;
  items: OrderItem[];
}
