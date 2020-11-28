import { Text, Input, Item, Label, Toast } from "native-base";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import BrandScreenSpinner from "../CommonUtils/BrandScreenSpinner";
import ButtonWithTxt from "../CommonUtils/ButtonWithTxt";
import { signIn } from "../Server/Api";
import { Colors } from "../Styles/AppStyles";

export default function LoginScreen({ navigation }) {
 
  const dispatch=useDispatch()
  const [loading, setLoading] = useState(false);
  const [credential, setCredential] = useState({
    email: "T@gmail.com",
    password: "123456",
  });
  const handleEmail = (event) => {
    setCredential({
      ...credential,
      email: event,
    });
  };
  const handlePassword = (event) => {
    setCredential({
      ...credential,
      password: event,
    });
  };

  const handleSubmit = () => {
    const reg = new RegExp(
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    );

    if (credential.email.length === 0) {
      Toast.show({
        text: "Email is empty",
        position: "bottom",
        type: "danger",
        duration: 2000,
      });
    } else if (!reg.test(credential.email)) {
      Toast.show({
        text: "Invalid Email",
        position: "bottom",
        type: "danger",
        duration: 2000,
      });
    } else if (credential.password.length === 0) {
      Toast.show({
        text: "Password is empty",
        position: "bottom",
        type: "danger",
      });
    } else {
          // navigation.navigate("Tabs")
          signIn(credential, dispatch, navigation, setLoading)
    }
  };


  if(loading) return( <BrandScreenSpinner/>)

  return (
    <>
      <View style={styles.container1}>
        <Text style={styles.textStyle1}>Login</Text>
      </View>
      <View style={styles.container2}>
        <Item stackedLabel style={styles.lineWidth}>
          <Label style={styles.inputTextStyle1}>Name</Label>
          <Input
            value={credential.email}
            defaultValue={credential.email}
            onChangeText={(event) => handleEmail(event)}
          />
        </Item>
        <Item stackedLabel style={styles.lineWidth}>
          <Label style={styles.inputTextStyle1}>Password</Label>
          <Input
            secureTextEntry={true}
            value={credential.password}
            defaultValue={credential.password}
            onChangeText={(event) => handlePassword(event)}
          />
        </Item>
        <Text style={styles.passTextStyle}>Forgot Password</Text>
        <ButtonWithTxt
          text="SignIn"
          credential={credential}
          setCredential={setCredential}
          press={handleSubmit}
          containerStyle={ styles.loginContainer }
          textUpperCase={false}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container1: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "15%",
  },
  container2: {
    marginTop: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle1: {
    fontSize: 22,
    color: Colors.primaryColor.black,
    fontWeight: "600",
  },
  inputTextStyle1: {
    fontWeight: "600",
    fontSize: 11,
    color: Colors.loginInputTextColor.lighGrey,
  },
  passTextStyle: {
    color: Colors.secondaryColor.blue,
    textDecorationLine: "underline",
    marginTop: "5%",
    fontSize: 12,
    fontWeight: "600",
  },
  buttonStyle: {
    backgroundColor: Colors.secondaryColor.blue,
    width: "50%",
    justifyContent: "center",
    alignContent: "center",
  },
  logTextStyle: {
    fontWeight: "900",
    color: Colors.whiteColor.white,
  },
  lineWidth: {
    width: "60%",
  },
  loginContainer:{
    marginTop:"30%",
    flexDirection:"row"
  }
});
