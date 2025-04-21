type UserType = 'user' | 'admin';
interface User {
  roles: UserType[];
  _id: string;
  email: string;
  name: string;
  address: string;
  phone: string;
  date_of_birth?: Date; // ISO 8601 format
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default User;
// user.types.ts
