/**
 * Repository Interface: Authentication Repository
 * Defines the contract for authentication operations
 */

import { LoginCredentials, User } from '../entities/User';

export interface AuthRepository {
  /**
   * Validate user credentials
   */
  validateCredentials(credentials: LoginCredentials): Promise<boolean>;

  /**
   * Get user by username
   */
  getUserByUsername(username: string): Promise<User | null>;
}
