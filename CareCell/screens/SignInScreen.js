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
  Image
} from 'react-native';

const SignInScreen = ({ onSignIn, onRegister, onForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.innerContainer}
      >
        
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Text style={styles.subText}>Sign in to continue your health journey</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email address</Text>
            <TextInput
              style={styles.input}
              placeholder="youremail@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <TouchableOpacity>
                <Image 
                  source={require('./assets/icon2/Frame 7.png')} 
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.forgotContainer} onPress={onForgotPassword}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.line} />
        </View>

        <TouchableOpacity style={styles.googleButton}>
          <Image 
            source={require('./assets/icon2/googleicon.png')} 
            style={styles.googleIcon}
          />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        {/* Action Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.signInButton} onPress={onSignIn}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.noAccountText}>Don't have an account? </Text>
            <TouchableOpacity onPress={onRegister}>
              <Text style={styles.registerText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>

      </KeyboardAvoidingView>
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
  },
  header: {
    marginTop: 40,
    marginBottom: 32,
  },
  welcomeText: {
    fontSize: 28,
    fontFamily: 'Brand-Bold',
    color: '#B32626',
    marginBottom: 8,
  },
  subText: {
    fontSize: 14,
    fontFamily: 'Brand-Regular',
    color: '#6B5E5E',
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: '#3D1A1A',
    fontFamily: 'Brand-Medium',
  },
  input: {
    width: 378,
    height: 65,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#797777',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    fontFamily: 'medium',
    alignSelf: 'center',
    color: '#484646',
  },
  passwordContainer: {
    width: 378,
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#797777',
    borderRadius: 12,
    paddingHorizontal: 16,
    alignSelf: 'center',
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 14,
    fontFamily: 'medium',
    color: '#484646',
  },
  eyeIcon: {
    width: 21.67,
    height: 17,
    tintColor: '#6B5E5E',
  },
  forgotContainer: {
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  forgotText: {
    color: '#B32626',
    fontSize: 14,
    fontFamily: 'Medium',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#1E1E1E',
  },
  orText: {
    marginHorizontal: 10,
    color: '#1E1E1E',
    fontSize: 14,
    fontFamily: 'Brand-Regular',
  },
  googleButton: {
    width: 378,
    height: 65,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    gap: 8,
    alignSelf: 'center',
  },
  googleIcon: {
    width: 23.16,
    height: 23.99,
  },
  googleButtonText: {
    fontSize: 14,
    fontFamily: 'Medium',
    color: '#1E1E1E',
  },
  footer: {
    marginTop: 40,
    marginBottom: 20,
    gap: 16,
  },
  signInButton: {
    backgroundColor: '#B32626',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Brand-Bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  noAccountText: {
    color: '#6B5E5E',
    fontSize: 13,
    fontFamily: 'Brand-Regular',
  },
  registerText: {
    color: '#B32626',
    fontSize: 13,
    fontFamily: 'Brand-Bold',
  },
});

export default SignInScreen;