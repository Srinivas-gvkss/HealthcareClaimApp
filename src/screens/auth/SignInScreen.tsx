import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../context/AuthContext';

const { width, height } = Dimensions.get('window');
const isTablet = width >= 768;
const isSmallScreen = width < 375;

export default function SignInScreen({ navigation }: any) {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState('demo@user.com');
  const [password, setPassword] = useState('password');

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { fontSize: isTablet ? 32 : 24 }]}>Sign In</Text>
        
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { fontSize: isTablet ? 18 : 16 }]}>Email</Text>
          <TextInput 
            style={[styles.input, { 
              fontSize: isTablet ? 18 : 16, 
              height: isTablet ? 56 : 48,
              paddingHorizontal: isTablet ? 16 : 12
            }]} 
            placeholder="Enter your email" 
            value={email} 
            onChangeText={setEmail} 
            keyboardType="email-address" 
            autoCapitalize="none"
            returnKeyType="next"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { fontSize: isTablet ? 18 : 16 }]}>Password</Text>
          <TextInput 
            style={[styles.input, { 
              fontSize: isTablet ? 18 : 16, 
              height: isTablet ? 56 : 48,
              paddingHorizontal: isTablet ? 16 : 12
            }]} 
            placeholder="Enter your password" 
            value={password} 
            onChangeText={setPassword} 
            secureTextEntry
            returnKeyType="done"
          />
        </View>

        <TouchableOpacity 
          style={[styles.signInButton, { 
            paddingVertical: isTablet ? 18 : 16,
            marginTop: isTablet ? 24 : 20
          }]} 
          onPress={async () => { await signIn(email, password); }}
        >
          <Text style={[styles.signInButtonText, { fontSize: isTablet ? 18 : 16 }]}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.linkContainer}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={[styles.link, { fontSize: isTablet ? 16 : 14 }]}>Create account</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8f9fa' 
  },
  content: { 
    flex: 1, 
    padding: isTablet ? 40 : 20, 
    justifyContent: 'center',
    maxWidth: isTablet ? 400 : '100%',
    alignSelf: 'center',
    width: '100%'
  },
  title: { 
    fontSize: isTablet ? 32 : 24, 
    fontWeight: '700', 
    marginBottom: isTablet ? 32 : 24,
    textAlign: 'center',
    color: '#1a1a1a'
  },
  inputContainer: {
    marginBottom: isTablet ? 20 : 16
  },
  label: {
    fontSize: isTablet ? 18 : 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: isTablet ? 12 : 8
  },
  input: { 
    backgroundColor: 'white',
    borderWidth: 1, 
    borderColor: '#e0e0e0', 
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  signInButton: {
    backgroundColor: '#2196F3',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  signInButtonText: {
    color: 'white',
    fontWeight: '600'
  },
  linkContainer: {
    alignItems: 'center',
    marginTop: isTablet ? 20 : 16
  },
  link: { 
    color: '#2196F3',
    fontWeight: '500'
  }
});
