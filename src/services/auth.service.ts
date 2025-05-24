import { LoginProps } from '@/types/auth';
import api from './base.service';

export const login = async (data: LoginProps) => {
  return await api.post('/auth/login', data);
};
