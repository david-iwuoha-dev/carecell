import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView,
  Image,
  Dimensions,
  Switch
} from 'react-native';

const { height } = Dimensions.get('window');

const AdultDonorAssessmentScreen = ({ onBack, onSkip, onSubmit }) => {
  const [siblings, setSiblings] = useState([]);
  const [offspring, setOffspring] = useState([]);
  const [bloodType, setBloodType] = useState(null);
  const [hlaStatus, setHlaStatus] = useState(false);
  const [transfusionHistory, setTransfusionHistory] = useState('Select');
  const [activeDropdown, setActiveDropdown] = useState(null);

  const genotypes = ['AA', 'AS', 'SS', 'SC', 'AC', 'CC'];
  const transfusionOptions = ['None', '1-3 times', '4-10 times', '10+ (Chronic)'];
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const addRelative = (type) => {
    const newItem = { id: Date.now(), genotype: 'Select' };
    if (type === 'sibling') setSiblings([...siblings, newItem]);
    else setOffspring([...offspring, newItem]);
  };

  const removeRelative = (id, type) => {
    if (type === 'sibling') setSiblings(siblings.filter(s => s.id !== id));
    else setOffspring(offspring.filter(o => o.id !== id));
  };

  const updateGenotype = (id, value, type) => {
    if (type === 'sibling') {
      setSiblings(siblings.map(s => s.id === id ? { ...s, genotype: value } : s));
    } else {
      setOffspring(offspring.map(o => o.id === id ? { ...o, genotype: value } : o));
    }
    setActiveDropdown(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <View style={styles.headerTopRow}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <Image 
                source={require('../assets/icon2/Vector.png')} 
                style={styles.backVector} 
                resizeMode="contain"
              />
              <Text style={styles.title}>Donor Assessment</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onSkip}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.subtitle}>Adult transplant eligibility & donor search</Text>
        </View>

        {/* Card 1: Family Donor Pool (Siblings & Offspring) */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.cardHeader}>Family Donor Pool</Text>
            <View style={{flexDirection: 'row', gap: 10}}>
              <TouchableOpacity onPress={() => addRelative('sibling')} style={styles.addBtn}>
                <Text style={styles.addText}>+ Sibling</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => addRelative('offspring')} style={styles.addBtn}>
                <Text style={styles.addText}>+ Child</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {[...siblings.map(s => ({...s, type: 'Sibling'})), ...offspring.map(o => ({...o, type: 'Child'}))].map((item, index) => (
            <View key={item.id} style={styles.relativeBox}>
              <View style={styles.rowBetween}>
                <Text style={styles.relativeLabel}>{item.type} {index + 1}</Text>
                <TouchableOpacity onPress={() => removeRelative(item.id, item.type.toLowerCase())}>
                  <Text style={{color: '#B22222', fontSize: 12}}>Remove</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity 
                style={styles.dropdown} 
                onPress={() => setActiveDropdown(activeDropdown === item.id ? null : item.id)}
              >
                <Text style={styles.dropdownText}>{item.genotype}</Text>
                <Text style={styles.dropdownIcon}>▼</Text>
              </TouchableOpacity>
              {activeDropdown === item.id && (
                <View style={styles.dropdownList}>
                  {genotypes.map((g) => (
                    <TouchableOpacity key={g} style={styles.dropdownItem} onPress={() => updateGenotype(item.id, g, item.type.toLowerCase())}>
                      <Text style={styles.dropdownItemText}>{g}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Card 2: Medical Readiness */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>Medical Readiness</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Transfusions (Last 12 Months)</Text>
            <TouchableOpacity style={styles.dropdown} onPress={() => setActiveDropdown(activeDropdown === 'trans' ? null : 'trans')}>
              <Text style={styles.dropdownText}>{transfusionHistory}</Text>
              <Text style={styles.dropdownIcon}>▼</Text>
            </TouchableOpacity>
            {activeDropdown === 'trans' && (
              <View style={styles.dropdownList}>
                {transfusionOptions.map((opt) => (
                  <TouchableOpacity key={opt} style={styles.dropdownItem} onPress={() => {setTransfusionHistory(opt); setActiveDropdown(null);}}>
                    <Text style={styles.dropdownItemText}>{opt}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View style={styles.hlaRow}>
            <View>
              <Text style={styles.label}>HLA Typing Performed?</Text>
              <Text style={{fontSize: 12, color: '#6B5E5E'}}>DNA matching for transplant</Text>
            </View>
            <Switch 
              value={hlaStatus} 
              onValueChange={setHlaStatus} 
              trackColor={{ false: "#D9D9D9", true: "#B22222" }}
            />
          </View>
        </View>

        {/* Card 3: Blood Type */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>Patient Blood Type</Text>
          <View style={styles.bloodGrid}>
            {bloodTypes.map((type) => (
              <TouchableOpacity 
                key={type} 
                style={[styles.bloodItem, bloodType === type && styles.bloodItemSelected]}
                onPress={() => setBloodType(type)}
              >
                <Text style={[styles.bloodText, bloodType === type && styles.bloodTextSelected]}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton} activeOpacity={0.8} onPress={onSubmit}>
          <Text style={styles.submitButtonText}>Submit Assessment</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF3E1' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 60 },
  headerContainer: { marginTop: height * 0.08, marginBottom: 20 },
  headerTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  backButton: { flexDirection: 'row', alignItems: 'center', marginLeft: -4 },
  backVector: { width: 17, height: 17, tintColor: '#B22222' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#B22222', marginLeft: 12 },
  skipText: { fontSize: 14, color: '#B22222', opacity: 0.8 },
  subtitle: { fontSize: 13, color: '#6B5E5E', marginTop: 4, marginLeft: 30 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, marginBottom: 20, zIndex: 1 },
  cardHeader: { fontSize: 15, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  addBtn: { backgroundColor: '#FDF2F2', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  addText: { color: '#B22222', fontWeight: 'bold', fontSize: 12 },
  relativeBox: { marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#F5F5F5', paddingBottom: 10 },
  relativeLabel: { fontSize: 13, color: '#999', marginBottom: 5 },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 14, color: '#333', fontWeight: '600' },
  dropdown: { height: 50, borderWidth: 1, borderColor: '#D9D9D9', borderRadius: 12, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  dropdownText: { fontSize: 14, color: '#333' },
  dropdownIcon: { fontSize: 12, color: '#6B5E5E' },
  dropdownList: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#D9D9D9', borderRadius: 12, marginTop: 4 },
  dropdownItem: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  dropdownItemText: { fontSize: 14, color: '#333' },
  hlaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  bloodGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  bloodItem: { width: '22%', height: 45, borderWidth: 1, borderColor: '#D9D9D9', borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  bloodItemSelected: { backgroundColor: '#B22222', borderColor: '#B22222' },
  bloodText: { fontSize: 14, color: '#333' },
  bloodTextSelected: { color: '#FFF', fontWeight: 'bold' },
  submitButton: { backgroundColor: '#B22222', height: 55, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  submitButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});

export default AdultDonorAssessmentScreen;