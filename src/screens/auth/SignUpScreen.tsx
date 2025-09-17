import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function SignUpScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up (Demo)</Text>
      <TextInput style={styles.input} placeholder="Full name" />
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />
      <Button title="Create account" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20, justifyContent:'center' },
  title: { fontSize:22, fontWeight:'600', marginBottom:18 },
  input: { borderWidth:1, borderColor:'#ddd', padding:10, marginBottom:12, borderRadius:6 }
});
