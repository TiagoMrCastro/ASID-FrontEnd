export interface CreateOrderRequest {
  userId: number;
  shippingId: number;
  bookIds: number[];
}
