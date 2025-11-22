import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Movie } from '../types';
import { getImageUrl } from '../services/tmdbApi';
import Icon from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

interface Props {
  movie: Movie;
  onPress: () => void;
  badge?: string;
}

const MovieCard: React.FC<Props> = ({ movie, onPress, badge }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        {movie.poster_path ? (
          <Image
            source={{ uri: getImageUrl(movie.poster_path) }}
            style={styles.poster}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.poster, styles.placeholderPoster]}>
            <Icon name="film" size={40} color="#666" />
          </View>
        )}
        {badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
        <View style={styles.rating}>
          <Icon name="star" size={14} color="#ffd700" />
          <Text style={styles.ratingText}>{movie.vote_average?.toFixed(1) || 'N/A'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#16213e',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  poster: {
    width: '100%',
    height: CARD_WIDTH * 1.5,
    backgroundColor: '#0f3460',
  },
  placeholderPoster: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#e94560',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  info: {
    padding: 12,
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default MovieCard;
