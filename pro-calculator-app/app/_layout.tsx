import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useColorScheme } from 'react-native';
import { useSettings } from '../src/hooks/useSettings';
import { darkTheme, lightTheme } from '../src/theme/colors';

export default function Layout() {
  const systemColorScheme = useColorScheme();
  const { settings } = useSettings();

  const isDark =
    settings.theme === 'dark' ||
    (settings.theme === 'system' && systemColorScheme === 'dark');

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.background },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="history" />
        <Stack.Screen name="settings" />
      </Stack>
    </>
  );
}