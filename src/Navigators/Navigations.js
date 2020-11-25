import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from '../Screens/LoginScreen';
import BottomNavigator from './BottomNavigator';
import ActiveStudies from '../Screens/ActiveStudies';

const Stack = createStackNavigator();

export default function Navigations(){
    return(
    <NavigationContainer>
        <Stack.Navigator headerMode="none" initialRouteName="Tabs" >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Tabs" component={BottomNavigator}/>
        <Stack.Screen name="ActiveStudies" component={ActiveStudies} />
        </Stack.Navigator>
    </NavigationContainer>
    )
}