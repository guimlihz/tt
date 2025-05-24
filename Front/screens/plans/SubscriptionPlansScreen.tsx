// screens/plans/SubscriptionPlansScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from './subscriptionPlansStyles';

// Certifique-se que o alias '@' está configurado e funcionando em seu tsconfig.json e babel.config.js
// Se o alias '@' não funcionar, substitua pelo caminho relativo correto, por exemplo:
// const logoImage = require('../../assets/images/logo_branca_simples.png');
const logoImage = require('@/assets/images/logo.png');

// Definindo o tipo para o plano do usuário de forma explícita
type UserPlanStatus = 'free' | 'gold';

const SubscriptionPlansScreen: React.FC = () => {
  const router = useRouter();

  // Simular qual é o plano atual do usuário
  // Usando o tipo UserPlanStatus para garantir que o TypeScript entenda as possibilidades.
  const currentUserPlan: UserPlanStatus = 'free';

  const handleSelectPlan = (planName: string) => {
    if (planName.toLowerCase() === currentUserPlan.toLowerCase()) {
      Alert.alert("Plano Atual", `Você já está no ${planName}.`);
    } else if (planName === "Plano Gold") {
      Alert.alert("Plano Gold", "Implementar lógica de assinatura para o Plano Gold.");
      // Ex: router.push('/payment-flow');
    } else {
       Alert.alert("Plano Free", "Você escolheu continuar com o Plano Free.");
    }
  };

  const freePlanFeatures = [
    "Crie até 4 rotinas de treino diferentes",
    "Gere treinos com IA (pedidos ilimitados)",
    "Acompanhamento de progressão de carga",
  ];

  const goldPlanFeatures = [
    "Todos os benefícios do Plano Free",
    "Criação ilimitada de rotinas de treino",
    "Estatísticas avançadas de progresso",
    "Suporte prioritário",
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Image source={logoImage} style={styles.logo} />
        <Text style={styles.mainTitle}>Nossos Planos</Text>

        {/* Card Plano Free */}
        <View style={styles.planCard}>
          <Text style={styles.planTitle}>Plano Free</Text>
          <View style={styles.featureList}>
            {freePlanFeatures.map((feature, index) => (
              <View key={`free-${index}`} style={styles.featureItem}>
                <Text style={styles.featureIcon}>✅</Text>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity
            style={[
              styles.actionButton,
              currentUserPlan === 'free' && styles.currentPlanButton
            ]}
            onPress={() => handleSelectPlan('Plano Free')}
            disabled={currentUserPlan === 'free'}
          >
            <Text style={[
              styles.actionButtonText,
              currentUserPlan === 'free' && styles.currentPlanButtonText
            ]}>
              {(currentUserPlan as UserPlanStatus) === 'free' ? 'Seu Plano Atual' : 'Continuar com Free'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Card Plano Gold */}
        <View style={[styles.planCard, {borderColor: '#FFD700'}]}>
           <Text style={[styles.planTitle, styles.goldTitle]}>Plano Gold</Text>
          <View style={styles.featureList}>
            {goldPlanFeatures.map((feature, index) => (
              <View key={`gold-${index}`} style={styles.featureItem}>
                <Text style={styles.featureIcon}>🌟</Text>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.priceText}>R$ 29,90 / mês</Text>
          <TouchableOpacity
            style={[
                styles.actionButton,
                (currentUserPlan as UserPlanStatus) === 'gold' && styles.currentPlanButton
            ]}
            onPress={() => handleSelectPlan('Plano Gold')}
            disabled={(currentUserPlan as UserPlanStatus) === 'gold'}
          >
            <Text style={[
                styles.actionButtonText,
                (currentUserPlan as UserPlanStatus) === 'gold' && styles.currentPlanButtonText
            ]}>
              {/* TENTATIVA COM AFIRMAÇÃO DE TIPO (TYPE ASSERTION) AQUI 👇 */}
              {(currentUserPlan as UserPlanStatus) === 'gold' ? 'Seu Plano Atual' : 'Assinar Plano Gold'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SubscriptionPlansScreen;