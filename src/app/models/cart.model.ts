export interface CartItem {
  id?: number;
  userId: number;
  bookId: number;
  quantity: number;
  unitPrice: number;
  subTotal?: number;
  bookTitle?: string;
  userName?: string;
  cart: Cart;
}
export interface Cart {
  id?: number;
  userId: number;
  createdDate: Date;}