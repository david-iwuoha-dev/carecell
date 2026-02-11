import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView,
  Image
} from 'react-native';

const CreateAccountScreen = ({ onBack, onContinue }) => {
  const [selectedType, setSelectedType] = useState('adult'); 

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Account Setup</Text>
        </View>

        <Text style={styles.questionText}>Who are you creating this account for?</Text>

        <View style={styles.cardContainer}>
          
          <TouchableOpacity 
            style={[styles.card, selectedType === 'adult' && styles.selectedCard]} 
            onPress={() => setSelectedType('adult')}
            activeOpacity={0.9}
          >
            <View style={styles.iconCircle}>
              <Image 
                source={require('./assets/icon2/adult.png')} 
                style={styles.iconImage}
              />
            </View>
            <View style={styles.textGroup}>
              <Text style={styles.optionTitle}>Adult</Text>
              <Text style={styles.optionDescription}>I am managing my own Sickle Cell care</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.card, selectedType === 'child' && styles.selectedCard]} 
            onPress={() => setSelectedType('child')}
            activeOpacity={0.9}
          >
            <View style={styles.iconCircle}>
              <Image 
                source={require('./assets/icon2/child.png')} 
                style={styles.iconImage}
              />
            </View>
            <View style={styles.textGroup}>
              <Text style={styles.optionTitle}>Child</Text>
              <Text style={styles.optionDescription}>I am a parent/guardian managing my child's care</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.continueButton} activeOpacity={0.8} onPress={() => onContinue(selectedType)}>
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.backToLoginContainer} onPress={onBack}>
            <Text style={styles.backToLoginText}>Back to login</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F0',
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    marginLeft: -8,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 28,
    color: '#B32626',
  },
  title: {
    fontSize: 20,
    fontFamily: 'semi-Bold',
    color: '#B22222',
    marginLeft: 4,
  },
  questionText: {
    fontSize: 14,
    color: '#484646',
    fontFamily: 'semi-bold',
    marginBottom: 24,
  },
  cardContainer: {
    gap: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  selectedCard: {
    borderColor: '#B32626',
    backgroundColor: '#FFF',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#B32626',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconImage: {
    width: 24,
    height: 24,
    tintColor: '#FFF',
  },
  textGroup: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontFamily: 'medium',
    color: '#484646',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    fontFamily: 'medium',
    color: '#6B5E5E',
    lineHeight: 20,
  },
  footer: {
    marginTop: 'auto',
    marginBottom: 30,
  },
  continueButton: {
    backgroundColor: '#B22222',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'semi-Bold',
  },
  backToLoginContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  backToLoginText: {
    color: '#B22222',
    fontSize: 16,
    fontFamily: 'MEDIUM',
  },
});

export default CreateAccountScreen;