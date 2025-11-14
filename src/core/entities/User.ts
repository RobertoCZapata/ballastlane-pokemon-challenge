/**
 * Domain Entity: User
 * Represents an authenticated user
 */

export interface User {
  username: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: User;
  message?: string;
}

export interface JWTPayload {
  username: string;
  iat: number;
  exp: number;
}
