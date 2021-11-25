import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Layout, Text, Card, Button, Spinner } from "@ui-kitten/components";
import axios from "axios";

const Header = (props) => (
  <View {...props}>
    <Text category="h6">Restaurante {props.number}</Text>
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

const createCards = (loc) => {
  let ar = [...Array(21).keys()];
  let result = [];

  ar.map(async (number) => {
    try {
      let res = await axios.get("https://foodish-api.herokuapp.com/api/");
      result.push(
        <Card
          style={styles.card}
          key={number}
          header={Header({ number: number, loc: loc })}
          footer={Footer}
        >
          <Image
            source={{ uri: res.data.image }}
            resizeMode="cover"
            style={styles.image}
          ></Image>
        </Card>
      );
    } catch (error) {
      console.log("Error retrieving image", error);
    }
  });
  return result;
};

const Restaurantes = ({ navigation, route }) => {
  const cards = createCards(route.params.loc);

  return (
    <React.Fragment>
      <Layout style={styles.topContainer} level="1">
        {cards}
      </Layout>
    </React.Fragment>
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
  topContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
  },
  card: {
    flex: 1,
    justifyContent: "space-evenly",
    margin: 10,
    paddingHorizontal: -16,
    minWidth: 500,
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
    minWidth: 450,
    minHeight: 200,
    height: "auto",
  },
});

export default Restaurantes;