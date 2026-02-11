import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF9F0" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning,</Text>
            <Text style={styles.userName}>David</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
             <Image source={require('./assets/icon2/adult.png')} style={styles.profileImage} />
          </TouchableOpacity>
        </View>

        {/* Mood Tracker Card */}
        <View style={styles.moodCard}>
          <Text style={styles.cardTitle}>How are you feeling today?</Text>
          <View style={styles.moodEmojiContainer}>
            {['😔', '😐', '🙂', '😄', '🤗'].map((emoji, index) => (
              <TouchableOpacity key={index} style={styles.emojiButton}>
                <Text style={styles.emoji}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions Grid */}
        <Text style={styles.sectionTitle}>Daily Tracker</Text>
        <View style={styles.gridContainer}>
          <TouchableOpacity style={[styles.gridItem, { backgroundColor: '#E3F2FD' }]}>
            <View style={[styles.iconCircle, { backgroundColor: '#BBDEFB' }]}>
              <Feather name="droplet" size={20} color="#007AFF" />
            </View>
            <Text style={styles.gridLabel}>Hydration</Text>
            <Text style={styles.gridValue}>1.2L / 3L</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.gridItem, { backgroundColor: '#FFEBEE' }]}>
            <View style={[styles.iconCircle, { backgroundColor: '#FFCDD2' }]}>
              <Feather name="activity" size={20} color="#D32F2F" />
            </View>
            <Text style={styles.gridLabel}>Pain Level</Text>
            <Text style={styles.gridValue}>Log Now</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.gridItem, { backgroundColor: '#E8F5E9' }]}>
            <View style={[styles.iconCircle, { backgroundColor: '#C8E6C9' }]}>
              <Feather name="moon" size={20} color="#388E3C" />
            </View>
            <Text style={styles.gridLabel}>Sleep</Text>
            <Text style={styles.gridValue}>7h 30m</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.gridItem, { backgroundColor: '#FFF3E0' }]}>
            <View style={[styles.iconCircle, { backgroundColor: '#FFE0B2' }]}>
              <Feather name="sun" size={20} color="#F57C00" />
            </View>
            <Text style={styles.gridLabel}>Mood</Text>
            <Text style={styles.gridValue}>Happy</Text>
          </TouchableOpacity>
        </View>

        {/* Medication Reminder */}
        <Text style={styles.sectionTitle}>Up Next</Text>
        <View style={styles.medicationCard}>
          <View style={styles.medIconContainer}>
            <Feather name="pill" size={24} color="#B22222" />
          </View>
          <View style={styles.medInfo}>
            <Text style={styles.medName}>Hydroxyurea</Text>
            <Text style={styles.medTime}>Today, 2:00 PM • 500mg</Text>
          </View>
          <TouchableOpacity style={styles.checkButton}>
            <Feather name="check" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Insights / Tips */}
        <Text style={styles.sectionTitle}>Daily Insight</Text>
        <View style={styles.insightCard}>
          <View style={styles.insightIconContainer}>
            <Image source={require('./assets/icon/icon-insight.png')} style={styles.insightIcon} />
          </View>
          <View style={styles.insightContent}>
            <Text style={styles.insightTitle}>Stay Hydrated</Text>
            <Text style={styles.insightText}>Drinking water helps prevent sickle cell crises by keeping your blood less sticky.</Text>
          </View>
        </View>

      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="home" size={24} color="#B22222" />
          <Text style={[styles.navText, { color: '#B22222' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="bar-chart-2" size={24} color="#999" />
          <Text style={styles.navText}>Report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="users" size={24} color="#999" />
          <Text style={styles.navText}>Community</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="settings" size={24} color="#999" />
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F0',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 10,
  },
  greeting: {
    fontSize: 16,
    fontFamily: 'Brand-Regular',
    color: '#6B5E5E',
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Brand-Bold',
    color: '#B22222',
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFE5E5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFD1D1',
  },
  profileImage: {
    width: 28,
    height: 28,
    tintColor: '#B22222',
  },
  moodCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Brand-Bold',
    color: '#3D1A1A',
    marginBottom: 16,
  },
  moodEmojiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emojiButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Brand-Bold',
    color: '#3D1A1A',
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  gridItem: {
    width: '48%',
    borderRadius: 20,
    padding: 16,
    justifyContent: 'center',
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  gridLabel: {
    fontSize: 14,
    fontFamily: 'Brand-Medium',
    color: '#3D1A1A',
    marginBottom: 4,
  },
  gridValue: {
    fontSize: 13,
    fontFamily: 'Brand-Bold',
    color: '#6B5E5E',
  },
  medicationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  medIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#FFE5E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  medInfo: {
    flex: 1,
  },
  medName: {
    fontSize: 16,
    fontFamily: 'Brand-Bold',
    color: '#3D1A1A',
  },
  medTime: {
    fontSize: 13,
    fontFamily: 'Brand-Regular',
    color: '#6B5E5E',
    marginTop: 4,
  },
  checkButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#B22222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  insightCard: {
    flexDirection: 'row',
    backgroundColor: '#E0F7FA',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  insightIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  insightIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 15,
    fontFamily: 'Brand-Bold',
    color: '#006064',
    marginBottom: 4,
  },
  insightText: {
    fontSize: 12,
    fontFamily: 'Brand-Regular',
    color: '#00838F',
    lineHeight: 18,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    elevation: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 11,
    fontFamily: 'Brand-Medium',
    marginTop: 4,
    color: '#999',
  },
});

export default HomeScreen;