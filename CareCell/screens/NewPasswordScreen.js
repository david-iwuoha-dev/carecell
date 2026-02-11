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

const NewPasswordScreen = ({ onBack, onSend }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>New Password</Text>
        </View>

        {/* Instructions */}
        <Text style={styles.instructionText}>
          Create a strong new password to keep your health data safe and secure.
        </Text>

        {/* Form Fields */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Enter New Password</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={styles.input}
                placeholder="at least 8 characters"
                placeholderTextColor="#999"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity style={styles.iconContainer}>
                <Image 
                  source={require('./assets/icon2/Frame 7.png')} 
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={[styles.input, styles.boldPlaceholder]}
                placeholder="••••••••"
                placeholderTextColor="#3D1A1A"
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity style={styles.iconContainer}>
                <Image 
                  source={require('./assets/icon2/Frame 7.png')} 
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
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
    color: '#B22222',
  },
  title: {
    fontSize: 20,
    fontFamily: 'semi-Bold',
    color: '#B22222',
    marginLeft: 4,
  },
  instructionText: {
    fontSize: 14,
    fontFamily: 'semi-Bold',
    color: '#6B5E5E',
    lineHeight: 20,
    marginBottom: 20,
  },
  form: {
    gap: 24,
    marginBottom: 48,
  },
  inputGroup: {
    gap: 12,
  },
  label: {
    fontSize: 16,
    color: '#1E1E1E',
    fontFamily: 'semi-bold',
  },
  passwordWrapper: {
    width: 378,
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#797777',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'medium',
    color: '#484646',
  },
  boldPlaceholder: {
    fontFamily: 'Brand-Bold',
    fontSize: 18,
  },
  iconContainer: {
    padding: 4,
  },
  eyeIcon: {
    width: 21.67,
    height: 17,
    tintColor: '#6B5E5E',
  },
  sendButton: {
    backgroundColor: '#B32626',
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
    fontSize: 18,
    fontFamily: 'Brand-Bold',
  },
});

export default NewPasswordScreen;