import { User } from '@/types/user';
import { apiResolver, Response } from '@/utils/api';
import axios from '../axios';

export function getUsers() {
  return apiResolver<Response<User[]>>(() => axios.get('/users'));
}

export function createUser(user: User) {
  return apiResolver<Response<void>>(() => axios.post('/users', user));
}