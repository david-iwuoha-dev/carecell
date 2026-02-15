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

const CreateAccountScreen = ({ onBack, onContinue }) => {
  const [selectedType, setSelectedType] = useState('adult'); 

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Header - Increased marginTop for better visibility */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Image 
              source={require('../assets/icon2/Vector.png')} 
              style={styles.vectorBackIcon}
            />
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
                source={require('../assets/icon2/adult.png')} 
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
                source={require('../assets/icon2/child.png')} 
                style={styles.iconImage}
              />
            </View>
            <View style={styles.textGroup}>
              <Text style={styles.optionTitle}>Child</Text>
              <Text style={styles.optionDescription}>I am a parent/guardian managing my child's care</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Footer - Increased marginBottom to clear phone nav bars */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.continueButton} 
            activeOpacity={0.8} 
            onPress={() => onContinue(selectedType)}
          >
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.06, // Doubled the margin to bring it down significantly
    marginBottom: 32,
    marginLeft: -8,
  },
  backButton: {
    padding: 8,
  },
  vectorBackIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#B32626',
  },
  title: {
    fontSize: 26,
    fontFamily: 'Brand-Bold',
    fontWeight: '700',
    color: '#B22222',
    marginLeft: 8,
  },
  questionText: {
    fontSize: 14,
    color: '#484646',
    fontFamily: 'Brand-Bold',
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
    fontFamily: 'Brand-Bold',
    color: '#484646',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    fontFamily: 'Brand-Regular',
    color: '#6B5E5E',
    lineHeight: 20,
  },
  footer: {
    marginTop: 'auto',
    marginBottom: 80, // Increased from 40 to 80 to pull the buttons away from the bottom edge
  },
  continueButton: {
    backgroundColor: '#B22222',
    height: 55, // Standard height
    borderRadius: 12, // Standard radius
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Brand-Bold',
  },
  backToLoginContainer: {
    alignItems: 'center',
    marginTop: 20, // Slightly more gap between the two buttons
  },
  backToLoginText: {
    color: '#B22222',
    fontSize: 16,
    fontFamily: 'Brand-Bold',
  },
});

export default CreateAccountScreen;