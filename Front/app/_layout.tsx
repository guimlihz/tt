// app/_layout.tsx
import {
  DarkTheme as NavigationDarkTheme,      // Importa o tema escuro padrão do React Navigation
  DefaultTheme as NavigationDefaultTheme,  // Importa o tema claro padrão do React Navigation
  ThemeProvider as ReactNavigationThemeProvider // Importa o ThemeProvider do React Navigation
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import React from 'react'; // Necessário para JSX

// Importe seu CustomThemeProvider e o hook useTheme do seu ThemeContext
import { CustomThemeProvider, useTheme } from '../context/ThemeContext'; // Ajuste o caminho se 'contexts' estiver na raiz como '../contexts/ThemeContext'
import { Colors } from '@/constants/Colors'; // Seus GITE: Front/constants/Colors.ts]

// Este componente AppNavigation agora está dentro do escopo do CustomThemeProvider
// e pode usar o hook useTheme() para obter o tema atual do aplicativo ('light' ou 'dark').
function AppNavigationContent() {
  const { appTheme, isDark } = useTheme(); // Hook do nosso ThemeContext

  console.log('[AppNavigationContent] Received from Context:', { appTheme, isDark });

  // Crie temas de navegação personalizados baseados em Colors.ts
  // para que os elementos de navegação (como headers) usem suas cores
  const CustomAppDefaultTheme = {
    ...NavigationDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      primary: Colors.light.tint,
      background: Colors.light.background,
      card: Colors.light.background, // Cor do "cartão" do header/body da Stack
      text: Colors.light.text,       // Cor do texto do header
      border: Colors.light.icon,    // Cor da borda do header (se houver)
      notification: Colors.light.tint,
    },
  };

  const CustomAppDarkTheme = {
    ...NavigationDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      primary: Colors.dark.tint,
      background: Colors.dark.background,
      card: Colors.dark.background,
      text: Colors.dark.text,
      border: Colors.dark.icon,
      notification: Colors.dark.tint,
    },
  };
  
  // Seleciona o tema de navegação com base no appTheme do nosso contexto
  const navigationTheme = isDark ? CustomAppDarkTheme : CustomAppDefaultTheme;

  return (
    // Este ThemeProvider é do @react-navigation/native e aplica o tema aos componentes de navegação
    <ReactNavigationThemeProvider value={navigationTheme}>      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="signUp" options={{ headerShown: false }} />
        <Stack.Screen name="aiPrompt" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="notificationSettings"
          options={{
            title: 'Notificações',
            headerShown: true,
            // Os estilos do header (headerStyle, headerTintColor) serão agora controlados
            // pelo navigationThemeToApply, então não precisamos defini-los aqui individualmente
            // a menos que queiramos um override muito específico para esta tela.
          }}
        />
      </Stack>
      {/* A StatusBar também usa o isDark do nosso contexto para alternar o estilo */}
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </ReactNavigationThemeProvider>
  );
}

// RootLayout é o layout principal que carrega fontes e envolve tudo no CustomThemeProvider
export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    // O CustomThemeProvider (nosso contexto) envolve toda a navegação
    <CustomThemeProvider>
      <AppNavigationContent /> 
    </CustomThemeProvider>
  );
}