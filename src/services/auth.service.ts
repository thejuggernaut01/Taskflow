import { LoginProps, SignupProps } from '@/types/auth';
import api, { StandardResponse } from './base.service';
import { User } from '@/types/user';

export const login = async (data: LoginProps) => {
  return await api.post<StandardResponse<User & { accessToken: string }>>(
    '/auth/login',
    data
  );
};

export const signup = async (data: SignupProps) => {
  return await api.post<StandardResponse<User>>('/auth/signup', data);
};
