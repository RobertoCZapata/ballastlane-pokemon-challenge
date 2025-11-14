/**
 * In-Memory Authentication Repository
 * Simple implementation for the challenge - stores credentials in memory
 */

import { AuthRepository } from '@/core/repositories/AuthRepository';
import { LoginCredentials, User } from '@/core/entities/User';

// For this challenge, we only have one user: admin/admin
const VALID_CREDENTIALS = {
  username: 'admin',
  password: 'admin',
};

export class InMemoryAuthRepository implements AuthRepository {
  /**
   * Validate user credentials
   */
  async validateCredentials(credentials: LoginCredentials): Promise<boolean> {
    return (
      credentials.username === VALID_CREDENTIALS.username &&
      credentials.password === VALID_CREDENTIALS.password
    );
  }

  /**
   * Get user by username
   */
  async getUserByUsername(username: string): Promise<User | null> {
    if (username === VALID_CREDENTIALS.username) {
      return { username: VALID_CREDENTIALS.username };
    }
    return null;
  }
}
