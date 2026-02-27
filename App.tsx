import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './SRC/context/ThemeContext';
import AppNavigator from './SRC/navigation/AppNavigator';

function AppContent() {
  const { colors } = useTheme();
  return (
    <>
      <StatusBar
        barStyle={colors.statusBar}
        backgroundColor={colors.background}
      />
      <AppNavigator />
    </>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
