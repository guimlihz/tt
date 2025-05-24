// screens/progress/progressStyles.ts
import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center', // Mantém o ScrollView centralizado
    paddingTop: 20,
    // Não precisa de paddingHorizontal aqui se o scrollContainer vai ter
  },
  scrollContainer: {
    width: '100%',
    // alignItems: 'center', // REMOVA OU COMENTE ESTA LINHA
    paddingHorizontal: 15, // Padding para os cards não colarem nas bordas
    paddingBottom: 30, // Respiro no final
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 25,
    textAlign: 'center',
  },
  chartCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 5,
    width: '100%', // O card ocupa 100% da largura do scrollContainer (que tem padding)
    marginBottom: 25,
    alignItems: 'center', // Centraliza o título do gráfico e o componente do gráfico
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
  },
  // Estilos adicionais para a legenda ou eixos, se necessário
});