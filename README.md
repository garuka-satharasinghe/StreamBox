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

<br><br>
You can now test the app with real authentication! Here are some test users:
#### Primary Test User
- **Username:** `emilys`
- **Password:** `emilyspass`

#### Additional Test Users
- **Username:** `michaelw` | **Password:** `michaelwpass`
- **Username:** `sophiab` | **Password:** `sophiabpass`
- **Username:** `jamesd` | **Password:** `jamesdpass`
- **Username:** `emmal` | **Password:** `emmalpass`
<br><br>

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
<img width="144" height="323.2" alt="Screenshot_1763906933" src="https://github.com/user-attachments/assets/e7df5610-995b-4ab4-8455-6ad22922f7cf" />
<img width="144" height="323.2" alt="Screenshot_1763904913" src="https://github.com/user-attachments/assets/e4f0f8a5-a665-481b-834a-294514dd3cfc" />
<img width="144" height="323.2" alt="Screenshot_1763905080" src="https://github.com/user-attachments/assets/270ad621-576f-4506-96fa-383460021b17" />
<img width="144" height="323.2" alt="Screenshot_1763905087" src="https://github.com/user-attachments/assets/d2922b5a-768f-4f96-be6c-782d8a896d4c" />
<img width="144" height="323.2" alt="Screenshot_1763905030" src="https://github.com/user-attachments/assets/70323f19-149a-47e2-81a4-c8bd6c874c82" />


## License

MIT
