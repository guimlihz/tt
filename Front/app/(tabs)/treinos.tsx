// app/(tabs)/treinos.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TreinosScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Treinos</Text>
      {/* Aqui você pode re-exportar de screens/treinos/TreinosScreen.tsx no futuro */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  text: { fontSize: 20, color: '#fff' },
});