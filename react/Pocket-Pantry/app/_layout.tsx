import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import Login from './login';

import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

import { useColorScheme } from '@/hooks/useColorScheme';
import { UserProvider, useUserContext } from '@/components/contexts/UserContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const API_URL = process.env["EXPO_PUBLIC_API_URL"];

SplashScreen.preventAutoHideAsync();

function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const { userData, setUserData } = useUserContext();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  console.log("thing is " + API_URL);

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
      <GestureHandlerRootView>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          {/* <Text style={{ backgroundColor: 'yellow' }}>user_id {userData.user_id}</Text> */}
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>
      </GestureHandlerRootView>
    );
  }

  return (
    <Login 
      setIsAuthenticated={setIsAuthenticated}
      setUserData={setUserData}
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
