import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  Switch,
  ScrollView,
  Dimensions
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

const NotificationPreferenceScreen = ({ onBack, onContinue }) => {
  const [preferences, setPreferences] = useState({
    hydration: false,
    medication: false,
    crisis: false,
  });

  const toggleSwitch = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Section with Drop */}
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Feather name="chevron-left" size={28} color="#B22222" />
            <Text style={styles.title}>Notification Preference</Text>
          </TouchableOpacity>
          <Text style={styles.subtitle}>Choose how CareCell can support you</Text>
        </View>

        {/* Preference Cards */}
        <View style={styles.cardContainer}>
          
          {/* Hydration Reminders */}
          <View style={styles.preferenceCard}>
            <View style={[styles.iconCircle, { backgroundColor: '#E1F0FF' }]}>
              <Feather name="droplet" size={22} color="#007AFF" />
            </View>
            <View style={styles.textGroup}>
              <Text style={styles.cardTitle}>Hydration Reminders</Text>
              <Text style={styles.cardDescription}>Get notified to drink water throughout the day</Text>
            </View>
            <Switch
              trackColor={{ false: '#D9D9D9', true: '#B22222' }}
              thumbColor="#FFFFFF"
              onValueChange={() => toggleSwitch('hydration')}
              value={preferences.hydration}
            />
          </View>

         {/* Medication Reminders */}
<View style={styles.preferenceCard}>
  <View style={[styles.iconCircle, { backgroundColor: '#FFE5E5' }]}>
    {/* Changed from "pill" to "plus-square" */}
    <Feather name="plus-square" size={22} color="#FF3B30" />
  </View>
  <View style={styles.textGroup}>
    <Text style={styles.cardTitle}>Medication Reminders</Text>
    <Text style={styles.cardDescription}>Never miss your scheduled medications</Text>
  </View>
  <Switch
    trackColor={{ false: '#D9D9D9', true: '#B22222' }}
    thumbColor="#FFFFFF"
    onValueChange={() => toggleSwitch('medication')}
    value={preferences.medication}
  />
</View>

          {/* Crisis Alerts */}
          <View style={styles.preferenceCard}>
            <View style={[styles.iconCircle, { backgroundColor: '#FFF0E0' }]}>
              <Feather name="alert-triangle" size={22} color="#FF9500" />
            </View>
            <View style={styles.textGroup}>
              <Text style={styles.cardTitle}>Crisis Alerts</Text>
              <Text style={styles.cardDescription}>Get alerts about weather and environmental triggers</Text>
            </View>
            <Switch
              trackColor={{ false: '#D9D9D9', true: '#B22222' }}
              thumbColor="#FFFFFF"
              onValueChange={() => toggleSwitch('crisis')}
              value={preferences.crisis}
            />
          </View>

        </View>

        {/* Info Note */}
        <View style={styles.infoNote}>
          <Text style={styles.infoNoteText}>
            You can change these settings anytime from your profile.
          </Text>
        </View>

        {/* Create Account Button */}
        <TouchableOpacity style={styles.createButton} activeOpacity={0.8} onPress={onContinue}>
          <Text style={styles.createButtonText}>Create Account</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF3E1', // Matched background for consistency
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  headerContainer: {
    marginTop: height * 0.08, // Standard header drop
    marginBottom: 24,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -8,
  },
  title: {
    fontSize: 26, // Updated to 26
    fontWeight: 'bold', // Updated to Bold
    color: '#B22222',
    marginLeft: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B5E5E',
    marginLeft: 25, // Aligned under the text
    marginTop: 4,
  },
  cardContainer: {
    gap: 16,
  },
  preferenceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  iconCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textGroup: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3D1A1A',
  },
  cardDescription: {
    fontSize: 12,
    color: '#6B5E5E',
    marginTop: 2,
  },
  infoNote: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginTop: 24,
    alignItems: 'center',
  },
  infoNoteText: {
    fontSize: 12,
    color: '#6B5E5E',
    textAlign: 'center',
  },
  createButton: {
    backgroundColor: '#B22222',
    height: 55, // Consistent button height
    borderRadius: 12, // Consistent button radius
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NotificationPreferenceScreen;