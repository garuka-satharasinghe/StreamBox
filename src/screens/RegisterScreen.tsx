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
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { registerAsync, clearError } from '../redux/authSlice';
import { RootState, AppDispatch } from '../redux/store';
import { colors } from '../redux/themeSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../types';
import * as yup from 'yup';

type RegisterScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Register'>;

interface Props {
  navigation: RegisterScreenNavigationProp;
}

// Yup validation schema
const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters'),
  lastName: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
}

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  
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
      Alert.alert('Registration Failed', error);
    }
  }, [error]);

  const validateForm = async (): Promise<boolean> => {
    try {
      await registerSchema.validate(
        {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          username: username.trim(),
          password,
          confirmPassword,
        },
        { abortEarly: false }
      );
      setErrors({});
      return true;
    } catch (err: any) {
      const validationErrors: FormErrors = {};
      err.inner.forEach((error: any) => {
        if (error.path) {
          validationErrors[error.path as keyof FormErrors] = error.message;
        }
      });
      setErrors(validationErrors);
      return false;
    }
  };

  const handleRegister = async () => {
    const isValid = await validateForm();
    if (isValid) {
      dispatch(registerAsync({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        username: username.trim(),
        password,
      }));
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.primary }]}>Create Account</Text>
          <Text style={[styles.subtitle, { color: theme.text }]}>Join StreamBox Today</Text>

          <View style={styles.form}>
            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.halfWidth]}>
                <TextInput
                  style={[
                    styles.input,
                    { backgroundColor: theme.card, color: theme.text, borderColor: errors.firstName ? theme.error : theme.border }
                  ]}
                  placeholder="First Name"
                  placeholderTextColor={theme.textSecondary}
                  value={firstName}
                  onChangeText={(text) => {
                    setFirstName(text);
                    setErrors({ ...errors, firstName: undefined });
                  }}
                  autoCapitalize="words"
                  editable={!loading}
                />
                {errors.firstName && <Text style={[styles.errorText, { color: theme.error }]}>{errors.firstName}</Text>}
              </View>

              <View style={[styles.inputContainer, styles.halfWidth]}>
                <TextInput
                  style={[
                    styles.input,
                    { backgroundColor: theme.card, color: theme.text, borderColor: errors.lastName ? theme.error : theme.border }
                  ]}
                  placeholder="Last Name"
                  placeholderTextColor={theme.textSecondary}
                  value={lastName}
                  onChangeText={(text) => {
                    setLastName(text);
                    setErrors({ ...errors, lastName: undefined });
                  }}
                  autoCapitalize="words"
                  editable={!loading}
                />
                {errors.lastName && <Text style={[styles.errorText, { color: theme.error }]}>{errors.lastName}</Text>}
              </View>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: theme.card, color: theme.text, borderColor: errors.email ? theme.error : theme.border }
                ]}
                placeholder="Email"
                placeholderTextColor={theme.textSecondary}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setErrors({ ...errors, email: undefined });
                }}
                autoCapitalize="none"
                keyboardType="email-address"
                editable={!loading}
              />
              {errors.email && <Text style={[styles.errorText, { color: theme.error }]}>{errors.email}</Text>}
            </View>

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

            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: theme.card, color: theme.text, borderColor: errors.confirmPassword ? theme.error : theme.border }
                ]}
                placeholder="Confirm Password"
                placeholderTextColor={theme.textSecondary}
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  setErrors({ ...errors, confirmPassword: undefined });
                }}
                secureTextEntry
                autoCapitalize="none"
                editable={!loading}
              />
              {errors.confirmPassword && <Text style={[styles.errorText, { color: theme.error }]}>{errors.confirmPassword}</Text>}
            </View>

            <TouchableOpacity 
              style={[styles.button, { backgroundColor: theme.primary, opacity: loading ? 0.7 : 1 }]} 
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Register</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => navigation.navigate('Login')}
              disabled={loading}
            >
              <Text style={[styles.linkText, { color: theme.text }]}>Already have an account? Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
  },
  form: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  inputContainer: {
    marginBottom: 15,
  },
  halfWidth: {
    flex: 1,
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
  linkButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
  },
});

export default RegisterScreen;
