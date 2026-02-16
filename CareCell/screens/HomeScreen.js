import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  Dimensions
} from 'react-native';
import { Feather, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const HomeScreen = ({ onNavigate }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FDF5E6" />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, Opeyemi</Text>
            <View style={styles.locationContainer}>
              <Feather name="map-pin" size={12} color="#6B5E5E" />
              <Text style={styles.locationText}>Lagos, Nigeria</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.notificationToggle}>
               <View style={styles.toggleTrack}>
                  <Feather name="bell" size={18} color="#6B5E5E" />
                  <View style={styles.bellDot} />
               </View>
               <Image source={require('../assets/icon2/adult.png')} style={styles.avatar} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Today's Health Status Card */}
        <View style={styles.healthStatusCard}>
          <View style={styles.healthStatusHeader}>
            <Text style={styles.healthStatusTitle}>Today's Health Status</Text>
            <Feather name="alert-triangle" size={18} color="#FFF" />
          </View>
          <View style={styles.riskBadge}>
            <View style={styles.greenDot} />
            <Text style={styles.riskText}>Crisis Risk: Low</Text>
          </View>
          
          <View style={styles.hydrationAlert}>
            <Ionicons name="water-outline" size={20} color="#3B82F6" />
            <Text style={styles.hydrationAlertText}>
              Hydration was low yesterday. Drink 2 cups this morning to stay ahead.
            </Text>
          </View>
        </View>

        {/* Action Row */}
        <View style={styles.actionRow}>
          <TouchableOpacity 
            style={styles.crisisButton}
            onPress={() => onNavigate('crisishelp')} 
          >
            <View style={styles.crisisIconCircle}>
              <MaterialCommunityIcons name="alert-octagon-outline" size={22} color="#dfd2d2" />
            </View>
            <Text style={styles.crisisButtonText}>CRISIS HELP</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logPainButton}
            onPress={() => onNavigate('logpain')}>
            <View style={styles.plusCircle}>
              <Feather name="plus" size={22} color="#FFF" />
            </View>
            <Text style={styles.logPainText}>Log New Pain Episode</Text>
          </TouchableOpacity>
        </View>

        {/* Mood Tracker */}
        <View style={styles.moodSection}>
          <Text style={styles.sectionLabel}>How are you feeling?</Text>
          <View style={styles.moodContainer}>
            {[
              { e: '😎', l: 'Great' },
              { e: '😟', l: 'Good', active: true },
              { e: '😐', l: 'Okay' },
              { e: '😔', l: 'Low' }
            ].map((item, i) => (
              <TouchableOpacity key={i} style={[styles.moodItem, item.active && styles.moodItemActive]}>
                <Text style={styles.moodEmoji}>{item.e}</Text>
                <Text style={styles.moodLabel}>{item.l}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={[styles.statIconCircle, { backgroundColor: '#DBEAFE' }]}>
              <Ionicons name="water" size={20} color="#3B82F6" />
            </View>
            <Text style={styles.statTitle}>Water Intake</Text>
            <Text style={styles.statValue}>4 <Text style={styles.statSubValue}>/8 cups</Text></Text>
            <View style={styles.waterProgress}>
               {[1,1,1,1,0,0,0,0].map((v, i) => (
                 <View key={i} style={[styles.progressSegment, v && styles.segmentActive]} />
               ))}
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconCircle, { backgroundColor: '#F3E8FF' }]}>
              <Ionicons name="moon" size={20} color="#A855F7" />
            </View>
            <Text style={styles.statTitle}>Sleep</Text>
            <Text style={styles.statValue}>7 <Text style={styles.statSubValue}>hours</Text></Text>
          </View>
        </View>

        {/* AI Insights Section */}
        <Text style={styles.sectionTitle}>AI Insights</Text>
        
        <TouchableOpacity style={styles.insightCard}>
          <View style={[styles.insightIconBox, { backgroundColor: '#EAB308' }]}>
            <MaterialCommunityIcons name="trending-up" size={24} color="#FFF" />
          </View>
          <View style={styles.insightTextContent}>
            <Text style={styles.insightCardTitle}>Great hydration today!</Text>
            <Text style={styles.insightCardSub}>You're on track with your water intake. This helps prevent pain crisis.</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.insightCard, { marginBottom: 24 }]}>
          <View style={[styles.insightIconBox, { backgroundColor: '#F97316' }]}>
            <MaterialCommunityIcons name="dna" size={24} color="#FFF" />
          </View>
          <View style={styles.insightTextContent}>
            <Text style={styles.insightCardTitle}>Learn about your genes</Text>
            <Text style={styles.insightCardSub}>Understanding your genotype better.</Text>
          </View>
        </TouchableOpacity>

        {/* Report and Trends Section */}
        <View style={styles.statsRow}>
          <TouchableOpacity style={styles.reportTrendCard}
            onPress={() => onNavigate('healthreport')}
          >
            <View style={styles.trendIconCircle}>
              <Feather name="book-open" size={20} color="#FFF" />
            </View>
            <Text style={styles.reportTrendText}>Health Report</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.reportTrendCard}
            onPress={() => onNavigate('viewtrends')}>
            <View style={styles.trendIconCircle}>
              <MaterialCommunityIcons name="trending-up" size={22} color="#FFF" />
            </View>
            <Text style={styles.reportTrendText}>View Trends</Text>
          </TouchableOpacity>
        </View>

        {/* Smart Tools Section */}
        <Text style={styles.sectionTitle}>Smart Tools</Text>
        <View style={styles.smartToolCard}>
          <View style={styles.smartToolInfoRow}>
            <View style={styles.smartToolIconCircle}>
              <MaterialCommunityIcons name="pulse" size={24} color="#B22222" />
            </View>
            <View>
               <Text style={styles.smartToolTitle}>Infant Rest Monitor</Text>
               <Text style={styles.smartToolStatus}>Status: <Text style={{color: '#9CA3AF'}}>Off</Text></Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.fullWidthStartBtn}>
            <Text style={styles.startMonitorText}>Start Monitoring</Text>
          </TouchableOpacity>
        </View>

        {/* Extra spacing to ensure content isn't hidden by the global Nav Bar */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating AI Button */}
      <TouchableOpacity style={styles.floatingAiButton}>
        <MaterialCommunityIcons name="chat-processing" size={28} color="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF9F1' },
  scrollContent: { padding: 20 },
  
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginTop: 20 },
  greeting: { fontSize: 20, fontFamily: 'Brand-Bold', color: '#4B3F3F' },
  locationContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  locationText: { fontSize: 12, color: '#6B5E5E', marginLeft: 4 },
  
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  notificationToggle: { 
    flexDirection: 'row', backgroundColor: '#FFF', padding: 4, borderRadius: 30, alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2
  },
  toggleTrack: { paddingHorizontal: 12, position: 'relative' },
  bellDot: { width: 6, height: 6, backgroundColor: '#EAB308', borderRadius: 3, position: 'absolute', top: 0, right: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20 },

  healthStatusCard: { backgroundColor: '#B22222', borderRadius: 20, padding: 16, marginBottom: 20 },
  healthStatusHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  healthStatusTitle: { color: '#FFF', fontSize: 16, fontFamily: 'Brand-Bold' },
  riskBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, marginVertical: 10 },
  greenDot: { width: 8, height: 8, backgroundColor: '#22C55E', borderRadius: 4, marginRight: 6 },
  riskText: { color: '#FFF', fontSize: 10, fontFamily: 'Brand-Medium' },
  hydrationAlert: { backgroundColor: '#FFF', borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'center' },
  hydrationAlertText: { flex: 1, fontSize: 11, color: '#4B3F3F', marginLeft: 10, lineHeight: 16 },

  actionRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  crisisButton: { flex: 1, backgroundColor: '#B22222', borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  crisisIconCircle: { backgroundColor: '#FFF', width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginRight: 8 },
  crisisButtonText: { color: '#FFF', fontSize: 11, fontFamily: 'Brand-Bold' },
  
  logPainButton: { flex: 1.2, backgroundColor: '#FFF', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#FEE2E2', flexDirection: 'row', alignItems: 'center' },
  plusCircle: { backgroundColor: '#B22222', width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginRight: 8 },
  logPainText: { color: '#B22222', fontSize: 11, fontFamily: 'Brand-Bold' },

  moodSection: { backgroundColor: '#FFF', borderRadius: 20, padding: 16, marginBottom: 20 },
  sectionLabel: { fontSize: 12, color: '#6B5E5E', marginBottom: 12 },
  moodContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  moodItem: { alignItems: 'center', padding: 10, borderRadius: 12, backgroundColor: '#F9FAFB', width: '22%' },
  moodItemActive: { borderWidth: 1, borderColor: '#B22222', backgroundColor: '#FFF' },
  moodEmoji: { fontSize: 24, marginBottom: 4 },
  moodLabel: { fontSize: 11, color: '#6B5E5E' },

  statsRow: { flexDirection: 'row', gap: 16, marginBottom: 20 },
  statCard: { flex: 1, backgroundColor: '#FFF', borderRadius: 20, padding: 16 },
  statIconCircle: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  statTitle: { fontSize: 12, color: '#6B5E5E', marginBottom: 4 },
  statValue: { fontSize: 22, fontFamily: 'Brand-Bold', color: '#1F2937' },
  statSubValue: { fontSize: 12, color: '#9CA3AF' },
  waterProgress: { flexDirection: 'row', gap: 4, marginTop: 10 },
  progressSegment: { height: 6, flex: 1, backgroundColor: '#E5E7EB', borderRadius: 3 },
  segmentActive: { backgroundColor: '#3B82F6' },

  sectionTitle: { fontSize: 16, fontFamily: 'Brand-Bold', color: '#1F2937', marginBottom: 12 },
  insightCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  insightIconBox: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  insightTextContent: { flex: 1 },
  insightCardTitle: { fontSize: 14, fontFamily: 'Brand-Bold', color: '#1F2937' },
  insightCardSub: { fontSize: 11, color: '#6B5E5E', marginTop: 2 },

  reportTrendCard: { flex: 1, backgroundColor: '#FFF', borderRadius: 20, padding: 20, alignItems: 'center' },
  trendIconCircle: { backgroundColor: '#B22222', width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  reportTrendText: { fontSize: 13, fontFamily: 'Brand-Bold', color: '#4B3F3F' },

  smartToolCard: { backgroundColor: '#FEF9C3', borderRadius: 24, padding: 16, marginBottom: 20 },
  smartToolInfoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  smartToolIconCircle: { backgroundColor: '#FFF', width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  smartToolTitle: { fontSize: 15, fontFamily: 'Brand-Bold', color: '#4B3F3F' },
  smartToolStatus: { fontSize: 12, color: '#4B3F3F', marginTop: 2 },
  fullWidthStartBtn: { backgroundColor: '#B22222', borderRadius: 16, height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  startMonitorText: { color: '#FFF', fontSize: 15, fontFamily: 'Brand-Bold' },

  floatingAiButton: { position: 'absolute', right: 20, bottom: 20, backgroundColor: '#B22222', width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', elevation: 5 },
});

export default HomeScreen;