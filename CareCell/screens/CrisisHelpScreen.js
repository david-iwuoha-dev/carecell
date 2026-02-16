import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView,
  Dimensions,
  Platform
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const CrisisHelpScreen = ({ onBack }) => {
  // Dummy data for the map center (Lagos)
  const region = {
    latitude: 6.5244,
    longitude: 3.3792,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header with Back Button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#B22222" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Crisis Help</Text>
        </View>

        <Text style={styles.subtitle}>Immediate assistance and guidance</Text>

        {/* Live Map Section */}
        <View style={styles.mapCard}>
           <View style={styles.mapLabelContainer}>
              <Text style={styles.mapLabel}>Nearest SCD Care Centers</Text>
           </View>
           
           <MapView
             provider={PROVIDER_GOOGLE}
             style={styles.map}
             initialRegion={region}
             customMapStyle={mapStyle} 
           >
             <Marker coordinate={{ latitude: 6.5244, longitude: 3.3792 }}>
                <View style={styles.customMarker}>
                   <MaterialCommunityIcons name="plus-thick" size={16} color="#FFF" />
                </View>
             </Marker>
           </MapView>

           <View style={styles.hospitalInfoCard}>
              <View>
                <Text style={styles.hospitalName}>Lagos University Teaching Hospital</Text>
                <Text style={styles.hospitalDistance}>2.3 km away</Text>
              </View>
              <TouchableOpacity style={styles.callCircle}>
                <Feather name="phone" size={20} color="#3B82F6" />
              </TouchableOpacity>
           </View>
        </View>

        {/* Guidance Section */}
        <View style={styles.guidanceCard}>
          <Text style={styles.sectionTitle}>Immediate First-Aid Guidance</Text>
          
          <View style={styles.stepRow}>
            <View style={[styles.stepIcon, { backgroundColor: '#FDBA12' }]}>
               <Ionicons name="water" size={20} color="#FFF" />
            </View>
            <View style={styles.stepTextContent}>
              <Text style={styles.stepLabel}>Step 1</Text>
              <Text style={styles.stepInstruction}>Administer prescribed pain relief</Text>
            </View>
          </View>

          <View style={styles.stepRow}>
            <View style={[styles.stepIcon, { backgroundColor: '#FDBA12' }]}>
               <MaterialCommunityIcons name="pill" size={20} color="#FFF" />
            </View>
            <View style={styles.stepTextContent}>
              <Text style={styles.stepLabel}>Step 2</Text>
              <Text style={styles.stepInstruction}>Ensure at least 500ml hydration</Text>
            </View>
          </View>

          <View style={styles.stepRow}>
            <View style={[styles.stepIcon, { backgroundColor: '#FDBA12' }]}>
               <MaterialCommunityIcons name="bed" size={20} color="#FFF" />
            </View>
            <View style={styles.stepTextContent}>
              <Text style={styles.stepLabel}>Step 3</Text>
              <Text style={styles.stepInstruction}>Start RAMM monitoring (Rest Mode)</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons - Consistent with established sizes */}
        <TouchableOpacity style={styles.primaryButton}>
          <Feather name="phone-call" size={20} color="#FFF" style={{marginRight: 10}} />
          <Text style={styles.primaryButtonText}>Call Nearest Clinic</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Feather name="share-2" size={20} color="#B22222" style={{marginRight: 10}} />
          <Text style={styles.secondaryButtonText}>Share Location</Text>
        </TouchableOpacity>

        {/* Warning Alert */}
        <View style={styles.warningBox}>
          <Feather name="alert-triangle" size={18} color="#F59E0B" />
          <Text style={styles.warningText}>
            If symptoms worsen rapidly, call emergency services immediately (112 or 911)
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const mapStyle = [
  { "featureType": "poi", "stylers": [{ "visibility": "off" }] }
];

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF9F1' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', marginTop: Platform.OS === 'android' ? 35 : 10 },
  backButton: { marginRight: 10 },
  headerTitle: { fontSize: 22, fontFamily: 'Brand-Bold', color: '#B22222' },
  subtitle: { fontSize: 13, color: '#6B5E5E', marginTop: 10, marginBottom: 20 },
  
  mapCard: { backgroundColor: '#FFF', borderRadius: 24, overflow: 'hidden', elevation: 4, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, marginBottom: 20 },
  map: { width: '100%', height: 200 },
  mapLabelContainer: { position: 'absolute', top: 15, left: 15, zIndex: 10, backgroundColor: '#FFF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  mapLabel: { fontSize: 12, fontFamily: 'Brand-Bold', color: '#4B3F3F' },
  customMarker: { backgroundColor: '#B22222', padding: 6, borderRadius: 20, borderWidth: 2, borderColor: '#FFF' },
  
  hospitalInfoCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  hospitalName: { fontSize: 14, fontFamily: 'Brand-Bold', color: '#1F2937' },
  hospitalDistance: { fontSize: 12, color: '#B22222', marginTop: 4 },
  callCircle: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: '#E5E7EB', justifyContent: 'center', alignItems: 'center' },

  guidanceCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 20, marginBottom: 20 },
  sectionTitle: { fontSize: 15, fontFamily: 'Brand-Bold', color: '#1F2937', marginBottom: 20 },
  stepRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  stepIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  stepTextContent: { flex: 1 },
  stepLabel: { fontSize: 11, color: '#9CA3AF' },
  stepInstruction: { fontSize: 13, color: '#4B3F3F', fontFamily: 'Brand-Medium', marginTop: 2 },

  primaryButton: { backgroundColor: '#B22222', height: 56, borderRadius: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  primaryButtonText: { color: '#FFF', fontSize: 16, fontFamily: 'Brand-Bold' },
  
  secondaryButton: { backgroundColor: '#FFF', height: 56, borderRadius: 16, borderWidth: 1, borderColor: '#B22222', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  secondaryButtonText: { color: '#B22222', fontSize: 16, fontFamily: 'Brand-Bold' },

  warningBox: { backgroundColor: '#FEF3C7', padding: 16, borderRadius: 16, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#FDE68A' },
  warningText: { flex: 1, color: '#92400E', fontSize: 11, marginLeft: 10, lineHeight: 16 }
});

export default CrisisHelpScreen;