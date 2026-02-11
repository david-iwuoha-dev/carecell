import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  Image
} from 'react-native';

const ForgotPasswordScreen = ({ onBack, onSend }) => {
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        
        {/* Back Button & Title */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Forgot Password</Text>
        </View>

        {/* Instructions */}
        <Text style={styles.instructionText}>
          Don't worry, we'll help you get back in. Enter your email to receive a reset link.
        </Text>

        {/* Input Field */}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF4E6',
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginLeft: -8,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 30,
    color: '#B32626',
  },
  title: {
    fontSize: 24,
    fontFamily: 'semi-Bold',
    color: '#B22222',
    marginLeft: 4,
  },
  instructionText: {
    fontSize: 14,
    fontFamily: 'medium',
    color: '#6B5E5E',
    lineHeight: 22,
    marginBottom: 40,
  },
  inputGroup: {
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    color: '#3D1A1A',
    fontFamily: 'Brand-Medium',
    marginBottom: 12,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: '#484646',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    fontFamily: 'medium',
    color: '#3D1A1A',
    backgroundColor: 'transparent',
  },
  sendButton: {
    backgroundColor: '#B22222',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#B32626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'semi-Bold',
  },
});

export default ForgotPasswordScreen;