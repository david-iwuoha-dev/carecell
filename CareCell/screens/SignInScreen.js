import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';

const { height } = Dimensions.get('window');

const SignInScreen = ({ onBack, onSignIn, onRegister, onForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* Header Section */}
          <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <Image 
                source={require('../assets/icon2/Vector.png')} 
                style={styles.backVector} 
                resizeMode="contain"
              />
              <Text style={styles.title}>Welcome back!</Text>
            </TouchableOpacity>
            <Text style={styles.subtitle}>Sign in to continue your health journey</Text>
          </View>

          {/* Form Fields */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email address</Text>
              <TextInput
                style={styles.input}
                placeholder="youremail@example.com"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordWrapper}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter your password"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPass}
                />
                <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                  <Image 
                    source={require('../assets/icon2/Frame 7.png')} 
                    style={styles.eyeIcon}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.forgotContainer} onPress={onForgotPassword}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.line} />
          </View>

          {/* Google Button */}
          <TouchableOpacity style={styles.googleButton} activeOpacity={0.8}>
            <Image 
              source={require('../assets/icon2/googleicon.png')} 
              style={styles.googleIcon}
            />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* Action Footer */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.signInButton} activeOpacity={0.8} onPress={onSignIn}>
              <Text style={styles.signInButtonText}>Sign In</Text>
            </TouchableOpacity>
            
            {/* REGISTER LINK - This leads to CreateAccountScreen */}
            <View style={styles.registerContainer}>
              <Text style={styles.noAccountText}>Don't have an account? </Text>
              <TouchableOpacity onPress={onRegister}>
                <Text style={styles.registerText}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF3E1',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  headerContainer: {
    marginTop: height * 0.08, 
    marginBottom: 32,
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
  input: {
    height: 55, 
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#333',
  },
  passwordWrapper: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  passwordInput: {
    flex: 1,
    height: '100%',
    fontSize: 15,
    color: '#333',
  },
  eyeIcon: {
    width: 22,
    height: 18,
    tintColor: '#6B5E5E',
    resizeMode: 'contain',
  },
  forgotContainer: {
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  forgotText: {
    color: '#B22222',
    fontSize: 14,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#D9D9D9',
  },
  orText: {
    marginHorizontal: 12,
    color: '#6B5E5E',
    fontSize: 14,
  },
  googleButton: {
    height: 55,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    gap: 10,
  },
  googleIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  googleButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  footer: {
    marginTop: 30,
    gap: 20,
  },
  signInButton: {
    backgroundColor: '#B22222',
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  noAccountText: {
    color: '#6B5E5E',
    fontSize: 14,
  },
  registerText: {
    color: '#B22222',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SignInScreen;