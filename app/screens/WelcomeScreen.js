import React from "react";
import { StyleSheet, View } from "react-native";

import Button from "../components/Button";
import Logo from "../components/Logo";
import routes from "../navigation/routes";

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.background}>
      <View style={styles.logoWrapper}>
      <Logo />
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          title="Login"
          onPress={() => navigation.navigate(routes.LOGIN)}
        />
        {/* <Button
          title="Register"
          color="secondary"
          onPress={() => navigation.navigate(routes.REGISTER)}
        /> */}
      </View>
      </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  logoWrapper : {
    position: "absolute",
    top: 120,
  }
});

export default WelcomeScreen;
