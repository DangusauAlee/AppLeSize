import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

export default function TestInput() {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Test Input:</Text>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Type here..."
        placeholderTextColor="#999"
      />
      <Text style={styles.output}>You typed: {text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  label: { fontSize: 18, marginBottom: 10, color: 'white' },
  input: {
    borderWidth: 1,
    borderColor: '#666',
    padding: 10,
    width: '100%',
    color: 'white',
    backgroundColor: '#333',
  },
  output: { marginTop: 20, color: 'white' },
});