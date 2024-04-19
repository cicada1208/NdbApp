import Users from '@/models/users';

// let user = JSON.parse(localStorage.getItem('user'));
// user = user ? user : {};
const token = localStorage.getItem('token') ?? '';

export interface IAuthState {
  token: string;
  user: Users;
}

export default (): IAuthState => ({
  token: token,
  user: new Users() // new Users(user)
});
