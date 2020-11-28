import { Text, Thumbnail, View } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import pickListLoading from '../../assets/picklistloading.gif'


export default function BrandScreenSpinner({message}) {
  const localMessage=message??"Loading..."
  return (
    <View
      style={styles.container}
    >
      <Thumbnail source={pickListLoading} style={styles.image}></Thumbnail>
    <Text>{localMessage}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
        alignContent: "center",
        flexDirection: "column",
        flex: 1,
        alignItems: "center",
},
  image:{
      height:50,
      width:50,
      backgroundColor:'transparent'
  },
  splashPickImgStyle: {
    height: 55,
    width: 218,
    alignSelf: "center",
  },
});
