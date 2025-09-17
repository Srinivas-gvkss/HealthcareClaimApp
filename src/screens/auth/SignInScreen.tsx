import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../../context/AuthContext';

export default function SignInScreen({ navigation }: any) {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState('demo@user.com');
  const [password, setPassword] = useState('password');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Sign In" onPress={async () => { await signIn(email, password); }} />
      <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>Create account</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20, justifyContent:'center' },
  title: { fontSize:24, fontWeight:'600', marginBottom:20 },
  input: { borderWidth:1, borderColor:'#ddd', padding:10, marginBottom:12, borderRadius:6 },
  link: { marginTop:12, color:'#007AFF' }
});
