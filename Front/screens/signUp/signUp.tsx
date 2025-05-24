// app/signUp.tsx

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { styles } from './signUpStyles'; // Criaremos este arquivo de estilo

// Se você for usar ícones de alguma biblioteca, importe-os aqui. Ex:
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const logoImage = require('@/assets/images/logo.png');

const SignUpScreen: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [goal, setGoal] = useState('');
  const [availability, setAvailability] = useState('');

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleActualSignUp = async () => {
    // 1. Validação básica no frontend
    if (!username.trim() || !email.trim() || !password || !confirmPassword || 
        !age.trim() || !weight.trim() || !height.trim() || !goal.trim() || !availability.trim()) {
      Alert.alert('Erro de Cadastro', 'Por favor, preencha todos os campos.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erro de Cadastro', 'As senhas não coincidem.');
      return;
    }

    setIsLoading(true);

    // 2. Montar o corpo da requisição com os nomes de campo que sua API espera
    const userData = {
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password: password, // A API no backend é responsável por fazer o hash
      age: parseInt(age, 10),
      weight: parseFloat(weight.replace(',', '.')), // Trata vírgula e converte para número
      height: parseInt(height, 10),
      goal: goal.trim(),
      availability: availability.trim(),
    };

    try {
      // 3. Fazer a requisição POST para sua API de cadastro
      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      // Tenta ler a resposta como JSON, mesmo que seja um erro,
      // pois sua API pode retornar mensagens de erro em JSON.
      const responseData = await response.json().catch(() => ({ message: 'Resposta inválida do servidor' }));


      if (response.ok) { // response.ok é true para status HTTP 200-299
        setIsLoading(false); // Para o loading ANTES do Alert e navegação
        Alert.alert(
          'Cadastro Realizado!',
          responseData.message || 'Usuário registrado com sucesso! Você será redirecionado para o login.'
        );
        console.log("Sucesso no cadastro. Tentando navegar para a rota raiz ('/').");
        router.replace('/'); // Redireciona para a tela de login (app/index.tsx)
      } else {
        setIsLoading(false);
        // Trata erros vindos da API (ex: email já existe, validações do backend)
        Alert.alert(
          'Erro no Cadastro',
          responseData.message || `Erro ${response.status}: Não foi possível realizar o cadastro. Verifique os dados.`
        );
        console.error('Erro no cadastro vindo da API:', responseData);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Erro na requisição de cadastro (catch geral):', error);
      Alert.alert('Erro de Rede', 'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.');
    }
  };
  
  // Seu JSX para o return da tela de SignUp, como você colou anteriormente:
  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      <Text style={styles.headerTitle}>Tela de cadastro</Text>
      <Image
        source={logoImage}
        style={styles.logo}
      />

      <Text style={styles.sectionTitle}>Informações de login:</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome de usuário:"
          placeholderTextColor="#A0A0A0"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
      </View>

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

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha:"
          placeholderTextColor="#A0A0A0"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!isConfirmPasswordVisible}
        />
        <TouchableOpacity
          style={styles.eyeIconContainer}
          onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
        >
          <Text style={styles.eyeIconText}>{isConfirmPasswordVisible ? '🙈' : '👁️'}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Informações do usuário:</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Idade:"
          placeholderTextColor="#A0A0A0"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Peso (kg):"
          placeholderTextColor="#A0A0A0"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Altura (cm):"
          placeholderTextColor="#A0A0A0"
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Meta (Ex: Hipertrofia):"
          placeholderTextColor="#A0A0A0"
          value={goal}
          onChangeText={setGoal}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Disponibilidade (Ex: 3 dias/semana):"
          placeholderTextColor="#A0A0A0"
          value={availability}
          onChangeText={setAvailability}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#FFFFFF" style={{ marginVertical: 20 }} />
      ) : (
        <TouchableOpacity style={styles.signUpButton} onPress={handleActualSignUp}>
          <Text style={styles.signUpButtonText}>Cadastrar</Text>
        </TouchableOpacity>
      )}

      {!isLoading && (
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default SignUpScreen;