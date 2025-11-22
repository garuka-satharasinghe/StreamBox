import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { colors } from '../redux/themeSlice';
import { HomeStackParamList } from '../types';
import FavouritesScreen from '../screens/FavouritesScreen';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';

const Stack = createStackNavigator<HomeStackParamList>();

const FavouritesNavigator: React.FC = () => {
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const theme = colors[themeMode];

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: theme.background },
      }}
    >
      <Stack.Screen name="HomeScreen" component={FavouritesScreen} />
      <Stack.Screen 
        name="MovieDetails" 
        component={MovieDetailsScreen}
        options={{
          cardStyleInterpolator: ({ current: { progress } }) => ({
            cardStyle: {
              opacity: progress,
            },
          }),
        }}
      />
    </Stack.Navigator>
  );
};

export default FavouritesNavigator;
