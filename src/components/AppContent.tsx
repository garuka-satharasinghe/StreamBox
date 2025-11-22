import React from 'react';
import { StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { colors } from '../redux/themeSlice';

interface Props {
  children: React.ReactNode;
}

const AppContent: React.FC<Props> = ({ children }) => {
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const theme = colors[themeMode];

  return (
    <>
      <StatusBar
        barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />
      {children}
    </>
  );
};

export default AppContent;
