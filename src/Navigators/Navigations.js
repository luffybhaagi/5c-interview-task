import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from '../Screens/LoginScreen';
import BottomNavigator from './BottomNavigator';
import ActiveStudies from '../Screens/ActiveStudies';
import DetailsBottomNavigator from './DetailsBottomNavigator';
import CameraPageScreen from '../Screens/CameraPageScreen';

const Stack = createStackNavigator();

export default function Navigations(){
    return(
    <NavigationContainer>
        <Stack.Navigator headerMode="none" initialRouteName="Details" >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Tabs" component={BottomNavigator}/>
        <Stack.Screen name="ActiveStudies" component={ActiveStudies} />
        <Stack.Screen name="Details" component={DetailsBottomNavigator} />
        <Stack.Screen name="Camera" component={CameraPageScreen} />
        </Stack.Navigator>
    </NavigationContainer>
    )
}