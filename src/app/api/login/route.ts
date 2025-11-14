/**
 * API Route: POST /api/login
 * Handles user authentication
 */

import { NextRequest, NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validation';
import { LoginUseCase } from '@/core/usecases/Login';
import { InMemoryAuthRepository } from '@/infrastructure/auth/InMemoryAuthRepository';
import { JwtService } from '@/infrastructure/auth/JwtService';

const authRepository = new InMemoryAuthRepository();
const loginUseCase = new LoginUseCase(authRepository);
const jwtService = new JwtService();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: validation.error.issues[0].message,
        },
        { status: 400 }
      );
    }

    const { username, password } = validation.data;

    // Execute login use case
    const isValid = await loginUseCase.execute({ username, password });

    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid credentials',
        },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = await jwtService.generateToken(username);

    // Get user data
    const user = await authRepository.getUserByUsername(username);

    return NextResponse.json(
      {
        success: true,
        token,
        user,
        message: 'Login successful',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
