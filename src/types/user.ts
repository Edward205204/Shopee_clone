type UserType = 'user' | 'admin';
interface User {
  roles: UserType[];
  _id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default User;
