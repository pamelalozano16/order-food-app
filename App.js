import * as React from "react";
import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  Button,
  Layout,
  Text,
  Divider,
} from "@ui-kitten/components";
import axios from "axios";

// You can import from local files
import AssetExample from "./components/AssetExample";

// or any pure javascript modules available in npm
import { Card } from "react-native-paper";

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
        console.log(res);
      } catch (error) {
        console.log("Error", error);
      }
      console.log(data);
    },
    (error) => {
      console.log("error", error);
    },
    []
  );
}

const HomeScreen = () => (
  <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text category="h1">HOME</Text>
    <Button size="large" style={styles.startButton} onPress={() => getLoc()}>
      START
    </Button>
    <Divider />
    <Button status="control" size="large">
      START
    </Button>
  </Layout>
);

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <HomeScreen />
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
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  startButton: {},
});
