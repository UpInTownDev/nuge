import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

/**
 * Main App Component for Nuge Mobile Application
 * Entry point for the food vendor localization platform
 */
export default function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Nuge - Food Vendor Localization Platform</Text>
      <Text style={styles.subText}>Connecting food lovers with nomadic vendors in Brussels</Text>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  subText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
  },
});
