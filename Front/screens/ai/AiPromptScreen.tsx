// screens/ai/AiPromptScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from './AiPromptStyles';

// Dados fictícios do usuário - no futuro, viriam do estado global/contexto/API após login
const DUMMY_USER_DATA = {
  name: 'Usuário Teste',
  goal: 'Hipertrofia',
  availability: '3 dias/semana',
  experienceLevel: 'Iniciante', // Podemos adicionar isso ao cadastro depois
  // Outros dados relevantes: idade, peso, altura, restrições, etc.
};

// Dados fictícios de um treino gerado
const DUMMY_GENERATED_WORKOUT = {
  id: 'workout123',
  name: 'Treino de Hipertrofia Iniciante (Gerado por IA)',
  days: [
    { day: 'Segunda', focus: 'Peito e Tríceps', exercises: [{ name: 'Supino Reto', sets: '3x10' }, { name: 'Tríceps Pulley', sets: '3x12' }] },
    { day: 'Quarta', focus: 'Costas e Bíceps', exercises: [{ name: 'Barra Fixa (assistida)', sets: '3xAMRAP' }, { name: 'Rosca Direta', sets: '3x10' }] },
    { day: 'Sexta', focus: 'Pernas e Ombros', exercises: [{ name: 'Agachamento Livre', sets: '3x12' }, { name: 'Desenvolvimento Militar', sets: '3x10' }] },
  ]
};

const AiPromptScreen: React.FC = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<typeof DUMMY_USER_DATA | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simula o carregamento dos dados do usuário
    // No app real, você pegaria isso de um estado global (ex: Context API, Zustand, Redux)
    // que foi preenchido após o login ou buscaria da sua API.
    setTimeout(() => {
      setUserData(DUMMY_USER_DATA);
    }, 500);
  }, []);

  const handleGenerateWorkout = () => {
    if (!userData) {
      Alert.alert("Erro", "Dados do usuário não carregados.");
      return;
    }

    setIsLoading(true);
    setError(null);
    console.log('Simulando chamada à API da IA com dados:', userData);

    // Simula a chamada à API da IA
    setTimeout(() => {
      const success = Math.random() > 0.2; // Simula 80% de chance de sucesso

      if (success) {
        console.log('IA gerou o treino:', DUMMY_GENERATED_WORKOUT);
        // No futuro, você armazenaria este treino no estado global ou passaria para a próxima tela.
        // Por agora, vamos apenas dar um alerta e navegar.
        Alert.alert('Treino Gerado!', 'Seu treino personalizado está pronto.');
        // Navega para a tela principal (home das abas)
        // Aqui, você pode querer passar o ID do treino gerado ou os dados do treino
        // router.replace({ pathname: '/home', params: { workoutId: DUMMY_GENERATED_WORKOUT.id }});
        router.replace('/home'); // Simplificado por agora
      } else {
        console.error('Simulação: Erro ao gerar treino pela IA.');
        setError('Não foi possível gerar seu treino no momento. Tente novamente mais tarde.');
      }
      setIsLoading(false);
    }, 3000); // Simula 3 segundos de espera
  };

  if (!userData && !isLoading) { // Adicionado !isLoading para evitar piscar
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.loadingText}>Carregando dados do usuário...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerar Treino com IA</Text>

      {userData && (
        <View style={styles.userDataContainer}>
          <Text style={styles.userDataTitle}>Preparando com base em:</Text>
          <Text style={styles.userDataText}>Objetivo: {userData.goal}</Text>
          <Text style={styles.userDataText}>Disponibilidade: {userData.availability}</Text>
          <Text style={styles.userDataText}>Nível: {userData.experienceLevel}</Text>
        </View>
      )}

      <Text style={styles.promptText}>
        Nossa IA usará suas informações para criar um plano de treino personalizado
        focado em seus objetivos.
      </Text>

      <TouchableOpacity
        style={styles.generateButton}
        onPress={handleGenerateWorkout}
        disabled={isLoading || !userData}>
        <Text style={styles.generateButtonText}>
          {isLoading ? 'Gerando...' : '✨ Gerar Meu Treino'}
        </Text>
      </TouchableOpacity>

      {isLoading && <ActivityIndicator size="large" color="#FFA500" style={{ marginTop: 20 }} />}

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default AiPromptScreen;