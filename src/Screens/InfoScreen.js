import { Button, List, ListItem, Text, View } from 'native-base'
import React, { version } from 'react'
import { useSelector } from 'react-redux'
import { ActivitySelector } from '../Redux/Reducer/Selectors'
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native'
import { Colors } from '../Styles/AppStyles';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

export default function InfoScreen({navigation}){
    const { caseDetail, selectedCard } = useSelector(ActivitySelector)
    console.log(caseDetail);
    return(
        <>
        <TouchableOpacity style={styles.container1} onPress={()=> navigation.navigate("Tabs")}>
         <Ionicons name="ios-arrow-back" size={25} color="black" style={styles.backButtonContainer}  />
            <Text style={styles.textStyle1} >Info</Text>
        </TouchableOpacity>
        <View style={styles.container3} >
        <Button style={styles.buttonContainer} >
            <Text>View Images</Text>
          </Button>
        </View>
        <View style={styles.container5} >
        <Text style={styles.textStyle2} >Patient Info</Text>
        <ScrollView >
            <View style={styles.container2} >
            <Text style={styles.textStyle3} >Patient Name</Text>
            <Text style={styles.textStyle4}>{caseDetail.patientName}</Text>
            {caseDetail.assignedGroup !== undefined && (
                    <Text style={styles.textStyle4}>
                      {caseDetail.assignedGroup["name"]}
                    </Text>
                  )}
            <View style={styles.container4} >
            <Text style={styles.textStyle5} >PatientId</Text>
        
                    <Text style={styles.textStyle4}>
                      DOB                    
                    </Text>
            </View>
            <View style={styles.container4} >
            <Text style={styles.textStyle7} >{caseDetail.patientId}</Text>
            <Text style={styles.textStyle7} >*</Text>
            </View>
            <View style={styles.container4} >
            <Text style={styles.textStyle5} >Gender</Text>
            <Text style={styles.textStyle5} >Study</Text>
            </View>
            <View style={styles.container4} >
            <Text style={styles.textStyle5} >{caseDetail.gender}</Text>
            <Text style={styles.textStyle5} >{caseDetail.study}</Text>
            </View>
            </View>
        </ScrollView>
        </View>
        <Text style={styles.textStyle2} >Info</Text>
        <View style={styles.container6} >
        <List>
            <ListItem >
               <View> 
              <Text style={styles.textStyle8} >Clinical Information</Text>
              <Text style={styles.textStyle9} >{caseDetail.status}</Text>
              </View>
            </ListItem>                    
            <ListItem>
            <View> 
              <Text style={styles.textStyle8} >Priority</Text>
              <Text style={styles.textStyle9} >{caseDetail.priority}</Text>
              </View>
            </ListItem>
            </List>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container1:{
        flexDirection:"row",
        alignItems:"center",
        // marginLeft:"20%",
        marginTop:"20%",
    },
    container2:{
        flexDirection:"column",
        padding:20
    },
    container4:{
        flexDirection:"row",
        margin:"3%"
    },
    container3:{
        justifyContent:"center",
        flexDirection:"row"
    },
    container5:{
        height:"40%"
    },
    container6:{
        padding:20
    },
    backButtonContainer:{
        width:"15%",
        marginLeft:"10%"
    },
    textStyle1:{
        marginLeft:"20%",
        fontSize:20,
        fontWeight:"bold"
    },
    textStyle2:{
        color: Colors.activeStudiesBlueText.blue,
        fontWeight: "bold",
        marginLeft:"5%",
        width:"40%"
    },
    textStyle3:{
        width:"40%",
        color:Colors.infoScreenColors.headerColor,
        fontWeight:"bold"
    },
    textStyle4:{
        width:"60%",
        color:Colors.infoScreenColors.discription,
       fontFamily:"Avenir-Heavy",
       marginTop:"2%"
    },
    textStyle5:{
        width:"50%",
        color:Colors.infoScreenColors.headerColor,
        fontWeight:"bold"
    },
    textStyle7:{
        width:"50%",
        color:Colors.infoScreenColors.discription,
       fontFamily:"Avenir-Heavy"
    },
    textStyle6:{
        width:"50%"
    },
    textStyle8:{
        color:Colors.infoScreenColors.headerColor,
        fontWeight:"bold"
    },
    textStyle9:{
        marginTop:"5%",
        color:Colors.infoScreenColors.discription,
       fontFamily:"Avenir-Heavy"
    },
    buttonContainer:{
        marginTop:"5%",
        backgroundColor:"red",
    }
})