import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView 
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const EnvironmentalTriggersScreen = ({ onBack, onContinue }) => {
  const [selectedTriggers, setSelectedTriggers] = useState([]);
  const [primarySymptom, setPrimarySymptom] = useState(null);

  const triggers = [
    { id: 'cold', label: 'Cold Weather', icon: 'cloud-snow' },
    { id: 'wind', label: 'High Winds', icon: 'wind' },
    { id: 'heat', label: 'Extreme Heat', icon: 'sun' },
    { id: 'stress', label: 'Physical Stress', icon: 'activity' },
  ];

  const toggleTrigger = (id) => {
    if (selectedTriggers.includes(id)) {
      setSelectedTriggers(selectedTriggers.filter(t => t !== id));
    } else {
      setSelectedTriggers([...selectedTriggers, id]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Feather name="chevron-left" size={28} color="#B22222" />
          </TouchableOpacity>
          <Text style={styles.title}>Medical Baseline</Text>
        </View>

        <Text style={styles.subtitle}>Identify your common triggers</Text>

        {/* Environmental Triggers Section */}
        <View style={styles.card}>
          <Text style={styles.cardQuestion}>Which environmental factors trigger your crises?</Text>
          <View style={styles.grid}>
            {triggers.map((item) => {
              const isSelected = selectedTriggers.includes(item.id);
              return (
                <TouchableOpacity 
                  key={item.id} 
                  style={[styles.gridItem, isSelected && styles.gridItemSelected]}
                  onPress={() => toggleTrigger(item.id)}
                >
                  <Feather name={item.icon} size={24} color={isSelected ? "#B22222" : "#6B5E5E"} />
                  <Text style={[styles.gridText, isSelected && styles.gridTextSelected]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Primary Symptom Section */}
        <View style={styles.card}>
          <Text style={styles.cardQuestion}>What is your most frequent primary symptom?</Text>
          <TouchableOpacity 
            style={[styles.symptomButton, primarySymptom === 'joint' && styles.symptomButtonActive]}
            onPress={() => setPrimarySymptom('joint')}
          >
            <Text style={[styles.symptomText, primarySymptom === 'joint' && styles.symptomTextActive]}>
              Joint or Bone Pain
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Button */}
        <TouchableOpacity style={styles.continueButton} activeOpacity={0.8} onPress={onContinue}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F0',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: -8,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Brand-Bold',
    color: '#B22222',
    marginLeft: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B5E5E',
    marginTop: 8,
    marginBottom: 24,
    fontFamily: 'Brand-Regular',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  cardQuestion: {
    fontSize: 15,
    fontFamily: 'Brand-Bold',
    color: '#3D1A1A',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridItem: {
    width: '48%',
    backgroundColor: '#F9F9F9',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  gridItemSelected: {
    backgroundColor: '#FFF1F1',
    borderColor: '#B22222',
  },
  gridText: {
    fontSize: 13,
    color: '#6B5E5E',
    marginTop: 8,
    fontFamily: 'Brand-Medium',
  },
  gridTextSelected: {
    color: '#B22222',
  },
  symptomButton: {
    height: 52,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  symptomButtonActive: {
    backgroundColor: '#B22222',
  },
  symptomText: {
    fontSize: 14,
    color: '#6B5E5E',
    fontFamily: 'Brand-Regular',
  },
  symptomTextActive: {
    color: '#FFFFFF',
    fontFamily: 'Brand-Bold',
  },
  continueButton: {
    backgroundColor: '#B22222',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  continueText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Brand-Bold',
  },
});

export default EnvironmentalTriggersScreen;