import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Layout, Text, Card, Button, Spinner } from "@ui-kitten/components";
import axios from "axios";

const Header = (props) => (
  <View {...props}>
    <Text category="h6">Restaurante {props.number + 1}</Text>
    <Text category="s1">{props.loc}</Text>
  </View>
);

const Footer = (props) => (
  <View {...props} style={[props.style, styles.footerContainer]}>
    <Button style={styles.footerControl} size="small">
      CREAR PEDIDO
    </Button>
  </View>
);

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
          style={styles.card}
          key={i}
          header={Header({ number: i, loc: loc })}
          footer={Footer}
        >
          {images[i] ? (
            <Image
              source={{ uri: images[i] }}
              resizeMode="cover"
              style={styles.image}
            ></Image>
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
    minHeight: 400,
    maxWidth: 700,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  footerControl: {
    marginHorizontal: 2,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    minWidth: 300,
    minHeight: 400,
    height: "auto",
  },
});

export default Restaurantes;
