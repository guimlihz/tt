// screens/plans/subscriptionPlansStyles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { // Contêiner raiz da tela
    flex: 1,
    backgroundColor: '#000000',
    // alignItems: 'center', // Este alignItems aqui é para o ScrollView como um todo.
                         // Se o ScrollView tiver width: '100%', não fará diferença visual.
                         // Mas se não tiver, ele centralizará o ScrollView.
    paddingTop: 20,
    paddingHorizontal: 20, // Padding aplicado nas laterais da tela
  },
  scrollContainer: { // Aplicado ao contentContainerStyle do ScrollView
    width: '100%',    // O conteúdo ocupa 100% da largura disponível dentro do padding do container
    alignItems: 'center', // <<--- TENTE REMOVER OU COMENTAR ESTA LINHA
                       // Se os planCards são width: '100%', este alignItems não deveria ser necessário
                       // para o alinhamento horizontal deles, e pode causar problemas se
                       // houver alguma interpretação inesperada de "centro".
    paddingBottom: 30,
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
    marginBottom: 30,
    textAlign: 'center',
  },
  planCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 15,
    padding: 20,
    width: '100%', // Faz o card ocupar toda a largura do scrollContainer
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#333333',
  },
  planTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
    textAlign: 'center',
  },
  goldTitle: {
    color: '#FFD700', // Cor dourada para o plano gold
  },
  featureList: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureIcon: { // Para o emoji de check
    fontSize: 18,
    marginRight: 10,
  },
  featureText: {
    fontSize: 16,
    color: '#E0E0E0',
    flexShrink: 1,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#FFA500', // Laranja
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  currentPlanButton: {
    backgroundColor: '#333333', // Cinza mais escuro para plano atual
  },
  currentPlanButtonText: {
    color: '#FFFFFF',
  },
  badge: {
    backgroundColor: '#FFA500',
    color: '#000000',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    overflow: 'hidden', // Para o borderRadius funcionar bem no Text
    position: 'absolute',
    top: -10,
    right: -10,
    transform: [{ rotate: '15deg' }],
  }
});