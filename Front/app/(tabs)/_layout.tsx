// app/(tabs)/_layout.tsx
import React from 'react';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// Você pode escolher outros pacotes de ícones, como FontAwesome, Ionicons, etc.

// Cores para as abas, baseadas na sua interface
const activeTintColor = '#FFFFFF'; // Ícone ativo branco
const inactiveTintColor = '#8e8e93'; // Ícone inativo cinza
const tabBarBackgroundColor = '#000000'; // Fundo preto para a tab bar

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeTintColor,
        tabBarInactiveTintColor: inactiveTintColor,
        headerShown: false, // Vamos esconder o header padrão das telas de aba aqui
        tabBarStyle: {
          backgroundColor: tabBarBackgroundColor,
          borderTopWidth: 0, // Remove a linha superior padrão
          elevation: 0, // Remove sombra no Android
          height: Platform.OS === 'ios' ? 90 : 70, // Altura da tab bar
          paddingBottom: Platform.OS === 'ios' ? 30 : 10, // Padding para safe area no iOS
          paddingTop: 10,
        },
        tabBarLabelStyle:{
          fontSize: 10, // Tamanho da fonte do label
          fontWeight: 'bold',
        },
        tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name="treinos" // Corresponde ao arquivo app/(tabs)/treinos.tsx
        options={{
          title: 'Treinos',
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="weight-lifter" color={color} size={size * 1.3} />
          ),
        }}
      />
    <Tabs.Screen
        name="planos" // Corresponde ao arquivo app/(tabs)/planos.tsx
        options={{
          title: 'Planos',
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="clipboard-text-outline" color={color} size={size * 1.1} />
          ),
        }}
    />
    <Tabs.Screen
        name="home" // Corresponde ao arquivo app/(tabs)/home.tsx
        options={{
          title: 'Home',
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-variant" color={color} size={size * 1.3} />
          ),
        }}
      />
      <Tabs.Screen
        name="progresso" // Corresponde ao arquivo app/(tabs)/progresso.tsx
        options={{
          title: 'Progresso',
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chart-line" color={color} size={size * 1.3} />
          ),
        }}
      />
      <Tabs.Screen
        name="ajustes" // Corresponde ao arquivo app/(tabs)/ajustes.tsx
        options={{
          title: 'Ajustes',
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog-outline" color={color} size={size * 1.3} />
          ),
        }}
      />
    </Tabs>
  );
}