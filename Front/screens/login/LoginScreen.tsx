import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './style';


const logoImage = require('@/assets/images/logo.png');
const LoginScreen: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Erro de Login', 'Por favor, preencha o email e a senha.');
      return;
    }

    setIsLoading(true);

    const loginData = {
      email: email.trim().toLowerCase(),
      password: password,
    };

    try {
      // Use o endpoint de LOGIN da sua API (ex: /api/auth/login)
      const response = await fetch('http://localhost:5001/api/auth/login', { // <<< CERTIFIQUE-SE QUE ESTE É SEU ENDPOINT DE LOGIN
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const responseData = await response.json();
      setIsLoading(false);

      if (response.ok && responseData.token) {
        // Sucesso no login
        Alert.alert('Login Bem-sucedido!', responseData.message || `Bem-vindo!`);

        // 1. Salvar o token JWT no AsyncStorage
        await AsyncStorage.setItem('userToken', responseData.token);


         if (responseData.user) {
           try {
             await AsyncStorage.setItem('userData', JSON.stringify(responseData.user));
             // Você também pode querer colocar isso em um estado global/contexto
           } catch (e) {
             console.error("Erro ao salvar dados do usuário no AsyncStorage", e);
           }
         }
        
        // 3. Navegar para a tela AiPromptScreen
        router.replace('/aiPrompt');

      } else {
        // Erro no login
        Alert.alert('Erro de Login', responseData.message || `Erro ${response.status}: Credenciais inválidas ou usuário não encontrado.`);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Erro na requisição de login:', error);
      Alert.alert('Erro de Rede', 'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.');
    }
  };

  const handleNavigateToSignUp = () => {
    router.push('/signUp');
  };

  return (
    <View style={styles.container}>
      <Image
        source={logoImage}
        style={styles.logo}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email:"
          placeholderTextColor="#A0A0A0"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Senha:"
          placeholderTextColor="#A0A0A0"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity
          style={styles.eyeIconContainer}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Text style={styles.eyeIconText}>{isPasswordVisible ? '🙈' : '👁️'}</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#FFFFFF" style={{marginVertical: 15}}/>
      ) : (
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      )}

      {!isLoading && (
          <TouchableOpacity style={styles.signUpButton} onPress={handleNavigateToSignUp}>
            <Text style={styles.signUpButtonText}>Cadastrar-se</Text>
          </TouchableOpacity>
      )}
    </View>
  );
};

export default LoginScreen;