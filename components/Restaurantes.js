import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Platform,
} from "react-native";
import { Layout, Text, Card, Button, Spinner } from "@ui-kitten/components";
import axios from "axios";
import CardHeader from "./CardHeader";

const createImages = async () => {
  let result = [];
  for (let i = 0; i < 20; i++) {
    try {
      let res = await axios.get("https://foodish-api.herokuapp.com/api/");
      result.push(res.data.image);
    } catch (error) {
      console.log("Error retrieving image", error);
    }
  }
  return result;
};

const createCards = (loc) => {
  const [images, setImages] = useState([]);
  useEffect(async () => {
    let getImages = await createImages();
    setImages(getImages);
  }, []);

  let result = [];

  for (let i = 0; i < 20; i++) {
    try {
      result.push(
        <Card
          style={
            Platform.OS == "ios" || Platform.OS == "android"
              ? { ...styles.card, minHeight: 550 }
              : styles.card
          }
          key={i}
          appearance="filled"
        >
          {images[i] ? (
            <ImageBackground
              imageStyle={{ borderBottomRightRadius: 200 }}
              source={{ uri: images[i] }}
              resizeMode="cover"
              style={
                Platform.OS == "ios" || Platform.OS == "android"
                  ? { ...styles.image, minHeight: 550 }
                  : styles.image
              }
            >
              <View style={styles.headerContainer}>
                <CardHeader number={i} loc={loc} />
              </View>
            </ImageBackground>
          ) : (
            <Layout
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                margin: 10,
              }}
            >
              <Spinner />
            </Layout>
          )}
        </Card>
      );
    } catch (error) {
      console.log("Error creating cards", error);
    }
  }
  return result;
};

const Restaurantes = ({ navigation, route }) => {
  let cards;
  try {
    cards = createCards(route.params.loc);
  } catch (error) {
    console.log(error);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Layout style={styles.topContainer} level="1">
          {cards}
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  topContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
  },
  card: {
    flex: 1,
    margin: 10,
    minWidth: 300,
    minHeight: 450,
    maxWidth: 700,
    borderRadius: 30,
    borderBottomWidth: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    borderBottomRightRadius: 200,
    flex: 1,
    padding: 15,
    backgroundColor: "#4c4c4c63",
  },
  headerControl: {
    marginHorizontal: 2,
  },
  image: {
    flex: 1,
    minWidth: 300,
    minHeight: 450,
    height: "auto",
    marginRight: 3,
  },
});

export default Restaurantes;
