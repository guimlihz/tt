import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Preto
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginLeft: 45,
    marginRight: 45
  },
  logo: {
    width: 200, // Ajuste o tamanho conforme sua logo
    height: 200, // Ajuste o tamanho conforme sua logo
    resizeMode: 'contain',
    marginBottom: 60,
    // Se sua logo for branca como na imagem, e o fundo já é preto,
    // você pode precisar de uma logo com fundo transparente ou ajustar o estilo.
    // Exemplo para logo branca:
    // tintColor: '#FFFFFF', // Se a imagem for um ícone/vetor que pode ser tingido
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333', // Cinza escuro para o fundo do input
    borderRadius: 10,
    marginBottom: 20,
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
  eyeIconText: { // Estilo para o texto do ícone de olho (placeholder)
    fontSize: 20,
    color: '#A0A0A0',
  },
  loginButton: {
    backgroundColor: '#FFFFFF', // Branco
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  loginButtonText: {
    color: '#000000', // Texto preto
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpButton: {
    backgroundColor: '#4A4A4A', // Cinza escuro para o botão de cadastro
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#FFFFFF', // Texto branco
    fontSize: 16,
    fontWeight: 'bold',
  },
});