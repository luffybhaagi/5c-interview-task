import { Root } from "native-base";
import React from "react";
import { Provider } from "react-redux";
import {createStore } from "redux";
import Navigations from "./src/Navigators/Navigations";
import RootReducer from "./src/Redux/RootReducer";


const store = createStore(RootReducer)

export default function App() {
  return (
    <Provider store={store}>
      <Root>
        <Navigations />
      </Root>
    </Provider>
  );
}
