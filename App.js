import { StatusBar } from 'expo-status-bar';
import { Root } from 'native-base';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigations from './src/Navigators/Navigations';

export default function App() {
  return (
   <Root>
     <Navigations/>
   </Root>
  )
}

const styles = StyleSheet.create({
 
});
