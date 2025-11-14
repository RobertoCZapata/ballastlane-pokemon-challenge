/**
 * Token Storage
 * Handles storing and retrieving JWT tokens from cookies
 */

const TOKEN_KEY = 'pokemon_auth_token';

export class TokenStorage {
  /**
   * Store token in cookies
   */
  static setToken(token: string): void {
    if (typeof window !== 'undefined') {
      // Set cookie with 7 days expiration
      const expirationDays = 7;
      const date = new Date();
      date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);
      const expires = `expires=${date.toUTCString()}`;

      document.cookie = `${TOKEN_KEY}=${token};${expires};path=/;SameSite=Strict`;
    }
  }

  /**
   * Get token from cookies
   */
  static getToken(): string | null {
    if (typeof window !== 'undefined') {
      const name = TOKEN_KEY + '=';
      const decodedCookie = decodeURIComponent(document.cookie);
      const cookieArray = decodedCookie.split(';');

      for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
          cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
          return cookie.substring(name.length, cookie.length);
        }
      }
    }
    return null;
  }

  /**
   * Remove token from cookies
   */
  static removeToken(): void {
    if (typeof window !== 'undefined') {
      document.cookie = `${TOKEN_KEY}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    }
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
