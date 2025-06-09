export interface OrderComposition {
  order: {
    id: number;
    orderDate: string;
    totalPrice: number;
    userId: number;
    shippingId: number | null;
    bookIds: number[];
    sagaStatus: string;
  };
  user: {
    id: number;
    fullname?: string;
    username: string;
    email: string;
  };
  shipping: any;
  books: {
    id: number;
    title: string;
    isbnNumber: string;
    description: string;
    price: number;
    quantity: number;
  }[];
}
