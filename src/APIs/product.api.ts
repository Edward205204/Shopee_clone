import { ProductConfig, ProductDetail, Products } from '../types/products';
import ResponseAPI from '../types/ultils';
import http from '../utils/http';

const URL = 'products';
export const ProductApi = {
  getProducts(params: ProductConfig) {
    return http.get<ResponseAPI<Products>>(URL, { params });
  },
  getProductDetail(id: string) {
    return http.get<ResponseAPI<ProductDetail>>(`${URL}/${id}`);
  }
};
