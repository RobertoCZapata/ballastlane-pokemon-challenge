/**
 * JWT Service
 * Handles JWT token generation and verification
 */

import { SignJWT, jwtVerify } from 'jose';
import { JWTPayload as CustomJWTPayload } from '@/core/entities/User';

const SECRET_KEY = process.env.JWT_SECRET || 'pokemon-app-secret-key-change-in-production';
const EXPIRATION_TIME = '7d'; // 7 days

export class JwtService {
  private secret: Uint8Array;

  constructor(secretKey: string = SECRET_KEY) {
    this.secret = new TextEncoder().encode(secretKey);
  }

  /**
   * Generate a JWT token for a user
   */
  async generateToken(username: string): Promise<string> {
    const token = await new SignJWT({ username })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(EXPIRATION_TIME)
      .sign(this.secret);

    return token;
  }

  /**
   * Verify and decode a JWT token
   */
  async verifyToken(token: string): Promise<CustomJWTPayload | null> {
    try {
      const { payload } = await jwtVerify(token, this.secret);

      return {
        username: payload.username as string,
        iat: payload.iat as number,
        exp: payload.exp as number,
      };
    } catch (error) {
      console.error('JWT verification failed:', error);
      return null;
    }
  }
}
