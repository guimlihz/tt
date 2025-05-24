// screens/guides/ExerciseGuidesScreen.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router'; // Se precisar de navegação para um player de vídeo dedicado
import { styles } from './exerciseGuidesStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Para o ícone de play e check

// Substitua pela sua logo
const logoImage = require('../../assets/images/logo_branca_simples.png'); // Ajuste o caminho

interface Exercise {
  id: string;
  name: string;
  targetMuscle: string;
  thumbnailUrl: string;
  videoUrl: string;
  checked: boolean; // Para o estado do checkbox
}

interface MuscleGroupData {
  [key: string]: Exercise[];
}

const GUIDES_DATA: MuscleGroupData = {
  'PERNA': [
    { id: 'leg1', name: 'LEG PRESS', targetMuscle: 'Quadríceps, Glúteos, Isquiotibiais', thumbnailUrl: 'https://i.ytimg.com/vi/sRK1_fF9SLo/hqdefault.jpg', videoUrl: 'https://www.youtube.com/watch?v=sRK1_fF9SLo', checked: false },
    { id: 'leg2', name: 'AGACHAMENTO LIVRE', targetMuscle: 'Quadríceps, Glúteos, Core', thumbnailUrl: 'https://i.ytimg.com/vi/U3HlEF_E9fo/hqdefault.jpg', videoUrl: 'https://www.youtube.com/watch?v=U3HlEF_E9fo', checked: false },
    { id: 'leg3', name: 'EXTENSORA', targetMuscle: 'Quadríceps', thumbnailUrl: 'https://i.ytimg.com/vi/mMLa_y4h0ks/hqdefault.jpg', videoUrl: 'https://www.youtube.com/watch?v=mMLa_y4h0ks', checked: false },
  ],
  'PEITO': [
    { id: 'chest1', name: 'SUPINO RETO BARRA', targetMuscle: 'Peitoral Maior, Deltóide Anterior, Tríceps', thumbnailUrl: 'https://i.ytimg.com/vi/sqOw2Y6uDWQ/hqdefault.jpg', videoUrl: 'https://www.youtube.com/watch?v=sqOw2Y6uDWQ', checked: false },
    { id: 'chest2', name: 'SUPINO INCLINADO HALTERES', targetMuscle: 'Peitoral Superior, Deltóide Anterior', thumbnailUrl: 'https://i.ytimg.com/vi/Zz5g2fo6k_A/hqdefault.jpg', videoUrl: 'https://www.youtube.com/watch?v=Zz5g2fo6k_A', checked: false },
  ],
  'COSTAS': [
    { id: 'back1', name: 'PUXADA ALTA FRONTAL', targetMuscle: 'Latíssimo do Dorso, Bíceps', thumbnailUrl: 'https://i.ytimg.com/vi/c6tB4jpse7E/hqdefault.jpg', videoUrl: 'https://www.youtube.com/watch?v=c6tB4jpse7E', checked: false },
  ],
  'BÍCEPS': [
    { id: 'biceps1', name: 'ROSCA DIRETA BARRA', targetMuscle: 'Bíceps Braquial', thumbnailUrl: 'https://i.ytimg.com/vi/kwG2ZQCz22A/hqdefault.jpg', videoUrl: 'https://www.youtube.com/watch?v=kwG2ZQCz22A', checked: false },
  ],
  'TRÍCEPS': [
    { id: 'triceps1', name: 'TRÍCEPS TESTA', targetMuscle: 'Tríceps Braquial', thumbnailUrl: 'https://i.ytimg.com/vi/y4a_g55Nl80/hqdefault.jpg', videoUrl: 'https://www.youtube.com/watch?v=y4a_g55Nl80', checked: false },
  ],
};

const MUSCLE_GROUPS = Object.keys(GUIDES_DATA);

const ExerciseGuidesScreen: React.FC = () => {
  const router = useRouter(); // Para navegação futura
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>(MUSCLE_GROUPS[0]);
  const [exercises, setExercises] = useState<Exercise[]>(GUIDES_DATA[MUSCLE_GROUPS[0]]);

  const handleSelectMuscleGroup = (group: string) => {
    setSelectedMuscleGroup(group);
    setExercises(GUIDES_DATA[group] || []);
  };

  const toggleCheckbox = (exerciseId: string) => {
    setExercises(prevExercises =>
      prevExercises.map(ex =>
        ex.id === exerciseId ? { ...ex, checked: !ex.checked } : ex
      )
    );
    // No futuro, essa mudança de 'checked' poderia ser salva no backend ou localmente
  };

  const handlePlayVideo = (videoUrl: string) => {
    Alert.alert("Abrir Vídeo", `Abrir URL: ${videoUrl}\n\n(Aqui você integraria um player de vídeo ou usaria Linking.openURL)`);
    // Exemplo com Linking (precisa importar Linking de 'react-native'):
    // Linking.openURL(videoUrl).catch(err => console.error("Couldn't load page", err));
  };

  const renderExerciseItem = ({ item }: { item: Exercise }) => (
    <View style={styles.exerciseCard}>
      <View style={styles.exerciseHeader}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text style={styles.exerciseName}>{item.name}</Text>
          <Text style={styles.targetMuscle}>{item.targetMuscle}</Text>
        </View>
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => toggleCheckbox(item.id)}>
          <View style={[styles.checkboxBase, item.checked && styles.checkboxChecked]}>
            {item.checked && <MaterialCommunityIcons name="check" size={18} style={styles.checkmark} />}
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => handlePlayVideo(item.videoUrl)}>
        <View style={styles.thumbnailContainer}>
          <Image source={{ uri: item.thumbnailUrl }} style={styles.thumbnail} />
          <View style={styles.playButtonOverlay}>
            <MaterialCommunityIcons name="play-circle-outline" size={60} color="#FFFFFF" />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image source={logoImage} style={styles.logo} />

      <View style={styles.muscleGroupSelectorContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {MUSCLE_GROUPS.map(group => (
            <TouchableOpacity
              key={group}
              style={[
                styles.muscleGroupButton,
                selectedMuscleGroup === group && styles.muscleGroupButtonSelected,
              ]}
              onPress={() => handleSelectMuscleGroup(group)}>
              <Text style={styles.muscleGroupButtonText}>{group}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Text style={styles.currentMuscleGroupTitle}>{selectedMuscleGroup}</Text>

      <FlatList
        data={exercises}
        renderItem={renderExerciseItem}
        keyExtractor={item => item.id}
        style={styles.exerciseList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ExerciseGuidesScreen;