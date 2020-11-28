import { Button, Text, View } from 'native-base'
import React from 'react'
import { useSelector } from 'react-redux'
import { ActivitySelector } from '../Redux/Reducer/Selectors'
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet,FlatList } from 'react-native'
import { Colors } from '../Styles/AppStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Item({item,index}){

    return(
        <>
        <View style={styles.container6}>
            <Text style={styles.textStyle3}>{index}</Text>
            <Text style={styles.textStyle3}>{item.name}</Text>
            <Button style={styles.buttonViewContainer} onPress={()=>{item.img}} >
            <Text>View</Text>
          </Button>
          </View>
        </>
    )
}

export default function DocumentsScreen({navigation}){
    const { caseDetail } = useSelector(ActivitySelector)
    console.log(caseDetail.images);
    return(
        <>
        <TouchableOpacity style={styles.container1} onPress={()=> navigation.navigate("Tabs")} >
         <Ionicons name="ios-arrow-back" size={25} color="black" style={styles.backButtonContainer} />
            <Text style={styles.textStyle1} >Info</Text>
        </TouchableOpacity>
        <View style={styles.container3} >
        <Button style={styles.buttonContainer} onPress={()=>navigation.navigate("Camera")} >
            <Text>Upload File</Text>
          </Button>
        </View>
        <View style={styles.container4} >
            <View style={styles.container5}>
            <Text style={styles.textStyle3} >S.No.</Text>
            <Text style={styles.textStyle3} >File</Text>
            </View>
            </View>        
          <FlatList 
          data={caseDetail.images}
          renderItem={({item,index})=>(
              <Item item={item} index={index}/>
          )}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
                <View style={styles.container2} >
                    <Text style={styles.textStyle2} >Sorry no data to display</Text>
                </View>
          }
          />
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
        margin:"5%",
        justifyContent:"center",
        flexDirection:"row",
        marginTop:"20%"
    },
    container4:{
        flexDirection:"column"
    },
    container5:{
        flexDirection:"row",
        marginLeft:"10%",
        marginTop:"10%"
    },
    container6:{
        flexDirection:"row",
        marginLeft:"10%",
        marginTop:"10%"
    },
    backButtonContainer:{
        width:"15%",
        marginLeft:"10%"
    },
    buttonContainer:{
        marginTop:"5%",
        backgroundColor:"red",
    },
    container3:{
        justifyContent:"center",
        flexDirection:"row"
    },
    textStyle1:{
        marginLeft:"20%",
        fontSize:20,
        fontWeight:"bold"
    },
    textStyle2:{
        fontSize:20,
        fontWeight:"bold"
    },
    textStyle3:{
        width:"30%",
        color:Colors.infoScreenColors.headerColor,
        fontWeight:"bold"
    }
})