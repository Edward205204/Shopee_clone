import { ProductDetail } from './products';

type PurchasesStatus = -1 | 1 | 2 | 3 | 4 | 5;
export type PurchaseStatusList = 0 | PurchasesStatus;

export interface Purchases {
  buy_count: number;
  price: number;
  price_before_discount: number;
  status: PurchasesStatus;
  _id: string;
  user: string;
  product: ProductDetail;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
