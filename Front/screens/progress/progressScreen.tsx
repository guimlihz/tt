// screens/progress/ProgressScreen.tsx
import React from 'react';
import { View, Text, Image, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { styles } from './progressStyles';

const logoImage = require('../../assets/images/logo.png'); // Ajuste o caminho

const screenWidth = Dimensions.get('window').width;

// Configuração base para os gráficos
const chartConfig = {
  backgroundColor: '#1C1C1E', // Fundo do gráfico (pode ser igual ao card)
  backgroundGradientFrom: '#1C1C1E',
  backgroundGradientTo: '#1C1C1E',
  decimalPlaces: 1, // Casas decimais para os valores
  color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`, // Laranja para linhas e pontos
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Branco para labels
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '4', // Raio dos pontos
    strokeWidth: '2',
    stroke: '#FFA500', // Laranja
  },
  propsForBackgroundLines: {
    strokeDasharray: '', // Linhas sólidas
    stroke: 'rgba(255, 255, 255, 0.2)', // Cor das linhas de fundo
  },
};

// Dados fictícios
const weightEvolutionData = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'], // Meses
  datasets: [
    {
      data: [80, 82, 81, 83, 85, 84], // Peso em kg
      color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`, // Azul
      strokeWidth: 2,
    },
  ],
  legend: ['Peso (kg)'],
};

const caloriesData = {
  labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'], // Semanas
  datasets: [
    {
      data: [2200, 2500, 2300, 2700, 2600, 2800], // Calorias
      color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`, // Verde
      strokeWidth: 2,
    },
  ],
  legend: ['Calorias Gastas'],
};

const frequencyData = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'], // Meses
  datasets: [
    {
      data: [3, 4, 3, 5, 4, 4], // Dias treinados por semana/mês
      color: (opacity = 1) => `rgba(255, 59, 48, ${opacity})`, // Vermelho
      strokeWidth: 2,
    },
  ],
  legend: ['Frequência (dias)'],
};

const ProgressScreen: React.FC = () => {
  // Ajuste a largura do gráfico para caber no card, considerando o padding
  const chartWidth = screenWidth - 30 - 10; // (paddingHorizontal do scrollContainer * 2) - (paddingHorizontal do chartCard * 2)

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Image source={logoImage} style={styles.logo} />
        <Text style={styles.mainTitle}>Meu Progresso</Text>

        {/* Gráfico de Evolução de Peso */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Evolução de peso</Text>
          <LineChart
            data={weightEvolutionData}
            width={chartWidth}
            height={220}
            chartConfig={chartConfig}
            bezier // Linhas curvadas
            style={styles.chartStyle}
            yAxisSuffix="kg"
          />
        </View>

        {/* Gráfico de Calorias Gastas */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Calorias gastas por semana</Text>
          <LineChart
            data={caloriesData}
            width={chartWidth}
            height={220}
            chartConfig={{...chartConfig, color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`, propsForDots: {...chartConfig.propsForDots, stroke: '#4CAF50'}}}
            bezier
            style={styles.chartStyle}
            yAxisSuffix="cal"
          />
        </View>

        {/* Gráfico de Frequência de Treino */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Frequência de treino</Text>
          <LineChart
            data={frequencyData}
            width={chartWidth}
            height={220}
            chartConfig={{...chartConfig, color: (opacity = 1) => `rgba(255, 59, 48, ${opacity})`, propsForDots: {...chartConfig.propsForDots, stroke: '#FF3B30'}}}
            bezier
            style={styles.chartStyle}
            yAxisSuffix=" dias"
            fromZero // Começa o eixo Y do zero
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProgressScreen;