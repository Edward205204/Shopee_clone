import ResponseAPI from '../types/ultils';
import User from '../types/user';
import http from '../utils/http';

interface UserResponse extends Omit<User, '_id' | '__v' | 'createdAt' | 'updatedAt' | 'email' | 'roles'> {
  password?: string;
  new_password?: string;
}

export const PurchasesApi = {
  getProfile: () => {
    return http.get<ResponseAPI<User>>('me');
  },
  updateProfile: (body: UserResponse) => {
    return http.put<ResponseAPI<User>>('user', body);
  },
  uploadAvatar(body: FormData) {
    return http.post<ResponseAPI<string>>('user/upload-avatar', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};
