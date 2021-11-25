import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import * as eva from "@eva-design/eva";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { mapping } from "./util/mapping";
import axios from "axios";
import Restaurantes from "./components/Restaurantes";
import {
  ApplicationProvider,
  Button,
  Layout,
  Text,
  DarkTheme,
  Spinner,
} from "@ui-kitten/components";

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={styles.btnContainer}>
        <Text category="h1" style={styles.p}>
          HOME
        </Text>

        <Button
          size="large"
          style={styles.startButton}
          onPress={async () => {
            navigation.navigate("Restaurantes");
          }}
        >
          START
        </Button>
      </View>
    </Layout>
  );
};

export default function App() {
  const [userLocation, setUserLocation] = useState(undefined);
  useEffect(() => {
    getLoc();
  });

  function getLoc() {
    navigator.geolocation.getCurrentPosition(
      async (data) => {
        try {
          const res = await axios.get(
            "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=" +
              data.coords.latitude +
              "&longitude=" +
              data.coords.longitude +
              "&localityLanguage=en"
          );
          setUserLocation(res.data.locality + ", " + res.data.countryCode);
          console.log(res.data);
        } catch (error) {
          console.log("Error", error);
        }
      },
      (error) => {
        console.log("error", error);
      },
      []
    );
  }

  return (
    <ApplicationProvider {...eva} customMapping={mapping} theme={eva.light}>
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator>
          {/* <Stack.Screen
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
                      <Text style={styles.p}>Obtaining your Location</Text>
                      <Spinner size="giant" />
                    </Layout>
                  )
            }
            options={{ title: "Welcome!" }}
          /> */}
          <Stack.Screen
            name="Restaurantes"
            component={Restaurantes}
            initialParams={{ loc: userLocation }}
            options={
              userLocation
                ? {
                    title: "Restaurantes en " + userLocation,
                  }
                : { title: "Restaurantes" }
            }
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
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
  btnContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 1,
  },
  p: {
    margin: 10,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  startButton: {},
});
