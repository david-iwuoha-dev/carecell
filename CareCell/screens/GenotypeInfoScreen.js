import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';

const GenotypeScreen = ({ onBack, onContinue }) => {
  const [selectedGenotype, setSelectedGenotype] = useState(null);

  const genotypes = [
    { id: 'SS', title: 'SS', description: 'Most common form of Sickle Cell Disease' },
    { id: 'SC', title: 'SC', description: 'Hemoglobin SC Disease' },
    { id: 'SB', title: 'SB-thalassemia', description: 'Sickle Beta Thalassemia' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Genotype Information</Text>
        </View>

        <Text style={styles.subtitle}>Select genotype</Text>

        {/* Genotype List */}
        <View style={styles.listContainer}>
          {genotypes.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={[
                styles.optionCard, 
                selectedGenotype === item.id && styles.selectedCard
              ]}
              onPress={() => setSelectedGenotype(item.id)}
              activeOpacity={0.7}
            >
              <View style={styles.textContainer}>
                <Text style={styles.optionTitle}>{item.title}</Text>
                <Text style={styles.optionDescription}>{item.description}</Text>
              </View>

              {/* Custom Radio Button */}
              <View style={[
                styles.radioOuter, 
                selectedGenotype === item.id && styles.radioOuterSelected
              ]}>
                {selectedGenotype === item.id && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Button */}
        <TouchableOpacity 
          style={[
            styles.continueButton, 
            { backgroundColor: selectedGenotype ? '#B22222' : '#D9D9D9' }
          ]} 
          activeOpacity={0.8}
          disabled={!selectedGenotype}
          onPress={() => onContinue(selectedGenotype)}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF4E6',
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: -8,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 28,
    color: '#B22222',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Brand-Bold',
    color: '#B22222',
    marginLeft: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#3D1A1A',
    fontFamily: 'Brand-Medium',
    marginBottom: 24,
  },
  listContainer: {
    gap: 16,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    justifyContent: 'space-between',
  },
  selectedCard: {
    borderColor: '#B22222',
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  optionTitle: {
    fontSize: 16,
    fontFamily: 'medium',
    color: '#000000',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#797777',
    fontFamily: 'Medium',
    lineHeight: 20,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: '#B22222',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#B22222',
  },
  continueButton: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 30,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Brand-Bold',
  },
});

export default GenotypeScreen;