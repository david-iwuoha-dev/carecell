import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  Dimensions
} from 'react-native';

const VerificationCodeScreen = ({ onBack, onVerify, onResend }) => {
  const [code, setCode] = useState(['', '', '', '']);

  const handleCodeChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Verification Code</Text>
        </View>

        <Text style={styles.instructionText}>
          We sent a verification link to your email. Click it to activate your account.
        </Text>

        <View style={styles.otpContainer}>
          <Text style={styles.label}>Enter Code</Text>
          <View style={styles.inputRow}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.otpBox}
                maxLength={1}
                keyboardType="number-pad"
                onChangeText={(text) => handleCodeChange(text, index)}
                value={digit}
              />
            ))}
          </View>
          
          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>If you didn't receive a code. </Text>
            <TouchableOpacity onPress={onResend}>
              <Text style={styles.resendLink}>Resend</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.sendButton} activeOpacity={0.8} onPress={onVerify}>
          <Text style={styles.sendButtonText}>Send</Text>
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
    fontSize: 28,
    color: '#B32626',
  },
  title: {
    fontStyle:'poppins',
    fontSize: 20,
    fontFamily: 'semi-Bold',
    color: '#B22222',
    marginLeft: 4,
    lineHeight: 22,
  },
  instructionText: {
    fontSize: 14,
    fontFamily: 'medium',
    color: '#484646',
    lineHeight: 22,
    marginBottom: 48,
  },
  otpContainer: {
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    color: '#3D1A1A',
    fontFamily: 'Brand-Medium',
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  otpBox: {
    width: 77,
    height: 65,
    borderWidth: 1,
    borderColor: '#797777',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Brand-Bold',
    color: '#3D1A1A',
    backgroundColor: 'transparent',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  resendText: {
    fontSize: 14,
    fontFamily: 'medium',
    color: '#797777',
  },
  resendLink: {
    fontSize: 14,
    fontFamily: 'medium',
    color: '#B22222',
    lineHeight: 20,
  },
  sendButton: {
    backgroundColor: '#B22222',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'semi-Bold',
  },
});

export default VerificationCodeScreen;