import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { AntDesign,Entypo } from '@expo/vector-icons';
import InfoScreen from '../Screens/InfoScreen';
import DocumentsScreen from '../Screens/DocumentsScreen';
import MessageScreen from '../Screens/MessengerScreen';


const Tab = createMaterialBottomTabNavigator();

export default function DetailsBottomNavigator(){
    return(
    <Tab.Navigator initialRouteName="InfoScreen"
        activeColor="#000000"
        barStyle={{ backgroundColor: '#ffff' }}
        >
       <Tab.Screen
        name="Info"
        component={InfoScreen}
        options={{
          
          tabBarIcon: ({ color }) => (
            <AntDesign name="infocirlceo" size={24} color="black" />
            ),
        }}
      /> 
        <Tab.Screen
        name="Doument"
        component={DocumentsScreen}
        options={{
          
          tabBarIcon: ({ color }) => (
            <Entypo name="documents" size={24} color="black" />          
            ),
        }}
      /> 
         <Tab.Screen
        name="Message"
        component={MessageScreen}
        options={{
          
          tabBarIcon: ({ color }) => (
            <AntDesign name="message1" size={24} color="black" />         
             ),
        }}
      /> 
    </Tab.Navigator>
    )
}