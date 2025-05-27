import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import './global.css';

/**
 * Main App Component for Nuge Mobile Application
 * Entry point for the food vendor localization platform
 */
export default function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text className='text-2xl font-bold text-red-500'>
        Welcome to Nuge - Food Vendor Localization Platform
      </Text>
      <Text className='text-lg'>Connecting food lovers with nomadic vendors in Brussels</Text>
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
});
