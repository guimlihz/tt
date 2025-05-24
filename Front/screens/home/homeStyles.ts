// screens/home/homeStyles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Fundo preto
    alignItems: 'center',
    paddingTop: 20, // Espaço para o logo, etc.
    paddingHorizontal: 20,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 20,
    // tintColor: '#FFFFFF', // Se for uma imagem que pode ser tingida
  },
  // Estilos para a seção "Treino de Hoje"
  todayWorkoutSection: {
    backgroundColor: '#222222', // Cinza escuro
    borderRadius: 15,
    padding: 20,
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  todayWorkoutTitleText: {
    fontSize: 16,
    color: '#FFFFFF',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  todayWorkoutContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  workoutName: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1, // Para ocupar espaço disponível
  },
  workoutTime: {
    fontSize: 12,
    color: '#CCCCCC',
    position: 'absolute', // Ou ajuste o layout para ficar acima do botão
    top: -10, // Ajuste conforme necessário
    right: 0, // Ajuste conforme necessário
  },
  startButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  startButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyWorkoutContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyWorkoutText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  addWorkoutButton: {
    backgroundColor: '#4CAF50', // Um verde para o call to action
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  addWorkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Botão "Meus Treinos"
  myWorkoutsButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  myWorkoutsButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10, // Espaço para o ícone
  },
  // Seção de Stats
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  statBox: {
    borderRadius: 15,
    padding: 20,
    width: '48%', // Para caber dois na linha com espaço
    alignItems: 'center',
    justifyContent: 'center',
  },
  orangeBox: {
    backgroundColor: '#FFA500', // Laranja
  },
  greenBox: {
    backgroundColor: '#4CAF50', // Verde
  },
  statTitle: {
    fontSize: 14,
    color: '#000000', // Texto escuro para contraste com fundo colorido
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 36,
    color: '#FFFFFF', // Texto branco
    fontWeight: 'bold',
  },
  statValueSmallText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  // Seção Peso
  weightSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal:20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weightText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Ícones (placeholders, depois usar react-native-vector-icons)
  iconPlaceholder: {
    fontSize: 20, // Ajuste conforme necessário
    color: '#000000', // Para ícone dentro do botão branco
  },
  editIconPlaceholder: {
    fontSize: 20,
    color: '#000000',
  }
});