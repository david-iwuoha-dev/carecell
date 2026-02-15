import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  Image,
  Dimensions
} from 'react-native';

const { height } = Dimensions.get('window');

const ForgotPasswordScreen = ({ onBack, onSend }) => {
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        
        {/* Header Section with Drop */}
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Image 
              source={require('../assets/icon2/Vector.png')} 
              style={styles.backVector} 
              resizeMode="contain"
            />
            <Text style={styles.title}>Forgot Password</Text>
          </TouchableOpacity>
          <Text style={styles.subtitle}>
            Don't worry, we'll help you get back in.
          </Text>
        </View>

        {/* Input Field */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Enter Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="youremail@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#999"
            />
          </View>

          {/* Action Button */}
          <TouchableOpacity style={styles.sendButton} activeOpacity={0.8} onPress={onSend}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF3E1', // Standardized background
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  headerContainer: {
    marginTop: height * 0.08, // 8% Drop
    marginBottom: 40,
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
    fontSize: 26, // Updated to 26
    fontWeight: 'bold', // Bold
    color: '#B22222',
    marginLeft: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B5E5E',
    marginLeft: 32,
    marginTop: 4,
  },
  form: {
    gap: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 55, // Standardized height
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 12, // Standardized radius
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#333',
    backgroundColor: '#FFF',
  },
  sendButton: {
    backgroundColor: '#B22222',
    height: 55, // Standardized height
    borderRadius: 12, // Standardized radius
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;