import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView,
  Dimensions,
  Image
} from 'react-native';

const { height } = Dimensions.get('window');

const HematologyBaselineScreen = ({ onBack, onContinue }) => {
  const [consent, setConsent] = useState(false);
  const [date, setDate] = useState({ day: 'Day', month: 'Month', year: 'Year' });
  const [activeDropdown, setActiveDropdown] = useState(null);

  const days = Array.from({length: 31}, (_, i) => (i + 1).toString());
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 100}, (_, i) => (currentYear - i).toString());

  const toggleDropdown = (key) => {
    setActiveDropdown(activeDropdown === key ? null : key);
  };
  const selectDatePart = (part, value) => {
    setDate(prev => ({ ...prev, [part]: value }));
    setActiveDropdown(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Section with Drop */}
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Image 
              source={require('../assets/icon2/Vector.png')} 
              style={styles.backVector} 
              resizeMode="contain"
            />
            <Text style={styles.title}>Hematology Baseline</Text>
          </TouchableOpacity>
          <Text style={styles.subtitle}>Enter your most recent complete blood count results</Text>
        </View>

        {/* Informational Blue Box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Baseline hematology values help track disease progression and treatment response over time.
          </Text>
        </View>

        {/* Form Section */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Hemoglobin (Hb) <Text style={styles.unitText}>g/dL</Text></Text>
            <TextInput style={styles.input} placeholder="e.g., 8.5" keyboardType="decimal-pad" placeholderTextColor="#999" />
            <Text style={styles.rangeText}>Normal range: 7-10 g/dL for SDC patients</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>WBC Count <Text style={styles.unitText}>*10/uL</Text></Text>
            <TextInput style={styles.input} placeholder="e.g., 12.5" keyboardType="decimal-pad" placeholderTextColor="#999" />
            <Text style={styles.rangeText}>Normal range: 4.5-11.0*10/uL</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Reticulocyte Count <Text style={styles.unitText}>%</Text></Text>
            <TextInput style={styles.input} placeholder="e.g., 8.0" keyboardType="decimal-pad" placeholderTextColor="#999" />
            <Text style={styles.rangeText}>Normal range: 0.5-2.5% (elevated in SDC)</Text>
          </View>

          {/* Uniform Date Selector */}
          <View style={[styles.inputGroup, { zIndex: activeDropdown ? 2000 : 1 }]}>
            <Text style={styles.label}>Date of CBC Result</Text>
            <View style={styles.dateRow}>
              
              {/* Day Dropdown */}
              <View style={{ width: '28%' }}>
                <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('day')}>
                  <Text style={styles.dropdownText}>{date.day}</Text>
                  <Text style={styles.dropdownIcon}>▼</Text>
                </TouchableOpacity>
                {activeDropdown === 'day' && (
                  <ScrollView style={styles.dropdownList} nestedScrollEnabled={true}>
                    {days.map((d) => (
                      <TouchableOpacity key={d} style={styles.dropdownItem} onPress={() => selectDatePart('day', d)}>
                        <Text style={styles.dropdownItemText}>{d}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                )}
              </View>

              {/* Month Dropdown */}
              <View style={{ width: '34%' }}>
                <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('month')}>
                  <Text style={styles.dropdownText}>{date.month}</Text>
                  <Text style={styles.dropdownIcon}>▼</Text>
                </TouchableOpacity>
                {activeDropdown === 'month' && (
                  <ScrollView style={styles.dropdownList} nestedScrollEnabled={true}>
                    {months.map((m) => (
                      <TouchableOpacity key={m} style={styles.dropdownItem} onPress={() => selectDatePart('month', m)}>
                        <Text style={styles.dropdownItemText}>{m}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                )}
              </View>

              {/* Year Dropdown */}
              <View style={{ width: '32%' }}>
                <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('year')}>
                  <Text style={styles.dropdownText}>{date.year}</Text>
                  <Text style={styles.dropdownIcon}>▼</Text>
                </TouchableOpacity>
                {activeDropdown === 'year' && (
                  <ScrollView style={styles.dropdownList} nestedScrollEnabled={true}>
                    {years.map((y) => (
                      <TouchableOpacity key={y} style={styles.dropdownItem} onPress={() => selectDatePart('year', y)}>
                        <Text style={styles.dropdownItemText}>{y}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                )}
              </View>

            </View>
          </View>
        </View>

        {/* Consent Section */}
        <View style={styles.consentCard}>
          <TouchableOpacity 
            style={[styles.checkbox, consent && styles.checkboxChecked]} 
            onPress={() => setConsent(!consent)}
          >
            {consent && <View style={styles.checkInner} />}
          </TouchableOpacity>
          <Text style={styles.consentText}>
            I consent to storing this medical data securely within CareCell for tracking and personalized care recommendations.
          </Text>
        </View>

        {/* Bottom Button */}
        <TouchableOpacity 
          style={[styles.continueButton, !consent && styles.buttonDisabled]} 
          disabled={!consent}
          onPress={onContinue}
        >
          <Text style={styles.continueButtonText}>Save & Complete Setup</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF3E1' },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 60 },
  headerContainer: {
    marginTop: height * 0.08,
    marginBottom: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -4,
  },
  backVector: {
    width: 20,
    height: 20,
    tintColor: '#B22222',
  },
  title: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: '#B22222', 
    marginLeft: 12 
  },
  subtitle: { 
    fontSize: 14, 
    color: '#6B5E5E', 
    marginTop: 4, 
    marginLeft: 32,
    marginBottom: 10,
  },
  infoBox: {
    backgroundColor: '#E3F2FD', 
    borderRadius: 12, 
    padding: 16, 
    marginBottom: 30, 
    borderWidth: 1, 
    borderColor: '#90CAF9' 
  },
  infoText: { fontSize: 13, color: '#3665CC', lineHeight: 20 },
  form: { gap: 20, marginBottom: 32 },
  inputGroup: { gap: 8 },
  label: { fontSize: 14, fontWeight: '600', color: '#333' },
  unitText: { fontWeight: '400', color: '#999' },
  input: { 
    height: 55, 
    borderWidth: 1, 
    borderColor: '#D9D9D9', 
    borderRadius: 12, 
    paddingHorizontal: 16, 
    fontSize: 16, 
    backgroundColor: '#FFF'
  },
  rangeText: { fontSize: 12, color: '#797777', marginTop: 2 },
  dateRow: { flexDirection: 'row', justifyContent: 'space-between' },
  dropdown: { 
    height: 55, 
    borderWidth: 1, 
    borderColor: '#D9D9D9', 
    borderRadius: 12, 
    paddingHorizontal: 12, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    backgroundColor: '#FFF'
  },
  dropdownText: { fontSize: 14, color: '#484646' },
  dropdownIcon: { fontSize: 10, color: '#6B5E5E' },
  dropdownList: {
    position: 'absolute',
    top: 58,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 10,
    elevation: 5,
    maxHeight: 180,
    zIndex: 3000,
  },
  dropdownItem: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  dropdownItemText: { fontSize: 14, color: '#333' },
  consentCard: { flexDirection: 'row', gap: 12, marginBottom: 32, paddingRight: 10 },
  checkbox: { width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: '#797777', marginTop: 2, justifyContent: 'center', alignItems: 'center' },
  checkboxChecked: { borderColor: '#B22222', backgroundColor: '#B22222' },
  checkInner: { width: 10, height: 10, backgroundColor: '#FFF', borderRadius: 2 },
  consentText: { flex: 1, fontSize: 13, color: '#6B5E5E', lineHeight: 18 },
  continueButton: { 
    backgroundColor: '#B22222', 
    height: 55, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  buttonDisabled: { backgroundColor: '#D9D9D9' },
  continueButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});

export default HematologyBaselineScreen;