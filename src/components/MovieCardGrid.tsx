import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { colors } from '../redux/themeSlice';
import { Movie } from '../types';
import { getImageUrl } from '../services/tmdbApi';
import Icon from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 44) / 2;

interface Props {
  movie: Movie;
  onPress: () => void;
  badge?: string;
}

const MovieCardGrid: React.FC<Props> = ({ movie, onPress, badge }) => {
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const theme = colors[themeMode];

  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: theme.card }]} onPress={onPress}>
      <View style={styles.imageContainer}>
        {movie.poster_path ? (
          <Image
            source={{ uri: getImageUrl(movie.poster_path) }}
            style={styles.poster}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.poster, styles.placeholderPoster, { backgroundColor: theme.surface }]}>
            <Icon name="film" size={40} color={theme.textTertiary} />
          </View>
        )}
        {badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
      </View>
      <View style={styles.info}>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
          {movie.title}
        </Text>
        <View style={styles.rating}>
          <Icon name="star" size={14} color={theme.rating} />
          <Text style={[styles.ratingText, { color: theme.text }]}>{movie.vote_average?.toFixed(1) || 'N/A'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: CARD_WIDTH * 1.4,
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  placeholderPoster: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: '#4dd0e1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  badgeText: {
    color: '#0d1b2a',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  info: {
    padding: 12,
  },
  title: {
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
    fontSize: 12,
  },
});

export default MovieCardGrid;
