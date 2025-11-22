import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync, clearError } from '../redux/authSlice';
import { RootState, AppDispatch } from '../redux/store';
import { colors } from '../redux/themeSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../types';
import * as yup from 'yup';

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

// Yup validation schema
const loginSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(4, 'Password must be at least 4 characters'),
});

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const theme = colors[themeMode];

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  // Show error alert when auth error occurs
  useEffect(() => {
    if (error) {
      Alert.alert('Login Failed', error);
    }
  }, [error]);

  const validateForm = async (): Promise<boolean> => {
    try {
      await loginSchema.validate(
        { username: username.trim(), password },
        { abortEarly: false }
      );
      setErrors({});
      return true;
    } catch (err: any) {
      const validationErrors: { username?: string; password?: string } = {};
      err.inner.forEach((error: any) => {
        if (error.path) {
          validationErrors[error.path as keyof typeof validationErrors] = error.message;
        }
      });
      setErrors(validationErrors);
      return false;
    }
  };

  const handleLogin = async () => {
    const isValid = await validateForm();
    if (isValid) {
      dispatch(loginAsync({ username: username.trim(), password }));
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.primary }]}>StreamBox</Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>Your Movie Companion</Text>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: theme.card, color: theme.text, borderColor: errors.username ? theme.error : theme.border }
              ]}
              placeholder="Username"
              placeholderTextColor={theme.textSecondary}
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                setErrors({ ...errors, username: undefined });
              }}
              autoCapitalize="none"
              editable={!loading}
            />
            {errors.username && <Text style={[styles.errorText, { color: theme.error }]}>{errors.username}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: theme.card, color: theme.text, borderColor: errors.password ? theme.error : theme.border }
              ]}
              placeholder="Password"
              placeholderTextColor={theme.textSecondary}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setErrors({ ...errors, password: undefined });
              }}
              secureTextEntry
              autoCapitalize="none"
              editable={!loading}
            />
            {errors.password && <Text style={[styles.errorText, { color: theme.error }]}>{errors.password}</Text>}
          </View>

          <TouchableOpacity 
            style={[styles.button, { backgroundColor: theme.primary, opacity: loading ? 0.7 : 1 }]} 
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => navigation.navigate('Register')}
            disabled={loading}
          >
            <Text style={[styles.linkText, { color: theme.text }]}>Don't have an account? Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 50,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
  },
  errorText: {
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    height: 50,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  helperContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  helperText: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  linkButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
  },
});

export default LoginScreen;
