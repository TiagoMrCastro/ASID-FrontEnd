export interface CreateOrderSaga {
  userId: number;
  items: {
    bookId: number;
    quantity: number;
    price: number;
  }[];
  shipping: any | null; 
}