/**
 * Authentication Context - Domain Model
 */

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  user?: any;
  error?: string;
}
