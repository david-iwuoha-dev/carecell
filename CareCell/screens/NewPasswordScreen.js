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

const NewPasswordScreen = ({ onBack, onSend }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
            <Text style={styles.title}>New Password</Text>
          </TouchableOpacity>
          <Text style={styles.subtitle}>
            Create a strong new password for your account.
          </Text>
        </View>

        {/* Form Fields */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Enter New Password</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={styles.input}
                placeholder="at least 8 characters"
                placeholderTextColor="#999"
                secureTextEntry={!showPass}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity 
                style={styles.iconContainer} 
                onPress={() => setShowPass(!showPass)}
              >
                <Image 
                  source={require('../assets/icon2/Frame 7.png')} 
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#999"
                secureTextEntry={!showConfirm}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity 
                style={styles.iconContainer}
                onPress={() => setShowConfirm(!showConfirm)}
              >
                <Image 
                  source={require('../assets/icon2/Frame 7.png')} 
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Action Button */}
          <TouchableOpacity style={styles.sendButton} activeOpacity={0.8} onPress={onSend}>
            <Text style={styles.sendButtonText}>Update Password</Text>
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
    marginBottom: 30,
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
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  passwordWrapper: {
    height: 55, // Standardized 55
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 12, // Standardized 12
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  iconContainer: {
    padding: 4,
  },
  eyeIcon: {
    width: 22,
    height: 18,
    tintColor: '#6B5E5E',
    resizeMode: 'contain',
  },
  sendButton: {
    backgroundColor: '#B22222',
    height: 55, // Standardized 55
    borderRadius: 12, // Standardized 12
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

export default NewPasswordScreen;