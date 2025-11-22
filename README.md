# StreamBox

A React Native movie browsing app that lets you discover trending films, save your favorites, and explore movie details. Built with TypeScript and powered by The Movie Database (TMDB) API.

## Features

- Browse trending and popular movies
- View detailed movie information with ratings and descriptions
- Save movies to your favorites list
- User authentication with persistent login
- Dark mode theme
- Smooth navigation and animations

## Tech Stack

- React Native + TypeScript
- Redux Toolkit for state management
- React Navigation for routing
- AsyncStorage for local persistence
- TMDB API for movie data
- React Native Vector Icons

## Setup

### Prerequisites

- Node.js 14+
- React Native development environment ([setup guide](https://reactnative.dev/docs/environment-setup))
- TMDB API key (free at [themoviedb.org](https://www.themoviedb.org/settings/api))

### Installation

```bash
# Install dependencies
npm install

# iOS only - install pods
cd ios && pod install && cd ..
```

### Configuration

Create or update `src/services/tmdbApi.ts` with your API key:

```typescript
const API_KEY = 'your_tmdb_api_key_here';
```

## Running the App

```bash
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── navigation/     # Navigation configuration
├── redux/         # Redux store and slices
├── screens/       # App screens
├── services/      # API integration
└── types/         # TypeScript definitions
```

## Screenshots

_Coming soon_

## License

MIT
