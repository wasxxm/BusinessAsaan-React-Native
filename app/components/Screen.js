import React from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import colors from "../config/colors";

function Screen({ children, style }) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
    paddingTop: 10,
    flex: 1,
  },
  view: {
    flex: 1,
  },
});

export default Screen;
