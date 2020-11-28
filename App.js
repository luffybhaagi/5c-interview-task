import { AppLoading } from 'expo';
import { Audio } from 'expo-av';
import { Camera } from 'expo-camera';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Root } from 'native-base';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from "react-redux";
import {createStore } from "redux";
import Navigations from "./src/Navigators/Navigations";
import RootReducer from "./src/Redux/RootReducer";


const store = createStore(RootReducer)

export default function App() {

  useEffect(() => {
    (async () => {
      await Camera.requestPermissionsAsync();
      // await Audio.requestPermissionsAsync();
    })();
  }, []);

  let [fontsloaded] = useFonts({
    "Avenir-Medium": require("./Fonts/Avenir-Medium.ttf"),
    "Avenir-Roman": require("./Fonts/Avenir-Roman.otf"),
    "Avenir-Heavy": require("./Fonts/AEH.ttf"),
    Roboto_medium: require("./Fonts/Roboto-Medium.ttf"),
    "Avenir-Black": require("./Fonts/Avenir-Black.otf"),
  });
  if (!fontsloaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <Root>
        <Navigations />
      </Root>
    </Provider>
  );
}
