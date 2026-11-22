import { FindOperator } from 'typeorm';

export class AuthSignInDto {
  username: string;
  password: string;
  email: string;
  ip?: string;
}

export class AuthResetDto {
  id: number;
  status: number;
  password: string;
}

export class AuthSignOut {
  token: string;
}
export class PersonaDto {
  name: string;
}
