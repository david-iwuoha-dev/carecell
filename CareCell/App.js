import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'; 
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

// --- SCREENS ---
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
import DonorAssessmentScreen from './screens/DonorAssessmentScreen';
import DonorPoolAssessmentScreen from './screens/DonorPoolAssessmentScreen';
import DataIntegrityConfirmationScreen from './screens/DataIntegrityConfirmationScreen';
import NotificationPreferenceScreen from './screens/NotificationPreferenceScreen';
import HematologyBaselineScreen from './screens/HematologyBaselineScreen';
import AdultDonorAssessmentScreen from './screens/AdultDonorAssessmentScreen';
import AdultPathwayScreen from './screens/AdultPathwayScreen';
import HomeScreen from './screens/HomeScreen';
import CrisisHelpScreen from './screens/CrisisHelpScreen'; 
import LogPainScreen from './screens/LogPainScreen';
import HealthReportScreen from './screens/HealthReportScreen';
import TrendsScreen from './screens/TrendsScreen'; 
import InsightsScreen from './screens/InsightsScreen';
import ProfileScreen from './screens/ProfileScreen'; // <--- ADDED THIS

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

  // Helper function to render the Navbar threads
  const renderWithNavBar = (Component) => (
    <View style={{ flex: 1 }}>
      {Component}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => setCurrentScreen('main')}>
          <MaterialCommunityIcons 
            name={currentScreen === 'main' ? "home-variant" : "home-variant-outline"} 
            size={24} 
            color={currentScreen === 'main' ? "#B22222" : "#9CA3AF"} 
          />
          <Text style={[styles.navText, currentScreen === 'main' && {color: '#B22222'}]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => setCurrentScreen('viewtrends')}>
          <MaterialCommunityIcons 
            name={currentScreen === 'viewtrends' ? "compass" : "compass-outline"} 
            size={24} 
            color={currentScreen === 'viewtrends' ? "#B22222" : "#9CA3AF"} 
          />
          <Text style={[styles.navText, currentScreen === 'viewtrends' && {color: '#B22222'}]}>Learn</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setCurrentScreen('insights')}>
          <MaterialCommunityIcons 
            name={currentScreen === 'insights' ? "chart-line" : "chart-line-variant"} 
            size={24} 
            color={currentScreen === 'insights' ? "#B22222" : "#9CA3AF"} 
          />
          <Text style={[styles.navText, currentScreen === 'insights' && {color: '#B22222'}]}>Insights</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setCurrentScreen('profile')}>
          <MaterialCommunityIcons 
            name={currentScreen === 'profile' ? "account" : "account-outline"} 
            size={24} 
            color={currentScreen === 'profile' ? "#B22222" : "#9CA3AF"} 
          />
          <Text style={[styles.navText, currentScreen === 'profile' && {color: '#B22222'}]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  switch (currentScreen) {
    // --- ONBOARDING & AUTH ---
    case 'onboarding1': return <OnboardingScreen onFinish={() => setCurrentScreen('onboarding2')} />;
    case 'onboarding2': return <OnboardingScreen2 onNext={() => setCurrentScreen('onboarding3')} />;
    case 'onboarding3': return <OnboardingScreen3 onNext={() => setCurrentScreen('onboarding4')} />;
    case 'onboarding4': return <OnboardingScreen4 onCreateAccount={() => setCurrentScreen('createaccount')} onSignIn={() => setCurrentScreen('signin')} />;
    case 'signin': return <SignInScreen onBack={() => setCurrentScreen('onboarding4')} onSignIn={() => setCurrentScreen('main')} onForgotPassword={() => setCurrentScreen('forgotpassword')} onRegister={() => setCurrentScreen('createaccount')} />;
    case 'forgotpassword': return <ForgotPasswordScreen onBack={() => setCurrentScreen('signin')} onSend={() => setCurrentScreen('verification')} />;
    case 'verification': return <VerificationCodeScreen onBack={() => setCurrentScreen('forgotpassword')} onVerify={() => setCurrentScreen('newpassword')} onResend={() => console.log('Resend')} />;
    case 'newpassword': return <NewPasswordScreen onBack={() => setCurrentScreen('verification')} onSend={() => setCurrentScreen('success')} />;
    case 'success': return <SuccessScreen onContinue={() => setCurrentScreen('signin')} />;
    
    // --- REGISTRATION FLOW ---
    case 'createaccount': return <CreateAccountScreen onBack={() => setCurrentScreen('onboarding4')} onContinue={(type) => { setAccountType(type); setCurrentScreen('personalinfo'); }} />;
    case 'personalinfo': return <PersonalInfoScreen accountType={accountType} onBack={() => setCurrentScreen('createaccount')} onContinue={() => setCurrentScreen('genotypeinfo')} />;
    case 'genotypeinfo': return <GenotypeInfoScreen onBack={() => setCurrentScreen('personalinfo')} onContinue={() => setCurrentScreen(accountType === 'adult' ? 'adultpathway' : 'donorassessment')} />;
    case 'adultpathway': return <AdultPathwayScreen onBack={() => setCurrentScreen('genotypeinfo')} onContinue={() => setCurrentScreen('adultdonor')} />;
    case 'adultdonor': return <AdultDonorAssessmentScreen onBack={() => setCurrentScreen('adultpathway')} onSkip={() => setCurrentScreen('hematologybaseline')} onSubmit={() => setCurrentScreen('hematologybaseline')} />;
    case 'donorassessment': return <DonorAssessmentScreen onBack={() => setCurrentScreen('genotypeinfo')} onContinue={() => setCurrentScreen('donorpool')} />;
    case 'donorpool': return <DonorPoolAssessmentScreen onBack={() => setCurrentScreen('donorassessment')} onSkip={() => setCurrentScreen('main')} onSubmit={() => setCurrentScreen('dataintegrity')} />;
    case 'dataintegrity': return <DataIntegrityConfirmationScreen onBack={() => setCurrentScreen('donorpool')} onContinue={() => setCurrentScreen('hematologybaseline')} />;
    case 'hematologybaseline': return <HematologyBaselineScreen onBack={() => (accountType === 'adult' ? setCurrentScreen('adultdonor') : setCurrentScreen('dataintegrity'))} onContinue={() => setCurrentScreen('notificationpreference')} />;
    case 'notificationpreference': return <NotificationPreferenceScreen onBack={() => setCurrentScreen('hematologybaseline')} onContinue={() => setCurrentScreen('main')} />;

    // --- MAIN TABS (With Nav Bar) ---
    case 'main':
      return renderWithNavBar(<HomeScreen onNavigate={(screen) => setCurrentScreen(screen)} />);
    
    case 'viewtrends':
      return renderWithNavBar(<TrendsScreen onNavigate={(screen) => setCurrentScreen(screen)} />);

    case 'insights':
      return renderWithNavBar(<InsightsScreen onNavigate={(screen) => setCurrentScreen(screen)} />);

    case 'profile': // <--- NEW PROFILE TAB
      return renderWithNavBar(<ProfileScreen onNavigate={(screen) => setCurrentScreen(screen)} />);
    
    // --- SUB-SCREENS (No Nav Bar) ---
    case 'crisishelp': return <CrisisHelpScreen onBack={() => setCurrentScreen('main')} />;
    case 'logpain': return <LogPainScreen onBack={() => setCurrentScreen('main')} />;
    case 'healthreport': return <HealthReportScreen onBack={() => setCurrentScreen('main')} />;

    default: return null;
  }
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    height: 85, // Slightly taller for modern spacing
    paddingBottom: 20, // Padding for safe areas
  },
  navItem: { alignItems: 'center', justifyContent: 'center' },
  navText: { fontSize: 10, marginTop: 4, color: '#9CA3AF', fontFamily: 'Brand-Medium' },
});