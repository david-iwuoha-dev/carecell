import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const OnboardingScreen3 = ({ onNext }) => {
  return (
    <SafeAreaView style={styles.container}>
      
      {/* Hero Image */}
      <Image 
        source={require('./assets/onboarding3image.png')} 
        style={styles.image}
      />

      {/* Text Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
        Track How You Feel — Your Body Speaks
        </Text>
        
        <Text style={styles.description}>
        Log your pain levels, hydration, mood, and sleep. CareCell learns your patterns and gently guides you with insights tailored to your body.
        </Text>

        {/* Pagination Dots */}
        <View style={styles.pagination}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={onNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF4E6', // Outer pink background
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '50%',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  contentContainer: {
    flex: 1,
    padding: 30,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 26,
    fontFamily: 'Brand-Bold',
    color: '#3D1A1A',
    lineHeight: 32,
  },
  description: {
    fontSize: 15,
    fontFamily: 'Brand-Regular',
    color: '#6B5E5E',
    lineHeight: 22,
    marginTop: 10,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F3D5D5',
  },
  activeDot: {
    width: 24,
    backgroundColor: '#B32626',
  },
  button: {
    backgroundColor: '#B32626',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Brand-Bold',
  },
});

export default OnboardingScreen3;