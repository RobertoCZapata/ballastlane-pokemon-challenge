/**
 * Use Case: User Login
 * Handles the business logic for user authentication
 */

import { AuthRepository } from '../repositories/AuthRepository';
import { LoginCredentials, AuthResponse } from '../entities/User';

export class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(credentials: LoginCredentials): Promise<boolean> {
    // Validate credentials format
    if (!credentials.username || !credentials.password) {
      throw new Error('Username and password are required');
    }

    if (credentials.username.trim().length === 0) {
      throw new Error('Username cannot be empty');
    }

    if (credentials.password.length < 3) {
      throw new Error('Password must be at least 3 characters');
    }

    // Validate against repository
    return this.authRepository.validateCredentials(credentials);
  }
}
