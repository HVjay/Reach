import React, { Component } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { MapView, Location, Permissions } from "expo";
import app from "./firebase";
import { createStackNavigator, createAppContainer } from "react-navigation";

//import EventPage from "./EventPage";
import Maps from "./Maps";
import LoginScreen from "./LoginScreen";
import LoadingScreen from "./LoadingScreen";
import UserFeedBack from "./UserFeedBack";

const navigator = createStackNavigator(
  {
    // EventPage: { screen: EventPage },
    Maps: { screen: Maps },
    LoginScreen: { screen: LoginScreen },
    LoadingScreen: { screen: LoadingScreen },
    UserFeedBack: { screen: UserFeedBack }
  },
  {
    initialRouteName: "LoadingScreen"
  }
);

const NavCont = createAppContainer(navigator);

export default class App extends Component {
  render() {
    return <NavCont />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    //alignItems: "center",
    //justifyContent: "center",
    //backgroundColor: "#ecf0f1"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e"
  }
});
