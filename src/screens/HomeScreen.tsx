import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { colors } from '../redux/themeSlice';
import { Movie } from '../types';
import { getTrendingMovies, getPopularMovies, searchMovies } from '../services/tmdbApi';
import MovieCardHorizontal from '../components/MovieCardHorizontal';
import MovieCardGrid from '../components/MovieCardGrid';
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
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const theme = colors[themeMode];

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

  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (searchQuery.trim()) {
        setIsSearching(true);
        const results = await searchMovies(searchQuery);
        setSearchResults(results);
        setIsSearching(false);
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchQuery]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchMovies();
  };

  const handleMoviePress = (movie: Movie) => {
    navigation.navigate('MovieDetails', { movie });
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  if (loading) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  const renderMovieItem = ({ item }: { item: Movie }) => (
    <MovieCard movie={item} onPress={() => handleMoviePress(item)} />
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.primary}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: theme.text }]}>Welcome, {user?.username} 👋</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Let's relax and watch a movie</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={[styles.searchBar, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Icon name="search" size={20} color={theme.textSecondary} />
            <TextInput
              style={[styles.searchInput, { color: theme.text }]}
              placeholder="Search Movie..."
              placeholderTextColor={theme.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={handleClearSearch}>
                <Icon name="x" size={20} color={theme.textSecondary} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Search Results */}
        {searchQuery.trim() && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                Search Results
              </Text>
            </View>
            {isSearching ? (
              <ActivityIndicator size="small" color={theme.primary} style={styles.loadingIndicator} />
            ) : searchResults.length > 0 ? (
              <FlatList
                data={searchResults.slice(0, 6)}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.searchRow}
                contentContainerStyle={styles.searchList}
                renderItem={({ item }) => (
                  <MovieCardGrid movie={item} onPress={() => handleMoviePress(item)} />
                )}
                scrollEnabled={false}
                key="search-grid"
              />
            ) : (
              <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
                No movies found
              </Text>
            )}
          </View>
        )}

        {/* Trending Section */}
        {!searchQuery.trim() && (
          <>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Trending</Text>
                <TouchableOpacity style={styles.viewAllButton}>
                  <Text style={[styles.viewAllText, { color: theme.primary }]}>View all</Text>
                  <Icon name="chevron-right" size={16} color={theme.primary} />
                </TouchableOpacity>
              </View>
              <FlatList
                data={trendingMovies.slice(0, 6)}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalList}
                renderItem={({ item }) => (
                  <MovieCardHorizontal movie={item} onPress={() => handleMoviePress(item)} badge="Trending" />
                )}
              />
            </View>

            {/* Popular Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Popular</Text>
                <TouchableOpacity style={styles.viewAllButton}>
                  <Text style={[styles.viewAllText, { color: theme.primary }]}>View all</Text>
                  <Icon name="chevron-right" size={16} color={theme.primary} />
                </TouchableOpacity>
              </View>
              <FlatList
                data={popularMovies.slice(0, 6)}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalList}
                renderItem={({ item }) => (
                  <MovieCardHorizontal movie={item} onPress={() => handleMoviePress(item)} badge="Popular" />
                )}
              />
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 16,
    paddingTop: 48,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    padding: 0,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  horizontalList: {
    paddingLeft: 16,
    paddingRight: 16,
    gap: 8,
  },
  searchList: {
    paddingHorizontal: 8,
  },
  searchRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    gap: 12,
  },
  loadingIndicator: {
    marginVertical: 20,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 14,
    marginVertical: 20,
    paddingHorizontal: 16,
  },
});

export default HomeScreen;
