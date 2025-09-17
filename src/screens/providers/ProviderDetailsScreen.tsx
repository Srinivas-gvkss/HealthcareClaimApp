import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ProviderDetailsScreen({ route, navigation }: any) {
  const { provider } = route.params || { provider: { name: 'Unknown' } };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{provider.name}</Text>
      <Text>Specialties: {provider.specialties?.join(', ')}</Text>
      <View style={{height:12}} />
      <Button title="Request Authorization" onPress={() => alert('Authorization flow (not implemented in demo)')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16 },
  title: { fontSize:22, fontWeight:'600', marginBottom:8 }
});
