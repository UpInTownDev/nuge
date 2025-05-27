import React from 'react';
import { Text, View } from 'react-native';
import './global.css';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

/**
 * Main App Component for Nuge Mobile Application
 * Entry point for the food vendor localization platform
 */
export default function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name='Home' component={HomeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
