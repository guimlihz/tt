// screens/guides/exerciseGuidesStyles.ts
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    paddingTop: 20,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  muscleGroupSelectorContainer: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  muscleGroupButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#333',
    borderRadius: 20,
    marginHorizontal: 5,
  },
  muscleGroupButtonSelected: {
    backgroundColor: '#FFA500', // Laranja para selecionado
  },
  muscleGroupButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  currentMuscleGroupTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  exerciseList: {
    width: '100%',
    paddingHorizontal: 15,
  },
  exerciseCard: {
    backgroundColor: '#1C1C1E', // Cinza escuro para o card
    borderRadius: 15,
    marginBottom: 20,
    padding: 15,
    width: '100%',
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flexShrink: 1, // Permite que o texto quebre se for muito longo
  },
  targetMuscle: {
    fontSize: 12,
    color: '#A0A0A0', // Cinza claro
    textTransform: 'uppercase',
  },
  checkboxContainer: {
    padding: 5, // Área de toque maior
  },
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 4,
  },
  checkboxChecked: {
    backgroundColor: '#FFA500', // Laranja quando marcado
    borderColor: '#FFA500',
  },
  checkmark: {
    color: '#000000', // Cor do check (preto para contrastar com laranja)
    fontWeight: 'bold',
  },
  thumbnailContainer: {
    width: '100%',
    aspectRatio: 16 / 9, // Proporção de vídeo
    borderRadius: 10,
    overflow: 'hidden', // Para o borderRadius da imagem
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333', // Fundo enquanto a imagem carrega
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  playButtonOverlay: {
    ...StyleSheet.absoluteFillObject, // Faz o overlay cobrir o container
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Leve escurecida
  },
  // Você precisará de react-native-vector-icons para o ícone de play
  playIcon: {
    // Estilos para o ícone de play (ex: usando MaterialCommunityIcons)
  }
});