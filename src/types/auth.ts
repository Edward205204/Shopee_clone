import ResponseAPI from './ultils';
import User from './user';

type AutResponse = ResponseAPI<{
  access_token: string;
  expires: string;
  refresh_token: string;
  expires_refresh_token: number;
  user: User;
}>;

export default AutResponse;
