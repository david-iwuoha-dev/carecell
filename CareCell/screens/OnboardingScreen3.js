import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, Dimensions, Animated } from 'react-native';

const { width, height } = Dimensions.get('window');

const OnboardingScreen3 = ({ onNext }) => {
  const slideAnim = useRef(new Animated.Value(width)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slidingSection, { transform: [{ translateX: slideAnim }] }]}>
        <View style={styles.imageWrapper}>
          <Image 
            source={require('../assets/onboarding3image.webp')} 
            style={styles.heroImage}
          />
        </View>
        <View style={styles.textGroup}>
          <Text style={styles.title}>Track How You Feel: Your Body Speaks</Text>
          <Text style={styles.description}>
            Log your pain levels, hydration, mood, and sleep. CareCell learns your patterns and gently guides you with insights tailored to your body.
          </Text>
        </View>
      </Animated.View>

      <SafeAreaView style={styles.fixedBottomContainer}>
        <View style={styles.paginationContainer}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
        </View>
        <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={onNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF4E6', 
  },
  slidingSection: {
    flex: 1,
  },
  imageWrapper: {
    height: height * 0.5, 
    width: '100%',
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderBottomLeftRadius: 30, 
    borderBottomRightRadius: 30,
  },
  textGroup: {
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  title: {
    fontFamily: 'Brand-Bold',
    fontSize: 24,
    color: '#1A1A1A',
    lineHeight: 32,
    marginBottom: 15,
  },
  description: {
    fontFamily: 'Brand-Regular',
    fontSize: 14,
    color: '#4A4A4A',
    lineHeight: 22,
  },
  fixedBottomContainer: {
    paddingHorizontal: 30,
    paddingBottom: 60,
    paddingTop: 20,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30, 
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFD1D1', 
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24, 
    backgroundColor: '#B22222', 
  },
  button: {
    backgroundColor: '#B22222',
    height: 55,           
    borderRadius: 12,     
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',        
  },
  buttonText: {
    color: '#FFF',
    fontFamily: 'Brand-Bold',
    fontSize: 18,
  },
});

export default OnboardingScreen3;