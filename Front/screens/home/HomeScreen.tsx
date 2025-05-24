// screens/home/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from './homeStyles';
// Para os ícones, você precisará de uma biblioteca como react-native-vector-icons
// Exemplo: import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Substitua pela sua logo
const logoImage = require('@/assets/images/logo.png'); // Ajuste o caminho se necessário

// Tipos para os dados (exemplo)
interface Workout {
  name: string;
  time: string;
}

interface UserStats {
  daysTrained: number;
  totalDays: number;
  caloriesLost: number;
  currentWeight: number;
}

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const [todayWorkout, setTodayWorkout] = useState<Workout | null>(null); // null se não houver treino
  const [userStats, setUserStats] = useState<UserStats>({
    daysTrained: 0,
    totalDays: 0, // Ex: 0/0 se não houver plano ainda
    caloriesLost: 0,
    currentWeight: 0,
  });

  // Simular carregamento de dados ou estado inicial
  useEffect(() => {
    // Aqui você carregaria os dados do usuário/treino de um backend ou armazenamento local
    // Por enquanto, simulamos um usuário novo ou com dados zerados
    const isNewUserOrNoData = true; // Mude para false para ver o estado com dados

    if (isNewUserOrNoData) {
      setTodayWorkout(null);
      setUserStats({
        daysTrained: 0,
        totalDays: 5, // Ex: Meta semanal de 5 dias
        caloriesLost: 0,
        currentWeight: 70, // Um peso padrão ou o último cadastrado
      });
    } else {
      // Exemplo de dados carregados
      setTodayWorkout({ name: 'PEITO', time: '1:20h' });
      setUserStats({
        daysTrained: 4,
        totalDays: 5,
        caloriesLost: 580,
        currentWeight: 75,
      });
    }
  }, []);

  const handleStartWorkout = () => {
    if (todayWorkout) {
      Alert.alert('Iniciar Treino', `Iniciando treino de ${todayWorkout.name}`);
      // Navegar para a tela de treino em progresso
      // router.push('/workout-in-progress'); // Exemplo de rota
    }
  };

  const handleAddWorkout = () => {
    Alert.alert('Adicionar Treino', 'Navegar para a tela de adicionar/selecionar treino.');
    // router.push('/add-workout'); // Exemplo de rota
  };

  const handleMyWorkouts = () => {
    Alert.alert('Meus Treinos', 'Navegar para a lista de treinos.');
    // router.push('/my-workouts-list'); // Exemplo de rota
  };

  const handleEditWeight = () => {
    Alert.alert('Editar Peso', 'Abrir modal ou navegar para editar peso.');
    // router.push('/edit-weight'); // Exemplo de rota
  }

  return (
    <View style={styles.container}>
      <Image source={logoImage} style={styles.logo} />

      {/* Seção Treino de Hoje */}
      <View style={styles.todayWorkoutSection}>
        {todayWorkout ? (
          <>
            <Text style={styles.todayWorkoutTitleText}>Treino de hoje:</Text>
            <View style={styles.todayWorkoutContent}>
              <Text style={styles.workoutName}>{todayWorkout.name.toUpperCase()}</Text>
              <TouchableOpacity style={styles.startButton} onPress={handleStartWorkout}>
                <Text style={styles.startButtonText}>INICIAR</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.workoutTime}>Tempo: {todayWorkout.time}</Text>
          </>
        ) : (
          <View style={styles.emptyWorkoutContainer}>
            <Text style={styles.emptyWorkoutText}>Nenhum treino programado para hoje.</Text>
            <TouchableOpacity style={styles.addWorkoutButton} onPress={handleAddWorkout}>
              <Text style={styles.addWorkoutButtonText}>Criar/Agendar Treino</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Botão Meus Treinos */}
      <TouchableOpacity style={styles.myWorkoutsButton} onPress={handleMyWorkouts}>
        {/* <Icon name="folder-outline" size={24} color="#000000" /> Substitua por um ícone real */}
        <Text style={styles.iconPlaceholder}>📁</Text>
        <Text style={styles.myWorkoutsButtonText}>MEUS TREINOS</Text>
      </TouchableOpacity>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={[styles.statBox, styles.orangeBox]}>
          <Text style={styles.statTitle}>DIAS TREINADOS</Text>
          <Text style={styles.statValue}>
            {userStats.daysTrained}
            <Text style={styles.statValueSmallText}>/{userStats.totalDays}</Text>
          </Text>
        </View>
        <View style={[styles.statBox, styles.greenBox]}>
          <Text style={styles.statTitle}>CALORIAS PERDIDAS</Text>
          <Text style={styles.statValue}>{userStats.caloriesLost}</Text>
        </View>
      </View>

      {/* Peso */}
      <TouchableOpacity style={styles.weightSection} onPress={handleEditWeight}>
        <Text style={styles.weightText}>Peso: {userStats.currentWeight}Kg</Text>
        {/* <Icon name="pencil-outline" size={20} color="#000000" /> Substitua por um ícone real */}
        <Text style={styles.editIconPlaceholder}>✏️</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;