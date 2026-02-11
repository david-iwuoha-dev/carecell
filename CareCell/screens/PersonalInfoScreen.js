import React, { useState } from 'react';
import { 
  StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform 
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const PersonalInfoScreen = ({ onBack, onContinue, accountType }) => {
  const isChild = accountType === 'child';

  // Adult Form State
  const [adultForm, setAdultForm] = useState({
    fullName: '',
    age: '',
    gender: '',
    maritalStatus: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    region: '',
    complications: ''
  });

  // Child Form State
  const [childForm, setChildForm] = useState({
    childName: '',
    displayName: '',
    childAge: '',
    childGender: '',
    parentName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    region: '',
    complications: ''
  });

  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (key) => {
    setActiveDropdown(activeDropdown === key ? null : key);
  };

  const selectOption = (formType, key, value) => {
    if (formType === 'adult') {
      setAdultForm({ ...adultForm, [key]: value });
    } else {
      setChildForm({ ...childForm, [key]: value });
    }
    setActiveDropdown(null);
  };

  // Render Adult Form
  if (!isChild) {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            
            <TouchableOpacity style={styles.backHeader} onPress={onBack}>
              <Feather name="chevron-left" size={28} color="#B22222" />
              <Text style={styles.headerTitle}>Personal Information</Text>
            </TouchableOpacity>

            <Text style={styles.subText}>Tell us about yourself</Text>

            <View style={styles.card}>
              <Text style={styles.cardHeader}>Personal Details</Text>
              
              <Text style={styles.label}>Full Name</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Enter your full name" 
                placeholderTextColor="#A9A9A9"
                value={adultForm.fullName}
                onChangeText={(val) => setAdultForm({...adultForm, fullName: val})}
              />

              <View style={styles.row}>
                <View style={{ flex: 1, marginRight: 10 }}>
                  <Text style={styles.label}>Age</Text>
                  <TextInput 
                    style={styles.input} 
                    placeholder="Age" 
                    placeholderTextColor="#A9A9A9"
                    keyboardType="numeric" 
                    value={adultForm.age}
                    onChangeText={(val) => setAdultForm({...adultForm, age: val})}
                  />
                </View>
                <View style={{ flex: 1, zIndex: activeDropdown === 'adultGender' ? 1000 : 1 }}>
                  <Text style={styles.label}>Gender</Text>
                  <TouchableOpacity style={styles.pickerWrapper} onPress={() => toggleDropdown('adultGender')}>
                     <Text style={{ color: adultForm.gender ? '#333' : '#A9A9A9', fontSize: 15 }}>{adultForm.gender || 'Select'}</Text>
                     <Feather name="chevron-down" size={20} color="#666" />
                  </TouchableOpacity>
                  {activeDropdown === 'adultGender' && (
                    <View style={styles.dropdownList}>
                      {['Male', 'Female', 'Other'].map(opt => (
                        <TouchableOpacity key={opt} style={styles.dropdownItem} onPress={() => selectOption('adult', 'gender', opt)}>
                          <Text style={styles.dropdownItemText}>{opt}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              </View>

              <View style={{ zIndex: activeDropdown === 'maritalStatus' ? 1000 : 1 }}>
                <Text style={styles.label}>Marital Status</Text>
                <TouchableOpacity style={styles.pickerWrapper} onPress={() => toggleDropdown('maritalStatus')}>
                    <Text style={{ color: adultForm.maritalStatus ? '#333' : '#A9A9A9', fontSize: 15 }}>{adultForm.maritalStatus || 'Select'}</Text>
                    <Feather name="chevron-down" size={20} color="#666" />
                </TouchableOpacity>
                {activeDropdown === 'maritalStatus' && (
                  <View style={styles.dropdownList}>
                    {['Single', 'Married', 'Divorced'].map(opt => (
                      <TouchableOpacity key={opt} style={styles.dropdownItem} onPress={() => selectOption('adult', 'maritalStatus', opt)}>
                        <Text style={styles.dropdownItemText}>{opt}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>

            <View style={[styles.card, { zIndex: -1 }]}>
              <Text style={styles.cardHeader}>Account Information</Text>
              
              <Text style={styles.label}>Phone Number</Text>
              <TextInput 
                style={styles.input} 
                placeholder="+234 000 000 0000" 
                placeholderTextColor="#A9A9A9"
                keyboardType="phone-pad" 
                value={adultForm.phone}
                onChangeText={(val) => setAdultForm({...adultForm, phone: val})}
              />

              <Text style={styles.label}>Email</Text>
              <TextInput 
                style={styles.input} 
                placeholder="youremail@example.com" 
                placeholderTextColor="#A9A9A9"
                autoCapitalize="none"
                value={adultForm.email}
                onChangeText={(val) => setAdultForm({...adultForm, email: val})}
              />

              <Text style={styles.label}>Password</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Create a secure password" 
                placeholderTextColor="#A9A9A9"
                secureTextEntry 
                value={adultForm.password}
                onChangeText={(val) => setAdultForm({...adultForm, password: val})}
              />

              <Text style={styles.label}>Confirm Password</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Confirm password" 
                placeholderTextColor="#A9A9A9"
                secureTextEntry 
                value={adultForm.confirmPassword}
                onChangeText={(val) => setAdultForm({...adultForm, confirmPassword: val})}
              />

              <Text style={styles.label}>Known Complications <Text style={styles.optional}>(Optional)</Text></Text>
              <TextInput 
                style={[styles.input, styles.textArea]} 
                placeholder="e.g., Acute chest syndrome, stroke, etc." 
                placeholderTextColor="#A9A9A9"
                multiline={true}
                numberOfLines={4}
                value={adultForm.complications}
                onChangeText={(val) => setAdultForm({...adultForm, complications: val})}
              />
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={() => onContinue(adultForm)}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // Render Child Form (using provided code structure)
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          
          <TouchableOpacity style={styles.backHeader} onPress={onBack}>
            <Feather name="chevron-left" size={28} color="#B22222" />
            <Text style={styles.headerTitle}>Personal Information</Text>
          </TouchableOpacity>

          <Text style={styles.subText}>Tell us about your child and yourself</Text>

          <View style={styles.card}>
            <Text style={styles.cardHeader}>Child's Information</Text>
            
            <Text style={styles.label}>Child's Full Name</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Enter child's name" 
              placeholderTextColor="#A9A9A9"
              value={childForm.childName}
              onChangeText={(val) => setChildForm({...childForm, childName: val})}
            />

            <Text style={styles.label}>Display Name</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Enter display name" 
              placeholderTextColor="#A9A9A9"
              value={childForm.displayName}
              onChangeText={(val) => setChildForm({...childForm, displayName: val})}
            />

            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 10 }}>
                <Text style={styles.label}>Age</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="Age" 
                  placeholderTextColor="#A9A9A9"
                  keyboardType="numeric" 
                  value={childForm.childAge}
                  onChangeText={(val) => setChildForm({...childForm, childAge: val})}
                />
              </View>
              <View style={{ flex: 1.5, zIndex: activeDropdown === 'childGender' ? 1000 : 1 }}>
                <Text style={styles.label}>Gender</Text>
                <TouchableOpacity style={styles.pickerWrapper} onPress={() => toggleDropdown('childGender')}>
                   <Text style={{ color: childForm.childGender ? '#333' : '#A9A9A9', fontSize: 15 }}>{childForm.childGender || 'Select'}</Text>
                   <Feather name="chevron-down" size={20} color="#666" />
                </TouchableOpacity>
                {activeDropdown === 'childGender' && (
                  <View style={styles.dropdownList}>
                    {['Male', 'Female'].map(opt => (
                      <TouchableOpacity key={opt} style={styles.dropdownItem} onPress={() => selectOption('child', 'childGender', opt)}>
                        <Text style={styles.dropdownItemText}>{opt}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>
          </View>

          <View style={[styles.card, { zIndex: -1 }]}>
            <Text style={styles.cardHeader}>Parent/Guardian Information</Text>
            
            <Text style={styles.label}>Your Full Name</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Enter your name" 
              placeholderTextColor="#A9A9A9"
              value={childForm.parentName}
              onChangeText={(val) => setChildForm({...childForm, parentName: val})}
            />

            <Text style={styles.label}>Phone Number</Text>
            <TextInput 
              style={styles.input} 
              placeholder="+234 000 000 0000" 
              placeholderTextColor="#A9A9A9"
              keyboardType="phone-pad" 
              value={childForm.phone}
              onChangeText={(val) => setChildForm({...childForm, phone: val})}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput 
              style={styles.input} 
              placeholder="youremail@example.com" 
              placeholderTextColor="#A9A9A9"
              autoCapitalize="none"
              value={childForm.email}
              onChangeText={(val) => setChildForm({...childForm, email: val})}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Create a secure password" 
              placeholderTextColor="#A9A9A9"
              secureTextEntry 
              value={childForm.password}
              onChangeText={(val) => setChildForm({...childForm, password: val})}
            />

            <Text style={styles.label}>Confirm Password</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Confirm password" 
              placeholderTextColor="#A9A9A9"
              secureTextEntry 
              value={childForm.confirmPassword}
              onChangeText={(val) => setChildForm({...childForm, confirmPassword: val})}
            />

            <View style={{ zIndex: activeDropdown === 'region' ? 1000 : 1 }}>
              <Text style={styles.label}>Region</Text>
              <TouchableOpacity style={styles.pickerWrapper} onPress={() => toggleDropdown('region')}>
                  <Text style={{ color: childForm.region ? '#333' : '#A9A9A9', fontSize: 15 }}>{childForm.region || 'Select your region'}</Text>
                  <Feather name="chevron-down" size={20} color="#666" />
              </TouchableOpacity>
              {activeDropdown === 'region' && (
                <View style={styles.dropdownList}>
                  {['Lagos', 'Abuja', 'Port Harcourt'].map(opt => (
                    <TouchableOpacity key={opt} style={styles.dropdownItem} onPress={() => selectOption('child', 'region', opt)}>
                      <Text style={styles.dropdownItemText}>{opt}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <Text style={styles.label}>Known Complications <Text style={styles.optional}>(Optional)</Text></Text>
            <TextInput 
              style={[styles.input, styles.textArea]} 
              placeholder="e.g., Acute chest syndrome, stroke, etc." 
              placeholderTextColor="#A9A9A9"
              multiline={true}
              numberOfLines={4}
              value={childForm.complications}
              onChangeText={(val) => setChildForm({...childForm, complications: val})}
            />
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={() => onContinue(childForm)}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF3E1', // Cream background color from design
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  backHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#B22222', // Deep red theme
    marginLeft: 10,
  },
  subText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    marginLeft: 34,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android Shadow
    elevation: 3,
  },
  cardHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 8,
    marginTop: 12,
  },
  optional: {
    fontWeight: '400',
    color: '#999',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#FFF',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    padding: 14, // Added padding to match input height
    flexDirection: 'row', // Added for custom dropdown
    justifyContent: 'space-between', // Added for custom dropdown
    alignItems: 'center',
  },
  dropdownList: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    zIndex: 3000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
  },
  primaryButton: {
    backgroundColor: '#B22222',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PersonalInfoScreen;