import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import { toggleTheme } from '../redux/themeSlice';
import { RootState } from '../redux/store';
import { colors } from '../redux/themeSlice';
import Icon from 'react-native-vector-icons/Feather';

const ProfileScreen: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const theme = colors[themeMode];
  const isDarkMode = themeMode === 'dark';
  const favouritesCount = useSelector(
    (state: RootState) => state.favourites.favourites.length
  );

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => dispatch(logout()),
        },
      ]
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={[styles.avatarContainer, { backgroundColor: theme.primary }]}>
          <Icon name="user" size={40} color="#fff" />
        </View>
        <Text style={[styles.username, { color: theme.text }]}>{user?.username}</Text>
        <Text style={[styles.email, { color: theme.textSecondary }]}>StreamBox Member</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: theme.card }]}>
          <Icon name="heart" size={28} color={theme.primary} />
          <Text style={[styles.statNumber, { color: theme.text }]}>{favouritesCount}</Text>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Favourites</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: theme.card }]}>
          <Icon name="film" size={28} color={theme.rating} />
          <Text style={[styles.statNumber, { color: theme.text }]}>0</Text>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Watched</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Settings</Text>

        <View style={[styles.settingItem, { backgroundColor: theme.card }]}>
          <View style={styles.settingLeft}>
            <Icon name={isDarkMode ? "moon" : "sun"} size={20} color={theme.text} />
            <Text style={[styles.settingText, { color: theme.text }]}>Dark Mode</Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={handleToggleTheme}
            trackColor={{ false: theme.border, true: theme.primary }}
            thumbColor={isDarkMode ? '#fff' : '#f4f3f4'}
          />
        </View>

        <TouchableOpacity style={[styles.settingItem, { backgroundColor: theme.card }]}>
          <View style={styles.settingLeft}>
            <Icon name="bell" size={20} color={theme.text} />
            <Text style={[styles.settingText, { color: theme.text }]}>Notifications</Text>
          </View>
          <Icon name="chevron-right" size={20} color={theme.textTertiary} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.settingItem, { backgroundColor: theme.card }]}>
          <View style={styles.settingLeft}>
            <Icon name="lock" size={20} color={theme.text} />
            <Text style={[styles.settingText, { color: theme.text }]}>Privacy</Text>
          </View>
          <Icon name="chevron-right" size={20} color={theme.textTertiary} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.settingItem, { backgroundColor: theme.card }]}>
          <View style={styles.settingLeft}>
            <Icon name="help-circle" size={20} color={theme.text} />
            <Text style={[styles.settingText, { color: theme.text }]}>Help & Support</Text>
          </View>
          <Icon name="chevron-right" size={20} color={theme.textTertiary} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>About</Text>

        <TouchableOpacity style={[styles.settingItem, { backgroundColor: theme.card }]}>
          <View style={styles.settingLeft}>
            <Icon name="info" size={20} color={theme.text} />
            <Text style={[styles.settingText, { color: theme.text }]}>About StreamBox</Text>
          </View>
          <Icon name="chevron-right" size={20} color={theme.textTertiary} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.settingItem, { backgroundColor: theme.card }]}>
          <View style={styles.settingLeft}>
            <Icon name="file-text" size={20} color={theme.text} />
            <Text style={[styles.settingText, { color: theme.text }]}>Terms & Conditions</Text>
          </View>
          <Icon name="chevron-right" size={20} color={theme.textTertiary} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={[styles.logoutButton, { backgroundColor: theme.error }]} onPress={handleLogout}>
        <Icon name="log-out" size={20} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <Text style={[styles.version, { color: theme.textTertiary }]}>Version 1.0.0</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 16,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 10,
    marginBottom: 8,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 10,
    marginHorizontal: 16,
    marginTop: 16,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 24,
    marginBottom: 32,
  },
});

export default ProfileScreen;
