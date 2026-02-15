import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const OnboardingScreen4 = ({ onCreateAccount, onSignIn }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Hero Image */}
      <Image 
        source={require('../assets/onboarding4image.webp')} 
        style={styles.image}
      />

      {/* Content Section */}
      <View style={styles.contentContainer}>
        <View>
          <Text style={styles.title}>You're Not Alone — Care, Support & Community</Text>
          <Text style={styles.description}>
            Get simple tips, emotional support, and trustworthy information built for real African experiences.
          </Text>
        </View>

        {/* Action Buttons - Standardized height: 55, radius: 12 */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8} onPress={onCreateAccount}>
            <Text style={styles.primaryButtonText}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.outlineButton} activeOpacity={0.7} onPress={onSignIn}>
            <Text style={styles.outlineButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF4E6',
  },
  image: {
    width: '100%',
    height: '52%',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 32,
    paddingBottom: 60, // Fixed padding for navigation buttons
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontFamily: 'Brand-Bold',
    color: '#3D1A1A',
    lineHeight: 30,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Brand-Regular',
    color: '#6B5E5E',
    lineHeight: 20,
  },
  buttonGroup: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#B32626',
    height: 55,           // Standardized height
    borderRadius: 12,     // Standardized radius
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Brand-Bold',
  },
  outlineButton: {
    backgroundColor: '#FFFFFF',
    height: 55,           // Standardized height
    borderRadius: 12,     // Standardized radius
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#B32626',
  },
  outlineButtonText: {
    color: '#B32626',
    fontSize: 16,
    fontFamily: 'Brand-Bold',
  },
});

export default OnboardingScreen4;