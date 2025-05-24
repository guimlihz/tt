// assets/styles/signUpStyles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
    backgroundColor: '#000000', // Preto
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20, // Adicionado padding vertical
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    alignSelf: 'flex-start', // Alinha à esquerda como na imagem
  },
  logo: {
    width: 150, // Ajuste o tamanho conforme sua logo
    height: 150, // Ajuste o tamanho conforme sua logo
    resizeMode: 'contain',
    marginBottom: 30,
    // tintColor: '#FFFFFF', // Se sua logo for um ícone/vetor que pode ser tingido de branco
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    alignSelf: 'flex-start',
    marginBottom: 15,
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333', // Cinza escuro para o fundo do input
    borderRadius: 10,
    marginBottom: 15, // Espaçamento entre inputs
    width: '100%',
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#FFFFFF', // Texto branco
    fontSize: 16,
  },
  eyeIconContainer: {
    padding: 10,
  },
  eyeIconText: {
    fontSize: 20,
    color: '#A0A0A0',
  },
  rowInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  smallInput: {
    width: '30%', // Ajuste para caber 3 na linha com algum espaço
    paddingHorizontal: 10, // Menor padding para inputs menores
  },
  middleInput: {
    // marginHorizontal: '5%', // Para dar espaço entre os inputs da linha
  },
  signUpButton: {
    backgroundColor: '#FFFFFF', // Branco
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    marginTop: 20, // Espaço antes do botão
    marginBottom: 20, // Espaço depois do botão
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  signUpButtonText: {
    color: '#000000', // Texto preto
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 10, 
    paddingVertical: 10, 
    paddingHorizontal: 20,
    backgroundColor: '#555555',
    borderRadius: 5,
    alignSelf: 'center', 
    marginBottom: 20, 
  },
  backButtonText: {
    color: '#FFFFFF', 
    fontSize: 16,     
    fontWeight: 'bold', 
  },
});