import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Login from './screens/login'

export default function App() {
  return (
    <View style={styles.container}>
      <Login  />
      <StatusBar style="green" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
