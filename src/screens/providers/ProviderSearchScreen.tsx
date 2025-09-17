import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MOCK = [
  { id:'p1', name:'Central Clinic', specialties:['Cardiology','General'] },
  { id:'p2', name:'Eastside Health', specialties:['Orthopedics'] },
];

export default function ProviderSearchScreen({ navigation }: any) {
  const [q, setQ] = useState('');
  const [results, setResults] = useState(MOCK);

  function onSearch() {
    setResults(MOCK.filter(p => p.name.toLowerCase().includes(q.toLowerCase()) || p.specialties.join(',').toLowerCase().includes(q.toLowerCase())));
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Search providers by name or specialty" value={q} onChangeText={setQ} />
      <Button title="Search" onPress={onSearch} />
      <FlatList
        data={results}
        keyExtractor={i => i.id}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ProviderDetails', { provider: item })}>
            <Text style={{fontWeight:'600'}}>{item.name}</Text>
            <Text>{item.specialties.join(', ')}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16 },
  input: { borderWidth:1, borderColor:'#ddd', padding:10, borderRadius:6, marginBottom:8 },
  item: { padding:12, borderBottomWidth:1, borderColor:'#eee' }
});
