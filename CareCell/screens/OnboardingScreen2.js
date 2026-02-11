import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  SafeAreaView, 
  Dimensions 
} from 'react-native';

const { width } = Dimensions.get('window');

const OnboardingScreen2 = ({ onNext }) => {
  return (
    <View style={styles.container}>
      {/* 1. Hero Image Section */}
      <View style={styles.imageWrapper}>
        <Image 
          source={require('./assets/onboarding2image.png')} 
          style={styles.heroImage}
        />
      </View>

      {/* 2. Content Section */}
      <SafeAreaView style={styles.contentContainer}>
        <View style={styles.textGroup}>
          <Text style={styles.title}>
            Understand Your Genes, Understand Your Health
          </Text>
          
          <Text style={styles.description}>
            Your genotype is more than a label. CareCell helps you decode what it means, 
            how it affects your daily life, and how to take control of your wellness journey.
          </Text>
        </View>

        {/* 3. Pagination Dots */}
        <View style={styles.paginationContainer}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* 4. Action Button */}
        <TouchableOpacity 
          style={styles.button} 
          activeOpacity={0.8}
          onPress={onNext}
        >
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
  imageWrapper: {
    height: '55%', 
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
  contentContainer: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    paddingBottom: 60,
    paddingTop: 20,
  },
  title: {
    width: 358,
    height: 70,
    fontFamily: 'Brand-Bold',
    fontSize: 24,
    color: '#1A1A1A',
    lineHeight: 32,
    marginBottom: 15,
    alignSelf: 'center',
  },
  description: {
    width: 378,
    height: 155,
    fontFamily: 'Brand-Regular',
    fontSize: 14,
    color: '#4A4A4A',
    lineHeight: 22,
    alignSelf: 'center',
  },
  textGroup: {
    marginTop: 10,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
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
    width: 378,
    height: 65,
    backgroundColor: '#B22222',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontFamily: 'Brand-Bold',
    fontSize: 18,
  },
});

export default OnboardingScreen2;