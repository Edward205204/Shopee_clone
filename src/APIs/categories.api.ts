import { Categories } from '../types/categories';
import ResponseAPI from '../types/ultils';
import http from '../utils/http';

const URL = 'categories';
export const getCategories = () => {
  return http.get<ResponseAPI<Categories[]>>(URL);
};
