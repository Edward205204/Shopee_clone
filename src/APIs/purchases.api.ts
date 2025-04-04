import { Purchases } from '../types/purchases';
import ResponseAPI from '../types/ultils';
import http from '../utils/http';

const URL = '/purchases';
export const PurchasesApi = {
  addToCart: (body: { product_id: string; buy_count: number }) => {
    return http.post<ResponseAPI<Purchases>>(`${URL}/add-to-cart`, body);
  },
  getPurchases: (params: { status: string }) => {
    return http.get<ResponseAPI<Purchases[]>>(`${URL}`, { params });
  }
};
