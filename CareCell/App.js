import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { Text, View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Screens
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import OnboardingScreen2 from './screens/OnboardingScreen2';
import OnboardingScreen3 from './screens/OnboardingScreen3';
import OnboardingScreen4 from './screens/OnboardingScreen4';
import SignInScreen from './screens/SignInScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import VerificationCodeScreen from './screens/VerificationCodeScreen';
import NewPasswordScreen from './screens/NewPasswordScreen';
import SuccessScreen from './screens/SuccessScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import PersonalInfoScreen from './screens/PersonalInfoScreen';
import GenotypeInfoScreen from './screens/GenotypeInfoScreen';
import DonorAssessmentScreen from './screens/DonorAssessmentScreen'; // Pediatric Pathway Info
import DonorPoolAssessmentScreen from './screens/DonorPoolAssessmentScreen'; // Pediatric Donor Search
import DataIntegrityConfirmationScreen from './screens/DataIntegrityConfirmationScreen';
import NotificationPreferenceScreen from './screens/NotificationPreferenceScreen';
import HematologyBaselineScreen from './screens/HematologyBaselineScreen';
import AdultDonorAssessmentScreen from './screens/AdultDonorAssessmentScreen'; // Adult Donor Search & Readiness
import AdultPathwayScreen from './screens/AdultPathwayScreen'; // Adult Pathway Info
import HomeScreen from './screens/HomeScreen';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('onboarding1'); 
  const [accountType, setAccountType] = useState(null); 

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          'Brand-Bold': require('./assets/fonts/Nunito-SemiBold.ttf'),
          'Brand-Regular': require('./assets/fonts/Nunito-Regular.ttf'),
          'Brand-Medium': require('./assets/fonts/Nunito-Medium.ttf'),
        });
      } catch (e) {
        console.warn('Font loading failed:', e);
      } finally {
        setFontsLoaded(true);
      }
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) return null;
  if (showSplash) return <SplashScreen onFinish={() => setShowSplash(false)} />;

  switch (currentScreen) {
    case 'onboarding1':
      return <OnboardingScreen onFinish={() => setCurrentScreen('onboarding2')} />;
    case 'onboarding2':
      return <OnboardingScreen2 onNext={() => setCurrentScreen('onboarding3')} />;
    case 'onboarding3':
      return <OnboardingScreen3 onNext={() => setCurrentScreen('onboarding4')} />;
    case 'onboarding4':
      return <OnboardingScreen4 
        onCreateAccount={() => setCurrentScreen('createaccount')} 
        onSignIn={() => setCurrentScreen('signin')} 
      />;
    case 'signin':
      return <SignInScreen 
        onBack={() => setCurrentScreen('onboarding4')}
        onSignIn={() => setCurrentScreen('main')}
        onForgotPassword={() => setCurrentScreen('forgotpassword')}
        onRegister={() => setCurrentScreen('createaccount')}
      />;
    case 'forgotpassword':
      return <ForgotPasswordScreen 
        onBack={() => setCurrentScreen('signin')}
        onSend={() => setCurrentScreen('verification')}
      />;
    case 'verification':
      return <VerificationCodeScreen 
        onBack={() => setCurrentScreen('forgotpassword')}
        onVerify={() => setCurrentScreen('newpassword')}
        onResend={() => console.log('Resend code')}
      />;
    case 'newpassword':
      return <NewPasswordScreen 
        onBack={() => setCurrentScreen('verification')}
        onSend={() => setCurrentScreen('success')}
      />;
    case 'success':
      return <SuccessScreen 
        onContinue={() => setCurrentScreen('signin')}
      />;
    case 'createaccount':
      return <CreateAccountScreen 
        onBack={() => setCurrentScreen('onboarding4')}
        onContinue={(type) => {
          setAccountType(type);
          setCurrentScreen('personalinfo');
        }}
      />;
    case 'personalinfo':
      return <PersonalInfoScreen 
        accountType={accountType}
        onBack={() => setCurrentScreen('createaccount')}
        onContinue={(data) => {
          setCurrentScreen('genotypeinfo');
        }}
      />;
    case 'genotypeinfo':
      return <GenotypeInfoScreen 
        onBack={() => setCurrentScreen('personalinfo')}
        onContinue={(genotype) => {
          // Pathway is the next step for both
          setCurrentScreen(accountType === 'adult' ? 'adultpathway' : 'donorassessment');
        }}
      />;

    // --- ADULT CURATIVE FLOW ---
    case 'adultpathway':
      return <AdultPathwayScreen 
        onBack={() => setCurrentScreen('genotypeinfo')}
        onContinue={() => setCurrentScreen('adultdonor')}
      />;
    case 'adultdonor':
      return <AdultDonorAssessmentScreen 
        onBack={() => setCurrentScreen('adultpathway')}
        onSkip={() => setCurrentScreen('hematologybaseline')}
        onSubmit={() => setCurrentScreen('hematologybaseline')}
      />;

    // --- PEDIATRIC CURATIVE FLOW ---
    case 'donorassessment': // Pediatric Pathway Screen
      return <DonorAssessmentScreen 
        onBack={() => setCurrentScreen('genotypeinfo')}
        onContinue={() => setCurrentScreen('donorpool')}
      />;
    case 'donorpool': // Pediatric Donor Entry
      return <DonorPoolAssessmentScreen 
        onBack={() => setCurrentScreen('donorassessment')}
        onSkip={() => setCurrentScreen('main')}
        onSubmit={() => setCurrentScreen('dataintegrity')}
      />;
    case 'dataintegrity':
      return <DataIntegrityConfirmationScreen 
        onBack={() => setCurrentScreen('donorpool')}
        onContinue={() => setCurrentScreen('hematologybaseline')}
      />;

    // --- FINAL DATA STEPS ---
    case 'hematologybaseline':
      return <HematologyBaselineScreen
        onBack={() => (accountType === 'adult' ? setCurrentScreen('adultdonor') : setCurrentScreen('dataintegrity'))}
        onContinue={() => setCurrentScreen('notificationpreference')}
      />;
    case 'notificationpreference':
      return <NotificationPreferenceScreen
        onBack={() => setCurrentScreen('hematologybaseline')}
        onContinue={() => setCurrentScreen('main')}
      />;
    case 'main':
      return <HomeScreen />;
    default:
      return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});