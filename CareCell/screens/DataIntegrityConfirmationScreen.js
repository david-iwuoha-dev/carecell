import React, { useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  Animated,
  Image
} from 'react-native';

const DataIntegrityConfirmationScreen = ({ onContinue }) => {
  const scaleValue = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleValue, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      if (onContinue) onContinue();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.overlay}>
        <Animated.View style={[styles.modal, { transform: [{ scale: scaleValue }] }]}>
          
          <View style={styles.iconContainer}>
            <Image 
              source={require('./assets/icon/successicon.png')} 
              style={styles.successImage} 
            />
          </View>
          <Text style={styles.statusTitle}>Data Integrity Confirmed</Text>
          
          <Text style={styles.description}>
            Your donor pool assessment has been securely recorded. This information will help determine eligibility for curative therapy options.
          </Text>

        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF4E6', 
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modal: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  successImage: {
    width: 33,
    height: 33,
    resizeMode: 'contain',
  },
  statusTitle: {
    fontSize: 20,
    fontFamily: 'Brand-Bold',
    color: '#B22222',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
    color: '#6B5E5E',
    textAlign: 'center',
    lineHeight: 22,
    fontFamily: 'Brand-Medium',
  },
});

export default DataIntegrityConfirmationScreen;