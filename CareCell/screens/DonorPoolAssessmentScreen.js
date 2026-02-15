import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView,
  Image,
  Dimensions
} from 'react-native';

const { height } = Dimensions.get('window');

const DonorPoolAssessmentScreen = ({ onBack, onSkip, onSubmit }) => {
  const [siblings, setSiblings] = useState([]);
  const [bloodType, setBloodType] = useState(null);
  const [motherGenotype, setMotherGenotype] = useState('Select');
  const [fatherGenotype, setFatherGenotype] = useState('Select');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const genotypes = ['AA', 'AS', 'SS', 'SC', 'AC', 'CC'];

  const days = Array.from({length: 31}, (_, i) => (i + 1).toString());
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 100}, (_, i) => (currentYear - i).toString());

  const addSibling = () => {
    if (siblings.length < 10) { 
      const newSibling = { id: Date.now(), genotype: 'Select', dobDay: 'Day', dobMonth: 'Month', dobYear: 'Year' };
      setSiblings([...siblings, newSibling]);
    }
  };

  const removeSibling = (id) => {
    setSiblings(siblings.filter(s => s.id !== id));
  };
  
  const updateSiblingGenotype = (id, value) => {
    setSiblings(siblings.map(s => s.id === id ? { ...s, genotype: value } : s));
    setActiveDropdown(null);
  };

  const updateSiblingDate = (id, field, value) => {
    setSiblings(siblings.map(s => s.id === id ? { ...s, [field]: value } : s));
    setActiveDropdown(null);
  };

  const toggleDropdown = (key) => {
    setActiveDropdown(activeDropdown === key ? null : key);
  };

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Section with Drop */}
        <View style={styles.headerContainer}>
          <View style={styles.headerTopRow}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <Image 
                source={require('../assets/icon2/Vector.png')} 
                style={styles.backVector} 
                resizeMode="contain"
              />
              <Text style={styles.title}>Donor Pool Assessment</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onSkip} style={styles.skipButton}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.subtitle}>Provide family genotype information for transplant eligibility</Text>
        </View>

        {/* Card 1: Parental Genotypes */}
        <View style={[styles.card, { zIndex: (activeDropdown === 'mother' || activeDropdown === 'father') ? 2000 : 1 }]}>
          <Text style={styles.cardHeader}>Parental Genotypes</Text>
          
          <View style={[styles.inputGroup, { zIndex: activeDropdown === 'mother' ? 2000 : 1 }]}>
            <Text style={styles.label}>Mother’s Genotype</Text>
            <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('mother')}>
              <Text style={styles.dropdownText}>{motherGenotype}</Text>
              <Text style={styles.dropdownIcon}>▼</Text>
            </TouchableOpacity>
            {activeDropdown === 'mother' && (
              <View style={styles.dropdownList}>
                {genotypes.map((g) => (
                  <TouchableOpacity key={g} style={styles.dropdownItem} onPress={() => { setMotherGenotype(g); setActiveDropdown(null); }}>
                    <Text style={styles.dropdownItemText}>{g}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View style={[styles.inputGroup, { zIndex: activeDropdown === 'father' ? 2000 : 1 }]}>
            <Text style={styles.label}>Father’s Genotype</Text>
            <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('father')}>
              <Text style={styles.dropdownText}>{fatherGenotype}</Text>
              <Text style={styles.dropdownIcon}>▼</Text>
            </TouchableOpacity>
            {activeDropdown === 'father' && (
              <View style={styles.dropdownList}>
                {genotypes.map((g) => (
                  <TouchableOpacity key={g} style={styles.dropdownItem} onPress={() => { setFatherGenotype(g); setActiveDropdown(null); }}>
                    <Text style={styles.dropdownItemText}>{g}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Card 2: Siblings Section */}
        <View style={[styles.card, { zIndex: activeDropdown && activeDropdown.startsWith('sibling') ? 2000 : 1 }]}>
          <View style={styles.rowBetween}>
            <Text style={styles.cardHeader}>Siblings Genotypes</Text>
            <TouchableOpacity onPress={addSibling} style={styles.addBtn}>
              <Text style={styles.addIcon}>+</Text>
              <Text style={styles.addText}>Add Sibling</Text>
            </TouchableOpacity>
          </View>
          
          {siblings.length === 0 ? (
            <Text style={styles.emptyText}>No siblings added yet</Text>
          ) : (
            siblings.map((sibling, index) => (
              <View key={sibling.id} style={[styles.siblingBox, { zIndex: (activeDropdown && activeDropdown.startsWith(`sibling-${sibling.id}`)) ? 2000 : 1 }]}>
                <View style={styles.rowBetween}>
                  <Text style={styles.siblingLabel}>Sibling {index + 1}</Text>
                  <TouchableOpacity onPress={() => removeSibling(sibling.id)}>
                    <Image 
                      source={require('../assets/icon/dustbin.png')} 
                      style={styles.trashIcon} 
                    />
                  </TouchableOpacity>
                </View>

                <View style={[styles.inputGroup, { zIndex: activeDropdown === `sibling-${sibling.id}` ? 2000 : 1 }]}>
                  <Text style={styles.label}>Genotype</Text>
                  <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown(`sibling-${sibling.id}`)}>
                    <Text style={styles.dropdownText}>{sibling.genotype}</Text>
                    <Text style={styles.dropdownIcon}>▼</Text>
                  </TouchableOpacity>
                  {activeDropdown === `sibling-${sibling.id}` && (
                    <View style={styles.dropdownList}>
                      {genotypes.map((g) => (
                        <TouchableOpacity key={g} style={styles.dropdownItem} onPress={() => updateSiblingGenotype(sibling.id, g)}>
                          <Text style={styles.dropdownItemText}>{g}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>

                <View style={[styles.inputGroup, { zIndex: (activeDropdown && activeDropdown.startsWith(`sibling-${sibling.id}-dob`)) ? 2000 : 1 }]}>
                  <Text style={styles.label}>Date of Birth</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ width: '28%' }}>
                      <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown(`sibling-${sibling.id}-dob-day`)}>
                        <Text style={styles.dropdownText}>{sibling.dobDay}</Text>
                        <Text style={styles.dropdownIcon}>▼</Text>
                      </TouchableOpacity>
                      {activeDropdown === `sibling-${sibling.id}-dob-day` && (
                        <ScrollView style={[styles.dropdownList, { maxHeight: 200 }]} nestedScrollEnabled={true}>
                          {days.map((d) => (
                            <TouchableOpacity key={d} style={styles.dropdownItem} onPress={() => updateSiblingDate(sibling.id, 'dobDay', d)}>
                              <Text style={styles.dropdownItemText}>{d}</Text>
                            </TouchableOpacity>
                          ))}
                        </ScrollView>
                      )}
                    </View>

                    <View style={{ width: '34%' }}>
                      <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown(`sibling-${sibling.id}-dob-month`)}>
                        <Text style={styles.dropdownText}>{sibling.dobMonth}</Text>
                        <Text style={styles.dropdownIcon}>▼</Text>
                      </TouchableOpacity>
                      {activeDropdown === `sibling-${sibling.id}-dob-month` && (
                        <ScrollView style={[styles.dropdownList, { maxHeight: 200 }]} nestedScrollEnabled={true}>
                          {months.map((m) => (
                            <TouchableOpacity key={m} style={styles.dropdownItem} onPress={() => updateSiblingDate(sibling.id, 'dobMonth', m)}>
                              <Text style={styles.dropdownItemText}>{m}</Text>
                            </TouchableOpacity>
                          ))}
                        </ScrollView>
                      )}
                    </View>

                    <View style={{ width: '32%' }}>
                      <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown(`sibling-${sibling.id}-dob-year`)}>
                        <Text style={styles.dropdownText}>{sibling.dobYear}</Text>
                        <Text style={styles.dropdownIcon}>▼</Text>
                      </TouchableOpacity>
                      {activeDropdown === `sibling-${sibling.id}-dob-year` && (
                        <ScrollView style={[styles.dropdownList, { maxHeight: 200 }]} nestedScrollEnabled={true}>
                          {years.map((y) => (
                            <TouchableOpacity key={y} style={styles.dropdownItem} onPress={() => updateSiblingDate(sibling.id, 'dobYear', y)}>
                              <Text style={styles.dropdownItemText}>{y}</Text>
                            </TouchableOpacity>
                          ))}
                        </ScrollView>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Card 3: Blood Type Selection */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>Patients Blood Type</Text>
          <View style={styles.bloodGrid}>
            {bloodTypes.map((type, idx) => (
              <TouchableOpacity 
                key={idx} 
                style={[styles.bloodItem, bloodType === type && styles.bloodItemSelected]}
                onPress={() => setBloodType(type)}
              >
                <Text style={[styles.bloodText, bloodType === type && styles.bloodTextSelected]}>
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton} activeOpacity={0.8} onPress={onSubmit}>
          <Text style={styles.submitButtonText}>Submit Donor Pre-Screening</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF3E1' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 60 },
  headerContainer: {
    marginTop: height * 0.08,
    marginBottom: 20,
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -4,
  },
  backVector: {
    width: 17,
    height: 17,
    tintColor: '#B22222',
  },
  title: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: '#B22222', 
    marginLeft: 12 
  },
  skipButton: {
    padding: 4,
  },
  skipText: { 
    fontSize: 14, // Smaller skip
    color: '#B22222',
    opacity: 0.8,
  },
  subtitle: { 
    fontSize: 13, 
    color: '#6B5E5E', 
    marginTop: 4, 
    marginLeft: 25,
  },
  card: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, marginBottom: 20, elevation: 2 },
  cardHeader: { fontSize: 15, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  addBtn: { flexDirection: 'row', alignItems: 'center' },
  addIcon: { fontSize: 18, color: '#B22222', marginRight: 4 },
  addText: { color: '#B22222', fontWeight: 'bold', fontSize: 14 },
  siblingBox: { borderWidth: 1, borderColor: '#EDEDED', borderRadius: 12, padding: 15, marginBottom: 15 },
  siblingLabel: { fontSize: 14, color: '#999', marginBottom: 10 },
  trashIcon: { width: 20, height: 20, tintColor: '#B22222', resizeMode: 'contain' },
  inputGroup: { marginBottom: 12 },
  label: { fontSize: 14, color: '#333', marginBottom: 6 },
  dropdown: { height: 48, borderWidth: 1, borderColor: '#D9D9D9', borderRadius: 10, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  dropdownText: { fontSize: 14, color: '#999' },
  dropdownIcon: { fontSize: 14, color: '#6B5E5E' },
  dropdownList: {
    position: 'absolute',
    top: 52,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownItem: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  dropdownItemText: { fontSize: 14, color: '#333' },
  emptyText: { textAlign: 'center', color: '#999', marginVertical: 20 },
  bloodGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  bloodItem: { width: '22%', height: 45, borderWidth: 1, borderColor: '#D9D9D9', borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  bloodItemSelected: { backgroundColor: '#B22222', borderColor: '#B22222' },
  bloodText: { fontSize: 15, color: '#333' },
  bloodTextSelected: { color: '#FFF', fontWeight: 'bold' },
  submitButton: { 
    backgroundColor: '#B22222', 
    height: 55, // Consistent height
    borderRadius: 12, // Consistent radius
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 10,
    marginBottom: 40, // Space to clear nav bar
  },
  submitButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});

export default DonorPoolAssessmentScreen;