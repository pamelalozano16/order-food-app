import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import * as eva from "@eva-design/eva";
import { NavigationContainer } from "@react-navigation/native";
import { mapping } from "./util/mapping";
import axios from "axios";
import * as Location from "expo-location";
import Restaurantes from "./components/Restaurantes";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import HomeScreen from "./components/HomeScreen";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import {
  ApplicationProvider,
  Layout,
  Text,
  DarkTheme,
  Spinner,
  Icon,
  IconRegistry,
} from "@ui-kitten/components";

const Stack = createStackNavigator();

export default function App() {
  const [userLocation, setUserLocation] = useState(undefined);
  useEffect(() => {
    _getLocationAsync();
  });

  const _getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setUserLocation("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    const res = await axios.get(
      "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=" +
        location.coords.latitude +
        "&longitude=" +
        location.coords.longitude +
        "&localityLanguage=en"
    );
    setUserLocation(res.data.locality + ", " + res.data.countryCode);
  };

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} customMapping={mapping} theme={eva.light}>
        <NavigationContainer theme={DarkTheme}>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: true,
              gestureEnabled: true,
              cardOverlayEnabled: true,
              ...TransitionPresets.ModalSlideFromBottomIOS,
            }}
          >
            <Stack.Screen
              name="Home"
              component={
                userLocation
                  ? HomeScreen
                  : () => (
                      <Layout
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text style={styles.p}>
                          Obtaining your Location{" "}
                          <Icon name="map" style={{ height: 25, width: 25 }} />
                        </Text>
                        <Spinner size="giant" />
                      </Layout>
                    )
              }
              options={{
                title: "Welcome!",
              }}
            />
            <Stack.Screen
              name="Restaurantes"
              component={Restaurantes}
              initialParams={{ loc: userLocation }}
              options={
                userLocation
                  ? {
                      title: "Restaurantes en " + userLocation,
                    }
                  : {
                      title: "Restaurantes",
                    }
              }
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  p: {
    margin: 10,
  },
});
