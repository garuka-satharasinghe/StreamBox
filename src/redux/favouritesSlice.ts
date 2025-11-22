import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavouritesState, Movie } from '../types';

const initialState: FavouritesState = {
  favourites: [],
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavourite: (state, action: PayloadAction<Movie>) => {
      const exists = state.favourites.find(movie => movie.id === action.payload.id);
      if (!exists) {
        state.favourites.push(action.payload);
      }
    },
    removeFavourite: (state, action: PayloadAction<number>) => {
      state.favourites = state.favourites.filter(movie => movie.id !== action.payload);
    },
    toggleFavourite: (state, action: PayloadAction<Movie>) => {
      const index = state.favourites.findIndex(movie => movie.id === action.payload.id);
      if (index >= 0) {
        state.favourites.splice(index, 1);
      } else {
        state.favourites.push(action.payload);
      }
    },
  },
});

export const { addFavourite, removeFavourite, toggleFavourite } = favouritesSlice.actions;
export default favouritesSlice.reducer;
