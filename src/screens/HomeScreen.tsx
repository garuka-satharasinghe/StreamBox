import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Movie } from '../types';
import { getTrendingMovies, getPopularMovies } from '../services/tmdbApi';
import MovieCard from '../components/MovieCard';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../types';
import Icon from 'react-native-vector-icons/Feather';

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'trending' | 'popular'>('trending');
  const user = useSelector((state: RootState) => state.auth.user);

  const fetchMovies = async () => {
    try {
      const [trending, popular] = await Promise.all([
        getTrendingMovies(),
        getPopularMovies(),
      ]);
      setTrendingMovies(trending);
      setPopularMovies(popular);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchMovies();
  };

  const handleMoviePress = (movie: Movie) => {
    navigation.navigate('MovieDetails', { movie });
  };

  const displayMovies = selectedTab === 'trending' ? trendingMovies : popularMovies;
  const badge = selectedTab === 'trending' ? 'Trending' : 'Popular';

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#e94560" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.username}! 👋</Text>
          <Text style={styles.subtitle}>What do you want to watch?</Text>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'trending' && styles.activeTab]}
          onPress={() => setSelectedTab('trending')}
        >
          <Icon
            name="trending-up"
            size={18}
            color={selectedTab === 'trending' ? '#fff' : '#999'}
          />
          <Text style={[styles.tabText, selectedTab === 'trending' && styles.activeTabText]}>
            Trending
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, selectedTab === 'popular' && styles.activeTab]}
          onPress={() => setSelectedTab('popular')}
        >
          <Icon
            name="award"
            size={18}
            color={selectedTab === 'popular' ? '#fff' : '#999'}
          />
          <Text style={[styles.tabText, selectedTab === 'popular' && styles.activeTabText]}>
            Popular
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={displayMovies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={() => handleMoviePress(item)}
            badge={badge}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#e94560"
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 48,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 12,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#16213e',
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#e94560',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
  },
  activeTabText: {
    color: '#fff',
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
