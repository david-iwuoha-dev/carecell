import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  Dimensions,
  Image
} from 'react-native';

const { height } = Dimensions.get('window');

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
        
        {/* Header Section with Drop */}
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Image 
              source={require('../assets/icon2/Vector.png')} 
              style={styles.backVector} 
              resizeMode="contain"
            />
            <Text style={styles.title}>Verification Code</Text>
          </TouchableOpacity>
          <Text style={styles.subtitle}>
            We sent a verification link to your email.
          </Text>
        </View>

        <View style={styles.formSection}>
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
            <Text style={styles.sendButtonText}>Verify</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF3E1',
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
    fontSize: 26, // Size 26
    fontWeight: 'bold', // Bolded
    color: '#B22222',
    marginLeft: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B5E5E',
    marginLeft: 32,
    marginTop: 4,
  },
  formSection: {
    flex: 1,
  },
  otpContainer: {
    marginBottom: 40,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpBox: {
    width: '22%',
    height: 55, // Standardized height
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 12, // Standardized radius
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: '#FFF',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  resendText: {
    fontSize: 14,
    color: '#797777',
  },
  resendLink: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#B22222',
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

export default VerificationCodeScreen;