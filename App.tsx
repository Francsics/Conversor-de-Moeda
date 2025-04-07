import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import ConverterScreen from './screens/ConverterScreen';
import HistoryScreen from './screens/HistoryScreen';

export type RootStackParamList = {
  Home: undefined;
  Converter: undefined;
  History: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen
              name="Converter"
              component={ConverterScreen}
              options={{ headerShown: false }}
            />
          <Stack.Screen
            name="History"
            component={HistoryScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
