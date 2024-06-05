import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BemVindo from './BemVindo';
import MenuInicio from './MenuInicio';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BemVindo">
        <Stack.Screen name="BemVindo" component={BemVindo} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={MenuInicio} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
