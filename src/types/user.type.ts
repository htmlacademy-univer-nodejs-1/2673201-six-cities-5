export type UserType = 'обычный' | 'pro';

export interface User {
  name: string;
  email: string;
  avatar?: string;
  password: string;
  typeUser: UserType;
}
