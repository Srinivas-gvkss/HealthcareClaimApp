import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';

export default function RoiCreateScreen({ navigation }: any) {
  const [purpose, setPurpose] = useState('');
  const [recip, setRecip] = useState('');

  function onCreate() {
    // mock sign capture step would go here
    Alert.alert('ROI created (mock)', 'Server PDF generation and signing would happen in full implementation.');
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create HIPAA ROI</Text>
      <TextInput style={styles.input} placeholder="Purpose" value={purpose} onChangeText={setPurpose} />
      <TextInput style={styles.input} placeholder="Recipient (name or email)" value={recip} onChangeText={setRecip} />
      <Button title="Capture Signature & Create (mock)" onPress={onCreate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16 },
  title: { fontSize:20, fontWeight:'600', marginBottom:8 },
  input: { borderWidth:1, borderColor:'#ddd', padding:10, borderRadius:6, marginBottom:12 }
});
