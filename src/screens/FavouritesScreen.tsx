import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { colors } from '../redux/themeSlice';
import MovieCardGrid from '../components/MovieCardGrid';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../types';
import Icon from 'react-native-vector-icons/Feather';

type FavouritesScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;

interface Props {
  navigation: FavouritesScreenNavigationProp;
}

const FavouritesScreen: React.FC<Props> = ({ navigation }) => {
  const favourites = useSelector((state: RootState) => state.favourites.favourites);
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const theme = colors[themeMode];

  const handleMoviePress = (movie: any) => {
    navigation.navigate('MovieDetails', { movie });
  };

  if (favourites.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: theme.background }]}>
        <Icon name="heart" size={80} color={theme.textTertiary} />
        <Text style={[styles.emptyTitle, { color: theme.text }]}>No Favourites Yet</Text>
        <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
          Start adding movies to your favourites!
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>My Favourites</Text>
        <Text style={[styles.count, { color: theme.textSecondary }]}>{favourites.length} movies</Text>
      </View>

      <FlatList
        data={favourites}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <MovieCardGrid movie={item} onPress={() => handleMoviePress(item)} />
        )}
        showsVerticalScrollIndicator={false}
        key="favourites-grid"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingTop: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  count: {
    fontSize: 14,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
    gap: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default FavouritesScreen;
