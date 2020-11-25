import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons,AntDesign,Ionicons,MaterialIcons } from '@expo/vector-icons';
import ActiveStudies from '../Screens/ActiveStudies';


const Tab = createMaterialBottomTabNavigator();

export default function BottomNavigator(){
    return(
        <Tab.Navigator initialRouteName="Home"
        activeColor="#000000"
        barStyle={{ backgroundColor: '#ffff' }}
        >
       <Tab.Screen
        name="StudyStore"
        component={ActiveStudies}
        options={{
          
          tabBarIcon: ({ color }) => (
            <AntDesign name="cloudo" size={24} color="black" />
            ),
        }}
      /> 
       <Tab.Screen
        name="ActiveStudies"
        component={ActiveStudies}
        options={{
          
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="lightbulb-on-outline" size={24} color="black" />          
            ),
        }}
      /> 
         < Tab.Screen
        name="CompletedStudies"
        component={ActiveStudies}
        options={{
          
          tabBarIcon: ({ color }) => (
          <Ionicons name="md-book" size={24} color="black" />         
             ),
        }}
      /> 
           < Tab.Screen
        name="Rework"
        component={ActiveStudies}
        options={{
          
          tabBarIcon: ({ color }) => (
          <MaterialIcons name="history" size={24} color="black" />             
          ),
        }}
      /> 
       
      </Tab.Navigator>
    )
}