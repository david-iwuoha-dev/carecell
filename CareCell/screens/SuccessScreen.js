import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Dimensions, Animated } from 'react-native';

const { width } = Dimensions.get('window');

const SuccessScreen = ({ onContinue }) => {
  // Animation values for circle
  const circleScaleAnim = useRef(new Animated.Value(0)).current;
  // Animation values for checkmark drawing
  const checkmarkOpacityAnim = useRef(new Animated.Value(0)).current;
  const checkmarkScaleAnim = useRef(new Animated.Value(0.5)).current;
  // Animation values for text
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Staggered entrance animation sequence
    Animated.sequence([
      // 1. Circle pops in with spring animation (0% to 100%)
      Animated.spring(circleScaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
      // 2. Checkmark draws itself after circle appears
      Animated.parallel([
        Animated.timing(checkmarkOpacityAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(checkmarkScaleAnim, {
          toValue: 1,
          tension: 150,
          friction: 6,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Text animation starts after checkmark
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(translateYAnim, {
          toValue: 0,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }, 800);

    // Auto redirect after 3 seconds
    setTimeout(() => {
      if (onContinue) onContinue();
    }, 3500);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        {/* Animated Success Checkmark with Staggered Animation */}
        <View style={styles.checkmarkContainer}>
          {/* Circle with spring pop-in */}
          <Animated.View 
            style={[
              styles.checkmarkCircle,
              {
                transform: [{ scale: circleScaleAnim }],
              }
            ]}
          >
            {/* Checkmark with drawing animation */}
            <Animated.Text 
              style={[
                styles.checkmark,
                {
                  opacity: checkmarkOpacityAnim,
                  transform: [{ scale: checkmarkScaleAnim }],
                }
              ]}
            >
              ✓
            </Animated.Text>
          </Animated.View>
        </View>

        {/* Animated Text Section */}
        <Animated.View 
          style={[
            styles.textContainer,
            {
              opacity: opacityAnim,
              transform: [{ translateY: translateYAnim }],
            }
          ]}
        >
          <Text style={styles.title}>Successful!</Text>
          <Text style={styles.description}>
            Congratulations, you've successfully reset your password.
          </Text>
          <Text style={styles.redirectText}>Redirecting to login...</Text>
        </Animated.View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F0',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  checkmarkContainer: {
    marginBottom: 20,
  },
  checkmarkCircle: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: (width * 0.3) / 2,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  checkmark: {
    fontSize: width * 0.15,
    color: '#FFFFFF',
    fontFamily: 'Brand-Bold',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Brand-Bold',
    color: '#000000',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Brand-Regular',
    color: '#6B5E5E',
    textAlign: 'center',
    lineHeight: 24,
  },
  redirectText: {
    fontSize: 14,
    fontFamily: 'Brand-Regular',
    color: '#6B5E5E',
    marginTop: 8,
    opacity: 0.8,
  },
});

export default SuccessScreen;