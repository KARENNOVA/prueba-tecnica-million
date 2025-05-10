import '../gesture-handler.native';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigation } from './presentation/routes/StackNavigation';


export const App = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  )
}


