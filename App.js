import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import { getAll } from './functions/chats';

export default function App() {
  const [tempList, setState] = useState([
    { name: 'hayden', id: '1' },
    { name: 'yoshi', id: '2' },
    { name: 'mario', id: '3' },
    { name: 'luigi', id: '4' },
    { name: 'peach', id: '5' },
    { name: 'toad', id: '6' },
    { name: 'bowser', id: '7' },
  ]);

  var list = getAll();

  return (
    <View style={styles.container}>
    <FlatList 
      numColumns={2}
      keyExtractor={(item) => item.id}
      data={tempList}
      renderItem={({ item }) => (
        <View>
          <Text style={styles.item}>name: {item.name}</Text>
        </View>
      )}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  item: {
    marginTop: 24,
    padding: 30,
    backgroundColor: 'pink',
    fontSize: 24,
    marginHorizontal: 10,
    marginTop: 24,
  }
});
