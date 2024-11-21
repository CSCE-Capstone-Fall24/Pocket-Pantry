import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import Login from './login';

import { useColorScheme } from '@/hooks/useColorScheme';
import { UserProvider, useUserContext } from '@/components/contexts/UserContext';

SplashScreen.preventAutoHideAsync();

function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const { userId, setUserId } = useUserContext();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  if (isAuthenticated) {
    return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Text style={{ backgroundColor: 'yellow' }}>user_id {userId}</Text>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    );
  }

  return (
    <Login 
      setIsAuthenticated={setIsAuthenticated}
      setUserId={setUserId}
    />
  );
}

export default function Layout() {
  return (
    <UserProvider>
      <RootLayout />
    </UserProvider>
  );
}
