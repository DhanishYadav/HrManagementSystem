import { StatusBar } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './src/screen/RootNavigation/Stack';
const App = () => {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor="#f2612b" />
      <MyStack />
    </NavigationContainer>
  )
}
export default App
