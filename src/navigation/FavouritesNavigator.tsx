import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeStackParamList } from '../types';
import FavouritesScreen from '../screens/FavouritesScreen';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';

const Stack = createStackNavigator<HomeStackParamList>();

const FavouritesNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#1a1a2e' },
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
