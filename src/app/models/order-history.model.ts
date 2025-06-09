export interface OrderDetailsResponse {
  orderId: number;
  orderDate: string;
  totalPrice: number;
  shippingAddress: string;
  sagaStatus: string;
  shipping: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    email: string;
    postalCode: string;
  } | null;
  books: {
    bookId: number;
    title: string | null;
    quantity: number;
    price: number;
  }[];
}
