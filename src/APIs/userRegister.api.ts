import { InputForm } from '../Pages/Register/Register';
import AutResponse from '../types/auth';
import http from '../utils/http';

export const authApi = {
  RegisterRequest(body: Omit<InputForm, 'confirm_password'>) {
    return http.post<AutResponse>('register', body);
  },

  LoginRequest(body: Omit<InputForm, 'confirm_password'>) {
    return http.post<AutResponse>('login', body);
  },
  LogoutRequest() {
    return http.post<{ message: string }>('logout');
  }
};
