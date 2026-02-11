import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Image, Animated, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const SplashScreen = ({ onFinish }) => {
  // Animation values
  const fadeTitle = useRef(new Animated.Value(0)).current;
  const slideTitle = useRef(new Animated.Value(20)).current;
  const fadeSubtitle = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    console.log('SplashScreen mounted');
    // This creates the "staggered" effect from your video
    Animated.sequence([
      Animated.delay(800), // Wait for logo to be seen
      Animated.parallel([
        Animated.timing(fadeTitle, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(slideTitle, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(fadeSubtitle, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {
      console.log('Animation complete');
      // Auto-dismiss after animations complete
      setTimeout(() => {
        console.log('Calling onFinish');
        onFinish && onFinish();
      }, 1000);
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Brand Group - Logo, Title, Subtitle */}
      <View style={styles.brandGroup}>
        <Image 
          source={require('./assets/logo.png')} 
          style={styles.logo}
        />
        
        <Animated.View style={{ 
          opacity: fadeTitle, 
          transform: [{ translateY: slideTitle }] 
        }}>
          <Text style={styles.title}>CareCell</Text>
        </Animated.View>

        <Animated.View style={{ opacity: fadeSubtitle }}>
          <Text style={styles.subtitle}>African Genomics Companion</Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF4E6',
  },
  brandGroup: {
    position: 'absolute',
    top: 236,
    left: 86,
    width: 267,
    height: 244,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logo: {
    width: 115.91,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Brand-Bold',
    fontSize: 32,
    color: '#000000',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Brand-Regular',
    fontSize: 14,
    color: '#4A4A4A',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default SplashScreen;