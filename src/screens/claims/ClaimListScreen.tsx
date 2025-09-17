import React from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const MOCK_CLAIMS = [
  { id:'c1', provider:'Central Clinic', status:'Processing' },
  { id:'c2', provider:'Eastside Health', status:'Paid' },
];

export default function ClaimListScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Button title="Submit New Claim" onPress={() => navigation.navigate('ClaimForm')} />
      <FlatList
        data={MOCK_CLAIMS}
        keyExtractor={i=>i.id}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.item}>
            <Text style={{fontWeight:'600'}}>{item.provider}</Text>
            <Text>Status: {item.status}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16 },
  item: { padding:12, borderBottomWidth:1, borderColor:'#eee' }
});
