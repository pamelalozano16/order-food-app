import React, { useEffect, useRef } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Button, Text, Icon } from "@ui-kitten/components";
import Constants from "expo-constants";
import GestureRecognizer from "react-native-swipe-gestures";
import backgroundImages from "../util/backgroundImages";

const HomeScreen = ({ navigation }) => {
  const onSwipeUp = (gestureState) => {
    navigation.navigate("Restaurantes");
  };

  const fondoRandom = () => {
    return (Math.floor(Math.random() * 6) + 1).toString();
  };

  const pulseIconRef = useRef();
  const backgoundImageSrc = "../assets/fondo-" + fondoRandom() + ".jpg";

  useEffect(() => {
    pulseIconRef.current.startAnimation();
  }, []);

  const renderPulseIcon = (props) => (
    <Icon
      {...props}
      ref={pulseIconRef}
      fill="#ffffff"
      style={styles.icon}
      animationConfig={{ cycles: Infinity }}
      animation="pulse"
      name="arrow-ios-upward-outline"
    />
  );

  const config = {
    velocityThreshold: 0.6,
    directionalOffsetThreshold: 80,
  };

  return (
    <GestureRecognizer
      onSwipeUp={(state) => onSwipeUp(state)}
      style={{
        flex: 1,
      }}
      config={config}
    >
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={backgroundImages[fondoRandom()]}
          resizeMode="cover"
          resizeMethod="auto"
          style={styles.image}
        >
          <View style={styles.btnContainer}>
            <Text category="h1" style={styles.p}>
              SWIPE UP
              <Button
                disabled
                appearance="ghost"
                style={styles.button}
                accessoryLeft={renderPulseIcon}
              ></Button>
            </Text>
          </View>
        </ImageBackground>
      </View>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
  button: {
    color: "white",
    backgroundColor: "transparent",
  },
  btnContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  p: {
    margin: 10,
    color: "white",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  icon: {
    width: 32,
    height: 32,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
  },
});

export default HomeScreen;
