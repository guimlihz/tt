// contexts/ThemeContext.tsx
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useColorScheme as useSystemColorSchemeHook, Appearance, ColorSchemeName } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '@/constants/Colors'; //


export type ThemePreference = 'light' | 'dark' | 'system';
export type AppTheme = 'light' | 'dark';

interface ThemeContextType {
  themePreference: ThemePreference;
  appTheme: AppTheme;
  isDark: boolean;
  setAppThemePreference: (preference: ThemePreference) => void;
  colors: typeof Colors.light | typeof Colors.dark;
}

const ASYNC_STORAGE_THEME_KEY = 'user-theme-preference';

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const CustomThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const systemThemeFromHook = useSystemColorSchemeHook();
  const nonNullSystemTheme: AppTheme = systemThemeFromHook ?? 'light';

  const [themePreference, setThemePreference] = useState<ThemePreference>('system');
  const [currentAppTheme, setCurrentAppTheme] = useState<AppTheme>(nonNullSystemTheme);

  useEffect(() => {
    const loadPreference = async () => {
      try {
        const savedPreference = await AsyncStorage.getItem(ASYNC_STORAGE_THEME_KEY) as ThemePreference | null;
        if (savedPreference) {
          setThemePreference(savedPreference);
          if (savedPreference === 'light' || savedPreference === 'dark') {
            setCurrentAppTheme(savedPreference);
          } else { // 'system'
            setCurrentAppTheme(nonNullSystemTheme);
          }
        } else {
          setCurrentAppTheme(nonNullSystemTheme);
        }
      } catch (e) {
        console.error("Falha ao carregar preferência de tema.", e);
        setCurrentAppTheme(nonNullSystemTheme); // Fallback
      }
    };
    loadPreference();
  }, [nonNullSystemTheme]); // Depende do nonNullSystemTheme para reavaliar se ele mudar

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme: newSystemThemeFromEvent }) => {
      // 'newSystemThemeFromEvent' pode ser 'light', 'dark', ou null/undefined.
      const validSystemTheme: AppTheme = newSystemThemeFromEvent ?? 'light';
      if (themePreference === 'system') {
        setCurrentAppTheme(validSystemTheme);
      }
    });
    return () => subscription.remove();
  }, [themePreference]); // Depende de themePreference

  const setAppThemePreference = async (preference: ThemePreference) => {
    setThemePreference(preference);
    let newAppThemeTarget: AppTheme;
    if (preference === 'light' || preference === 'dark') {
      newAppThemeTarget = preference;
    } else { // 'system'
      // Pega o esquema de cores atual do sistema no momento da mudança para 'system'
      const currentSystemTheme = Appearance.getColorScheme() ?? 'light';
      newAppThemeTarget = currentSystemTheme;
    }
    setCurrentAppTheme(newAppThemeTarget);

    try {
      await AsyncStorage.setItem(ASYNC_STORAGE_THEME_KEY, preference);
    } catch (e) {
      console.error("Failed to save theme preference.", e);
    }
  };
  const isDark = currentAppTheme === 'dark';
  const activeColors = isDark ? Colors.dark : Colors.light; // Obtém o objeto de cores correto

  console.log(
    '[ThemeContext] Provider Update:',
    {
      preference: themePreference,
      appTheme: currentAppTheme,
      isDark,
      activeColorsBackground: activeColors.background // Exemplo de cor
    }
  );

  return (
    <ThemeContext.Provider value={{ themePreference, appTheme: currentAppTheme, isDark, setAppThemePreference, colors: activeColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um CustomThemeProvider');
  }
  return context;
};