import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import MovieCard from '../components/MovieCard';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../types';
import Icon from 'react-native-vector-icons/Feather';

type FavouritesScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;

interface Props {
  navigation: FavouritesScreenNavigationProp;
}

const FavouritesScreen: React.FC<Props> = ({ navigation }) => {
  const favourites = useSelector((state: RootState) => state.favourites.favourites);

  const handleMoviePress = (movie: any) => {
    navigation.navigate('MovieDetails', { movie });
  };

  if (favourites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="heart" size={80} color="#666" />
        <Text style={styles.emptyTitle}>No Favourites Yet</Text>
        <Text style={styles.emptySubtitle}>
          Start adding movies to your favourites!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Favourites</Text>
        <Text style={styles.count}>{favourites.length} movies</Text>
      </View>

      <FlatList
        data={favourites}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <MovieCard movie={item} onPress={() => handleMoviePress(item)} />
        )}
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
  header: {
    padding: 16,
    paddingTop: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  count: {
    fontSize: 14,
    color: '#999',
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    padding: 32,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 24,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});

export default FavouritesScreen;
