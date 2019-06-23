import React, { Component } from "react";
import { Text, View, StyleSheet, Alert, Button } from "react-native";
import { MapView, Location, Permissions } from "expo";
import app from "./firebase";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { TouchableOpacity } from "react-native-gesture-handler";
import firebase from "firebase";
export default class Maps extends Component {
  state = {
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null,
    location: null
  };
  MarkerAlert = (lat, long) => {
    Alert.alert(
      "Create Event Here?",
      "Please select one",
      [
        {
          text: "No",
          style: "cancel"
        },
        { text: "Yes", onPress: () => this.MarkerDate(lat, long) }
      ],
      { cancelable: false }
    );
  };
  MarkerDate = (lat, long) => {
    Alert.alert(lat);
  };
  componentDidMount() {
    this._getLocationAsync();
  }

  _handleMapRegionChange = mapRegion => {
    console.log(mapRegion);
    this.setState({ mapRegion });
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        locationResult: "Permission to access location was denied"
      });
    } else {
      this.setState({ hasLocationPermissions: true });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location), location });

    this.setState({
      mapRegion: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.locationResult === null ? (
          <Text>Finding your current location...</Text>
        ) : this.state.hasLocationPermissions === false ? (
          <Text>Location permissions are not granted.</Text>
        ) : this.state.mapRegion === null ? (
          <Text>Map region doesn't exist.</Text>
        ) : (
          <MapView
            style={{ alignSelf: "stretch", height: 400 }}
            region={this.state.mapRegion}
            onRegionChange={this._handleMapRegionChange}
            // onMarkerDragEnd={() => Alert.alert(this.state.location.coords)}
          >
            <MapView.Marker
              draggable
              coordinate={this.state.location.coords}
              title="My Marker"
              description="Some description"
              trackViewChanges="true"
              onDragEnd={e =>
                this.MarkerAlert(
                  e.nativeEvent.coordinate.latitude,
                  e.nativeEvent.coordinate.longitude
                )
              }
            />
          </MapView>
        )}
        <Button
          styles={styles.SignOut}
          title="Sign out"
          onPress={() => firebase.auth().signOut()}
        />
        <Buttton
          styles={styles.SignOut}
          title="Profile"
          onPress={()=this.props.navigation.navigate("UserFeedBack")}
        />
      </View>
    );
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
  },
  SignOut: {
    alignItems: "flex-end"
  }
});
