// screens/settings/SettingsScreen.tsx
import React from 'react'; // Removido useState, useEffect daqui, pois virão do contexto
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from './settingsStyle';
import { useTheme, ThemePreference } from '@/context/ThemeContext'; // Ajuste o caminho se sua pasta contexts estiver em outro lugar

const logoImage = require('@/assets/images/logo.png'); // Ajuste o caminho

interface SettingsItemProps {
  icon: string;
  text: string;
  onPress: () => void;
  isLogout?: boolean;
  currentValueText?: string; 
}

const SettingsItem: React.FC<SettingsItemProps> = ({ icon, text, onPress, isLogout, currentValueText }) => {
  // const { colors } = useTheme(); // Você pode descomentar e usar se precisar estilizar itens com cores do tema
  return (
    <TouchableOpacity
      style={isLogout ? styles.logoutButton : styles.settingsItem}
      onPress={onPress}>
      <Text style={styles.iconText}>{icon}</Text>
      <View style={styles.settingsItemContent}>
        <Text style={isLogout ? styles.logoutButtonText : styles.settingsItemText}>
          {text}
        </Text>
        {currentValueText && !isLogout && (
          <Text style={styles.settingsItemCurrentValue}>{currentValueText}</Text>
        )}
      </View>
      {!isLogout && <Text style={styles.settingsItemChevron}>›</Text>}
    </TouchableOpacity>
  );
};

const SettingsScreen: React.FC = () => {
  const router = useRouter();
  const { themePreference, setAppThemePreference, appTheme } = useTheme();

  const handleToggleTheme = () => {
    let newPreference: ThemePreference;
    if (themePreference === 'light') {
      newPreference = 'dark';
    } else if (themePreference === 'dark') {
      newPreference = 'system';
    } else { // system
      newPreference = 'light';
    }
    setAppThemePreference(newPreference);
    // A LINHA ABAIXO QUE MOSTRAVA O ALERTA FOI REMOVIDA:
    // Alert.alert('Tema Alterado', `Tema definido para: ${newPreference}. (Simulação - App não mudará visualmente ainda)`);
  };

  const getThemePreferenceLabel = (preference: ThemePreference) => {
    if (preference === 'light') return 'Claro';
    if (preference === 'dark') return 'Escuro';
    return 'Padrão do Sistema';
  };

  const settingsOptions = [
    { icon: '✏️', text: 'Editar Perfil', action: () => Alert.alert('Editar Perfil', '...') },
    { icon: '🎯', text: 'Metas de Treino', action: () => Alert.alert('Metas de Treino', '...') },
    { icon: '⏰', text: 'Notificações', action: () => router.push('/notificationSettings') },
    { icon: '🐦', text: 'Preferências de Treino', action: () => Alert.alert('Preferências de Treino', '...') },
    {
      icon: '🌙',
      text: 'Tema',
      action: handleToggleTheme,
      currentValueText: `Atual: ${getThemePreferenceLabel(themePreference)} (Aplicado: ${appTheme === 'light' ? 'Claro' : 'Escuro'})`
    },
    { icon: '📲', text: 'Conectar com apps de saúde', action: () => Alert.alert('Apps de Saúde', '...') },
    { icon: '🔐', text: 'Alterar Senha', action: () => Alert.alert('Alterar Senha', '...') },
    { icon: '📜', text: 'Termos de Uso e Política de Privacidade', action: () => Alert.alert('Termos', '...') },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Sair da Conta', 'Você tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', style: 'destructive', onPress: () => { router.replace('./index'); }},
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Image source={logoImage} style={styles.logo} />
        <Text style={styles.title}>CONFIGURAÇÕES</Text>
        {settingsOptions.map((item, index) => (
          <SettingsItem
            key={index}
            icon={item.icon}
            text={item.text}
            onPress={item.action}
            currentValueText={item.currentValueText}
          />
        ))}
        <SettingsItem icon="🚪" text="Sair da Conta (Logout)" onPress={handleLogout} isLogout />
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;