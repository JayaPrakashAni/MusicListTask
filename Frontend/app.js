import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../musicfest/Src/Login';
import MusicScreen from '../musicfest/Src/MusicList';
import Detail from '../musicfest/Src/DetailScreen'
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Music" 
          component={MusicScreen} 
          options={{ title: 'Music List' }}
        />
            <Stack.Screen name="SongDetail" component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
