import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const OnboardingScreen = ({ onFinish }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* 1. Header Image Section */}
      <View style={styles.imageContainer}>
        <Image 
          source={require('./assets/onboarding1image.png')} 
          style={styles.heroImage}
        />
      </View>

      {/* 2. Content Section */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          Your genes,{"\n"}your journey,{"\n"}your daily companion.
        </Text>
        
        <Text style={styles.description}>
          Africa's first genomics-powered digital health platform designed specifically for people living with Sickle Cell Disease.
        </Text>

        {/* 3. Features List */}
        <View style={styles.features}>
          <FeatureItem iconSource={require('./assets/icon/icon-insight.png')} iconSize={{width: 32, height: 35}} text="Personalized genomic insights" />
          <FeatureItem iconSource={require('./assets/icon/icon-health.png')} iconSize={{width: 40, height: 33}} text="Daily health tracking & support" />
          <FeatureItem iconSource={require('./assets/icon/icon-community.png')} iconSize={{width: 38, height: 38}} text="Built for African communities" />
        </View>

        {/* 4. Button */}
        <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={onFinish}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
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
  imageContainer: {
    height: '40%',
    backgroundColor: '#B22222',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  heroImage: {
    width: 450,
    height: 520,
    resizeMode: 'contain',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 30,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  title: {
    fontFamily: 'Brand-Bold',
    fontSize: 28,
    color: '#1E1E1E',
    lineHeight: 36,
  },
  description: {
    fontFamily: 'Brand-Medium',
    fontSize: 14,
    lineHeight: 25,
    letterSpacing: 0,
    color: '#4A4A4A',
    marginTop: 15,
  },
  features: {
    marginVertical: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
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