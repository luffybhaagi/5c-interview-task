import { Button, Text } from 'native-base'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Colors } from '../Styles/AppStyles'



export default function ButtonWithTxt({text, press}) {
    return(
        <TouchableOpacity style={{ marginTop:"30%", flexDirection:'row'}} 
                onPress={press}>
            <Button onPress={press} rounded style={ styles.buttonStyle }>
                <Text style={ styles.logTextStyle }>{text}</Text>
            </Button>   
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    buttonStyle:{
       backgroundColor:Colors.secondaryColor.blue,
       width:"50%",
       justifyContent:"center",
       alignContent:"center",
   },
    logTextStyle:{
        fontWeight:"900",
        color:Colors.whiteColor.white,
    },
})