import ResponseAPI from '../types/ultils';
import User from '../types/user';
import http from '../utils/http';

interface UserResponse extends Pick<User, 'name' | 'phone' | 'address' | 'date_of_birth' | 'avatar'> {
  password?: string;
  new_password?: string;
}

export const profileApi = {
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
