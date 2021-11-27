import React from "react";
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_700Bold,
} from "@expo-google-fonts/open-sans";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "@ui-kitten/components";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const CardHeader = (props) => {
  useFonts({
    OpenSans_400Regular,
    OpenSans_700Bold,
  });
  return (
    <View {...props}>
      <Text style={styles.headerControl} category="h4">
        Restaurante {props.number + 1}
      </Text>
      <Text style={styles.headerControl} category="h6">
        <MaterialCommunityIcons
          name="map-marker-multiple"
          size={24}
          color="white"
        />
        {props.loc}
      </Text>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Button
          style={styles.buttonControl}
          size="small"
          appearance="filled"
          textStyle={{ color: "white" }}
          accessoryRight={() => (
            <MaterialIcons name="add-shopping-cart" size={24} color="white" />
          )}
        >
          CREAR PEDIDO
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerControl: {
    marginHorizontal: 5,
    fontFamily: "OpenSans_700Bold",
    color: "white",
    letterSpacing: 1,
  },
  buttonControl: {
    padding: 5,
    borderColor: "white",
    backgroundColor: "#6f6babd6",
    // #ab6b6bd6
    marginBottom: 15,
    minWidth: 100,
    maxWidth: 175,
  },
});

export default CardHeader;
