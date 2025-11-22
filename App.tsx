/**
 * StreamBox - Entertainment & Media App
 * A movie browsing app using The Movie Database (TMDB) API
 *
 * @format
 */

import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import RootNavigator from './src/navigation/RootNavigator';
import AppContent from './src/components/AppContent';
import 'react-native-gesture-handler';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent>
          <RootNavigator />
        </AppContent>
      </PersistGate>
    </Provider>
  );
}

export default App;
