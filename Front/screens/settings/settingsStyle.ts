// screens/settings/settingsStyles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Fundo preto
    alignItems: 'center',
    paddingTop: 20,
  },
  scrollContainer: {
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
    // tintColor: '#FFFFFF', // Se for uma imagem que pode ser tingida
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
  },
  settingsItem: {
    backgroundColor: '#2C2C2E',
    borderRadius: 10,
    paddingVertical: 12, // Ajuste o padding vertical
    paddingHorizontal: 15, // Ajuste o padding horizontal
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    minHeight: 65, // Altura mínima para consistência
  },
    settingsItemCurrentValue: {
    fontSize: 12,
    color: '#A0A0A0', // Cor mais suave para o valor atual
    marginTop: 2, // Pequeno espaço acima
  },
  settingsItemContent: { // Novo container para o texto principal e o valor atual
    flex: 1, // Para ocupar o espaço restante
    justifyContent: 'center',
  },
  settingsItemChevron: { // Para o ícone de 'maior que' (chevron)
    fontSize: 20,
    color: '#A0A0A0', // Cor suave
    marginLeft: 10,
  },
  iconText: {
    fontSize: 20,
    marginRight: 15,
    color: '#FFFFFF',
    width: 25, // Largura para o ícone
    textAlign: 'center',
  },
  settingsItemText: {
    color: '#FFFFFF',
    fontSize: 16,
    flex: 1, // FAZ O TEXTO OCUPAR O ESPAÇO HORIZONTAL RESTANTE DISPONÍVEL
             // Isso é importante para a quebra de linha funcionar bem.
    // lineHeight: 20, // Você pode definir um lineHeight se quiser mais controle sobre o espaçamento vertical das linhas
  },
  logoutButton: {
    borderRadius: 10,
    paddingVertical: 15, // Padding vertical para o botão de logout
    paddingHorizontal: 20,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30,
    height: 75, // Mantenha a mesma altura dos outros itens para consistência
  },
  logoutButtonText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});