import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthState, User } from '../types';
import { loginUser, registerUser, LoginCredentials, RegisterData } from '../services/authService';

const TOKEN_KEY = '@streambox_auth_token';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

/**
 * Async thunk for user login
 */
export const loginAsync = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await loginUser(credentials);
      // Store token securely in AsyncStorage
      await AsyncStorage.setItem(TOKEN_KEY, response.token);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

/**
 * Async thunk for user registration
 */
export const registerAsync = createAsyncThunk(
  'auth/register',
  async (data: RegisterData, { rejectWithValue }) => {
    try {
      const response = await registerUser(data);
      // Store token securely in AsyncStorage
      await AsyncStorage.setItem(TOKEN_KEY, response.token);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

/**
 * Async thunk for loading stored auth state
 */
export const loadStoredAuth = createAsyncThunk(
  'auth/loadStored',
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (!token) {
        throw new Error('No stored token');
      }
      // In a real app, you would verify the token with the server
      // For now, we'll just return null to indicate no stored auth
      return null;
    } catch (error) {
      return rejectWithValue('No stored authentication');
    }
  }
);

/**
 * Async thunk for logout
 */
export const logoutAsync = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // Clear token from AsyncStorage
      await AsyncStorage.removeItem(TOKEN_KEY);
      return null;
    } catch (error) {
      return rejectWithValue('Logout failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login reducers
    builder.addCase(loginAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(loginAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Register reducers
    builder.addCase(registerAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(registerAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Logout reducers
    builder.addCase(logoutAsync.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.loading = false;
    });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
