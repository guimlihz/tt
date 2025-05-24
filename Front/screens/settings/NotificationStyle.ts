import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
    // justifyContent: 'center', // Removido para o título ficar no topo
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
    marginTop: 40, // Se não houver header
  },
  placeholderText: {
    fontSize: 16,
    color: '#A0A0A0',
    textAlign: 'center',
    marginBottom: 20,
  },
  // backButton: {
  //   position: 'absolute',
  //   top: 40,
  //   left: 20,
  //   padding: 10,
  // },
  // backButtonText: {
  //   color: '#FFFFFF',
  //   fontSize: 16,
  // },
  // settingRow: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   width: '100%',
  //   paddingVertical: 15,
  //   borderBottomWidth: 1,
  //   borderBottomColor: '#333',
  // },
  // settingText: {
  //   color: '#FFFFFF',
  //   fontSize: 16,
  // }
});
