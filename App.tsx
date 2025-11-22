/**
 * StreamBox - Entertainment & Media App
 * A movie browsing app using The Movie Database (TMDB) API
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import RootNavigator from './src/navigation/RootNavigator';
import 'react-native-gesture-handler';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
}

export default App;
