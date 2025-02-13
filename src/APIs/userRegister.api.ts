import { InputForm } from '../Pages/Register/Register';
import AutResponse from '../types/auth';
import http from '../utils/http';

export function RegisterRequest(body: Omit<InputForm, 'confirm_password'>) {
  return http.post<AutResponse>('register', body);
}

export function LoginRequest(body: Omit<InputForm, 'confirm_password'>) {
  return http.post<AutResponse>('login', body);
}

export function LogoutRequest() {
  return http.post<{ message: string }>('logout');
}
