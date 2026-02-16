import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView, 
  TextInput,
  Modal,
  Platform,
  Dimensions
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import Slider from '@react-native-community/slider'; // Note: You may need to install this

const { width } = Dimensions.get('window');

const LogPainScreen = ({ onBack }) => {
  const [painLevel, setPainLevel] = useState(5);
  const [historyVisible, setHistoryVisible] = useState(false);
  const [saveSuccessVisible, setSaveSuccessVisible] = useState(false);
  
  // Dummy History Data (In a real app, this would come from a database)
  const [history, setHistory] = useState([
    { id: 1, date: 'Feb 14, 2026', intensity: 'Moderate', location: 'Lower Back' },
    { id: 2, date: 'Feb 10, 2026', intensity: 'Severe', location: 'Chest' },
  ]);

  const handleSave = () => {
    // Logic to save the current episode to history (non-deletable)
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      intensity: painLevel > 7 ? 'Severe' : painLevel > 3 ? 'Moderate' : 'Mild',
      location: 'Selected Area' 
    };
    setHistory([newEntry, ...history]);
    
    // Show success pop-up
    setSaveSuccessVisible(true);
    setTimeout(() => {
      setSaveSuccessVisible(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={onBack}>
            <Ionicons name="chevron-back" size={28} color="#B22222" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Log New Pain Episode</Text>
        </View>
        
        {/* NEW: Previous Episodes Button */}
        <TouchableOpacity 
          style={styles.historyButton} 
          onPress={() => setHistoryVisible(true)}
        >
          <Feather name="clock" size={16} color="#B22222" />
          <Text style={styles.historyButtonText}>View Previous Episodes</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.headerSubtitle}>Help us track your health better</Text>

        {/* Pain Intensity Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Pain Intensity</Text>
          <Slider
            style={{width: '100%', height: 40}}
            minimumValue={1}
            maximumValue={10}
            step={1}
            value={painLevel}
            onValueChange={setPainLevel}
            minimumTrackTintColor="#B22222"
            maximumTrackTintColor="#E5E7EB"
            thumbTintColor="#B22222"
          />
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderText}>Mild</Text>
            <Text style={styles.sliderText}>Moderate</Text>
            <Text style={styles.sliderText}>Severe</Text>
          </View>
        </View>

        {/* Selectable Tag Sections */}
        <PainSection title="Where does it hurt?" tags={['Head', 'Chest', 'Upper Back', 'Lower Back', 'Left Shoulder', 'Right Shoulder', 'Abdomen', 'Other']} />
        
        <PainSection title="What type of pain is it?" tags={['Sharp', 'Dull', 'Throbbing', 'Stabbing', 'Burning', 'Aching', 'Other']} />

        <PainSection title="Possible Triggers" tags={['Cold Weather', 'Dehydration', 'Stress', 'Infection', 'Physical Exertion', 'High Altitude', 'Other']} />

        {/* Duration Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Duration</Text>
          <View style={styles.durationRow}>
             <View style={{flex: 1, marginRight: 10}}>
                <Text style={styles.inputLabel}>Hours</Text>
                <TextInput style={styles.textInput} placeholder="0" keyboardType="numeric" />
             </View>
             <View style={{flex: 1}}>
                <Text style={styles.inputLabel}>Minutes</Text>
                <TextInput style={styles.textInput} placeholder="0" keyboardType="numeric" />
             </View>
          </View>
        </View>

        {/* Symptoms Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Associated Symptoms (Optional)</Text>
          <TextInput 
            style={[styles.textInput, {height: 80, textAlignVertical: 'top'}]} 
            placeholder="Describe any other symptoms..." 
            multiline 
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Episode</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* --- POP-UPS (MODALS) --- */}

      {/* History Pop-up */}
      <Modal visible={historyVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.historyModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Pain History</Text>
              <TouchableOpacity onPress={() => setHistoryVisible(false)}>
                <Ionicons name="close" size={24} color="#4B3F3F" />
              </TouchableOpacity>
            </View>
            <ScrollView style={{maxHeight: 400}}>
              {history.map((item) => (
                <View key={item.id} style={styles.historyItem}>
                  <View>
                    <Text style={styles.historyDate}>{item.date}</Text>
                    <Text style={styles.historyDetail}>{item.location} • {item.intensity}</Text>
                  </View>
                  <Feather name="shield" size={16} color="#9CA3AF" />
                </View>
              ))}
            </ScrollView>
            <Text style={styles.lockNote}>Note: Historical records cannot be deleted for medical accuracy.</Text>
          </View>
        </View>
      </Modal>

      {/* Saved Success Pop-up */}
      <Modal visible={saveSuccessVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.successToast}>
            <Ionicons name="checkmark-circle" size={40} color="#FFF" />
            <Text style={styles.successText}>Saved</Text>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

// Helper component for tags
const PainSection = ({ title, tags }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    <View style={styles.tagContainer}>
      {tags.map(tag => (
        <TouchableOpacity key={tag} style={styles.tag}>
          <Text style={styles.tagText}>{tag}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF9F1' },
  header: { paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? 40 : 10, paddingBottom: 10 },
  headerTop: { flexDirection: 'row', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontFamily: 'Brand-Bold', color: '#B22222', marginLeft: 10 },
  headerSubtitle: { fontSize: 13, color: '#6B5E5E', marginBottom: 15 },
  historyButton: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', marginTop: 10 },
  historyButtonText: { color: '#B22222', fontSize: 13, fontFamily: 'Brand-Medium', marginLeft: 5, textDecorationLine: 'underline' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  card: { backgroundColor: '#FFF', borderRadius: 16, padding: 16, marginBottom: 15, borderWeight: 1, borderColor: '#F3F4F6' },
  cardTitle: { fontSize: 14, fontFamily: 'Brand-Bold', color: '#1F2937', marginBottom: 12 },
  tagContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { backgroundColor: '#F9FAFB', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, borderWidth: 1, borderColor: '#F3F4F6' },
  tagText: { fontSize: 12, color: '#4B3F3F' },
  sliderLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
  sliderText: { fontSize: 10, color: '#9CA3AF' },
  durationRow: { flexDirection: 'row' },
  inputLabel: { fontSize: 11, color: '#9CA3AF', marginBottom: 5 },
  textInput: { backgroundColor: '#F9FAFB', borderRadius: 10, padding: 12, fontSize: 14 },
  saveButton: { backgroundColor: '#B22222', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  saveButtonText: { color: '#FFF', fontSize: 16, fontFamily: 'Brand-Bold' },
  
  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  historyModal: { backgroundColor: '#FFF', width: '90%', borderRadius: 24, padding: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontFamily: 'Brand-Bold', color: '#B22222' },
  historyItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  historyDate: { fontSize: 14, fontFamily: 'Brand-Bold', color: '#1F2937' },
  historyDetail: { fontSize: 12, color: '#6B5E5E' },
  lockNote: { fontSize: 10, color: '#9CA3AF', textAlign: 'center', marginTop: 20 },
  successToast: { backgroundColor: 'rgba(0,0,0,0.8)', padding: 30, borderRadius: 20, alignItems: 'center' },
  successText: { color: '#FFF', fontSize: 18, fontFamily: 'Brand-Bold', marginTop: 10 }
});

export default LogPainScreen;