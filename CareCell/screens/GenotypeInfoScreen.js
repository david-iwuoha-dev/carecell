import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView,
  Image,
  Dimensions
} from 'react-native';

const { height } = Dimensions.get('window');

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
        
        {/* Header Section with Drop */}
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Image 
              source={require('../assets/icon2/Vector.png')} 
              style={styles.backVector} 
              resizeMode="contain"
            />
            <Text style={styles.title}>Genotype Information</Text>
          </TouchableOpacity>
          <Text style={styles.subtitle}>Select genotype</Text>
        </View>

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
    backgroundColor: '#FAF3E1', // Matched background to Personal Info screen
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  headerContainer: {
    marginTop: height * 0.08, // Standard header drop
    marginBottom: 24,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -4,
  },
  backVector: {
    width: 17,
    height: 17,
    tintColor: '#B22222',
  },
  title: {
    fontSize: 26, // Updated to 26
    fontWeight: 'bold', // Updated to bold
    color: '#B22222',
    marginLeft: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginLeft: 29, // Aligned under the text, past the icon
    marginTop: 4,
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
    borderColor: '#E0E0E0',
    justifyContent: 'space-between',
    // Shadow for consistency with cards
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedCard: {
    borderColor: '#B22222',
    backgroundColor: '#FFF9F9',
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#797777',
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
    height: 55, // Standard height
    borderRadius: 12, // Standard radius
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 80,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GenotypeScreen;