import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, Dimensions, Animated } from 'react-native';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = ({ onFinish }) => {
  // Animation value for sliding
  const slideAnim = useRef(new Animated.Value(width)).current; // Start at right edge

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.mainWrapper, { transform: [{ translateX: slideAnim }] }]}>
        
        {/* 1. Header Image Section */}
        <View style={styles.imageContainer}>
          <Image 
            source={require('../assets/onboarding1image.png')} 
            style={styles.heroImage}
          />
        </View>

        {/* 2. Content Section */}
        <View style={styles.contentContainer}>
          <View>
            <Text style={styles.title}>
              Your genes,{"\n"}your journey,{"\n"}your daily companion.
            </Text>
            
            <Text style={styles.description}>
              Africa's first genomics-powered digital health platform designed specifically for people living with Sickle Cell Disease.
            </Text>

            {/* 3. Features List */}
            <View style={styles.features}>
              <FeatureItem iconSource={require('../assets/icon/icon-insight.png')} iconSize={{width: 32, height: 35}} text="Personalized genomic insights" />
              <FeatureItem iconSource={require('../assets/icon/icon-health.png')} iconSize={{width: 40, height: 33}} text="Daily health tracking & support" />
              <FeatureItem iconSource={require('../assets/icon/icon-community.png')} iconSize={{width: 38, height: 38}} text="Built for African communities" />
            </View>
          </View>

          {/* 4. Button - Now wrapped in a View to protect its bottom margin */}
          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={onFinish}>
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const FeatureItem = ({ iconSource, iconSize, text }) => (
  <View style={styles.featureItem}>
    <View style={styles.iconCircle}>
      <Image source={iconSource} style={[styles.featureIcon, iconSize]} />
    </View>
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F1',
  },
  mainWrapper: {
    flex: 1,
  },
  imageContainer: {
    height: height * 0.35, // Responsive height (35% of screen)
    backgroundColor: '#B22222',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden'
  },
  heroImage: {
    width: '90%', // Don't use 450px, use percentage
    height: '90%',
    resizeMode: 'contain',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 25,
    justifyContent: 'space-between',
    paddingBottom: 50, // This creates the gap for your nav buttons
  },
  title: {
    fontFamily: 'Brand-Bold',
    fontSize: 26,
    color: '#1E1E1E',
    lineHeight: 34,
  },
  description: {
    fontFamily: 'Brand-Medium',
    fontSize: 14,
    lineHeight: 22,
    color: '#4A4A4A',
    marginTop: 10,
  },
  features: {
    marginTop: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  featureIcon: {
    resizeMode: 'contain',
  },
  featureText: {
    fontFamily: 'Brand-Regular',
    fontSize: 14,
    marginLeft: 15,
    color: '#333',
    flex: 1, // Allows text to wrap if it's too long
  },
  buttonWrapper: {
    width: '100%',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#B22222',
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontFamily: 'Brand-Bold',
    fontSize: 18,
  },
});

export default OnboardingScreen;