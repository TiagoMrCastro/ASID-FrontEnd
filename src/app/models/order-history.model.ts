export interface OrderDetailsResponse {
  orderId: number;
  orderDate: string;
  totalPrice: number;
  shippingAddress: string;
  books: {
    id: number;
    title: string;
    price: number;
    quantity: number;
  }[];
  shipping: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    email: string;
    postalCode: string;
  };
}
