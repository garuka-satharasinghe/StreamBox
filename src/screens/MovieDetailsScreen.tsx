import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { HomeStackParamList } from '../types';
import { getImageUrl } from '../services/tmdbApi';
import { toggleFavourite } from '../redux/favouritesSlice';
import { RootState } from '../redux/store';
import Icon from 'react-native-vector-icons/Feather';

const { width, height } = Dimensions.get('window');

type MovieDetailsScreenRouteProp = RouteProp<HomeStackParamList, 'MovieDetails'>;
type MovieDetailsScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'MovieDetails'>;

interface Props {
  route: MovieDetailsScreenRouteProp;
  navigation: MovieDetailsScreenNavigationProp;
}

const MovieDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { movie } = route.params;
  const dispatch = useDispatch();
  const favourites = useSelector((state: RootState) => state.favourites.favourites);
  const isFavourite = favourites.some((fav) => fav.id === movie.id);

  const handleToggleFavourite = () => {
    dispatch(toggleFavourite(movie));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.backdropContainer}>
        {movie.backdrop_path ? (
          <Image
            source={{ uri: getImageUrl(movie.backdrop_path) }}
            style={styles.backdrop}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.backdrop, styles.placeholderBackdrop]}>
            <Icon name="film" size={80} color="#666" />
          </View>
        )}
        <View style={styles.backdropOverlay} />
        
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.favouriteButton} onPress={handleToggleFavourite}>
          <Icon
            name={isFavourite ? 'heart' : 'heart'}
            size={24}
            color={isFavourite ? '#e94560' : '#fff'}
            style={isFavourite && styles.heartFilled}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.posterSection}>
          {movie.poster_path ? (
            <Image
              source={{ uri: getImageUrl(movie.poster_path) }}
              style={styles.poster}
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.poster, styles.placeholderPoster]}>
              <Icon name="film" size={60} color="#666" />
            </View>
          )}
          
          <View style={styles.titleSection}>
            <Text style={styles.title}>{movie.title}</Text>
            <View style={styles.metaRow}>
              <View style={styles.ratingContainer}>
                <Icon name="star" size={18} color="#ffd700" />
                <Text style={styles.rating}>{movie.vote_average?.toFixed(1) || 'N/A'}</Text>
              </View>
              {movie.release_date && (
                <Text style={styles.year}>
                  {new Date(movie.release_date).getFullYear()}
                </Text>
              )}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.overview}>
            {movie.overview || 'No overview available for this movie.'}
          </Text>
        </View>

        {movie.popularity && (
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Icon name="trending-up" size={24} color="#e94560" />
              <Text style={styles.statValue}>{Math.round(movie.popularity)}</Text>
              <Text style={styles.statLabel}>Popularity</Text>
            </View>
            <View style={styles.statBox}>
              <Icon name="star" size={24} color="#ffd700" />
              <Text style={styles.statValue}>{movie.vote_average?.toFixed(1) || 'N/A'}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  backdropContainer: {
    position: 'relative',
    width: width,
    height: height * 0.35,
  },
  backdrop: {
    width: '100%',
    height: '100%',
  },
  placeholderBackdrop: {
    backgroundColor: '#0f3460',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdropOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favouriteButton: {
    position: 'absolute',
    top: 48,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartFilled: {
    transform: [{ scale: 1.1 }],
  },
  content: {
    padding: 16,
  },
  posterSection: {
    flexDirection: 'row',
    marginTop: -60,
    marginBottom: 24,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 12,
    backgroundColor: '#0f3460',
  },
  placeholderPoster: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleSection: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'flex-end',
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  year: {
    fontSize: 14,
    color: '#999',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  overview: {
    fontSize: 15,
    color: '#ccc',
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#16213e',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});

export default MovieDetailsScreen;
