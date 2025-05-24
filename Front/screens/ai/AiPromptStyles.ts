// screens/ai/aiPromptStyles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center', // Centralizar enquanto não temos muito conteúdo
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
    textAlign: 'center',
  },
  userDataContainer: {
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    padding: 15,
    marginBottom: 25,
    width: '100%',
  },
  userDataTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  userDataText: {
    fontSize: 16,
    color: '#E0E0E0',
    marginBottom: 5,
  },
  promptText: {
    fontSize: 16,
    color: '#CCCCCC',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  generateButton: {
    backgroundColor: '#FFFFFF', // Botão branco como o de Login
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  generateButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 18,
    color: '#FFA500', // Laranja para o carregamento
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30', // Vermelho para erro
    marginTop: 20,
    textAlign: 'center',
  },
  // Adicione mais estilos conforme necessário
});