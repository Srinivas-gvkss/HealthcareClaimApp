import React from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const MOCK = [
  { id:'r1', purpose:'Insurance', status:'active' },
  { id:'r2', purpose:'Records transfer', status:'revoked' },
];

export default function RoiListScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Button title="Create ROI" onPress={() => navigation.navigate('RoiCreate')} />
      <FlatList
        data={MOCK}
        keyExtractor={i => i.id}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.item}>
            <Text style={{fontWeight:'600'}}>Purpose: {item.purpose}</Text>
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
