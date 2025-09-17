import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

export default function ClaimFormScreen({ navigation }: any) {
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Submit Claim</Text>
      <TextInput style={styles.input} placeholder="Provider name" />
      <TextInput style={styles.input} placeholder="Amount" keyboardType="numeric" value={amount} onChangeText={setAmount} />
      <TextInput style={[styles.input, {height:100}]} placeholder="Notes" value={notes} onChangeText={setNotes} multiline />
      <Button title="Submit (demo)" onPress={() => { alert('Submitted (mock)'); navigation.goBack(); }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16 },
  title: { fontSize:20, fontWeight:'600', marginBottom:8 },
  input: { borderWidth:1, borderColor:'#ddd', padding:10, borderRadius:6, marginBottom:12 }
});
