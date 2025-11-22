import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

export interface AuthResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

/**
 * Login user with username and password
 * Uses dummyjson.com API for authentication
 */
export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      username: credentials.username,
      password: credentials.password,
      expiresInMins: 30, // optional, defaults to 60
    });
    
    // dummyjson returns 'accessToken' but we normalize it to 'token'
    const data = response.data;
    return {
      id: data.id,
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender || '',
      image: data.image || '',
      token: data.accessToken || data.token, // Handle both field names
    };
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || 'Login failed. Please check your credentials.');
    }
    throw new Error('Network error. Please check your connection.');
  }
};

/**
 * Register a new user
 * Note: dummyjson.com doesn't have a real register endpoint,
 * so we'll use the add user endpoint and then login
 */
export const registerUser = async (data: RegisterData): Promise<AuthResponse> => {
  try {
    // First create the user
    const response = await axios.post(`${API_BASE_URL}/users/add`, {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      username: data.username,
      password: data.password,
    });

    // For demonstration purposes, we'll simulate a successful registration
    // In a real app, you'd then login the user
    // Since dummyjson doesn't persist new users, we'll return a mock token
    return {
      id: response.data.id,
      username: response.data.username,
      email: response.data.email,
      firstName: response.data.firstName,
      lastName: response.data.lastName,
      gender: response.data.gender || '',
      image: response.data.image || '',
      token: 'mock-jwt-token-' + Date.now(), // Mock token for demo
    };
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || 'Registration failed. Please try again.');
    }
    throw new Error('Network error. Please check your connection.');
  }
};

/**
 * Verify token validity
 */
export const verifyToken = async (token: string): Promise<AuthResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return response.data;
  } catch (error) {
    throw new Error('Token verification failed');
  }
};
