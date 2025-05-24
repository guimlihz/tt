// screens/settings/NotificationSettingsScreen.tsx
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from './NotificationStyle';
// Você pode querer importar um ícone de voltar ou usar o header da stack

const NotificationSettingsScreen: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Exemplo de botão de voltar se não estiver usando header da stack */}
      {/* <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>‹ Voltar</Text>
      </TouchableOpacity> */}
      <Text style={styles.title}>Configurações de Notificação</Text>
      <Text style={styles.placeholderText}>
        Opções para habilitar/desabilitar notificações, escolher sons, etc.
        aparecerão aqui no futuro.
      </Text>
      {/* Exemplo de um switch (você precisaria de useState para controlar) */}
      {/* <View style={styles.settingRow}>
        <Text style={styles.settingText}>Permitir Notificações</Text>
        <Switch value={true} onValueChange={() => {}} />
      </View> */}
    </View>
  );
};

export default NotificationSettingsScreen;