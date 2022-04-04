import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function AppButton({ title, onPress, color = "primary", size = "normal", btnStyle, style, ...params }) {
  return (
    <TouchableOpacity
        disabled={params?.disabled}
      style={[styles.button, size === 'normal' ?  styles.normalSizeBtn : styles.smallSizeBtn, { backgroundColor: colors[color] }, style, params?.disabled ? styles.disabled : '']}
      onPress={() => !params?.disabled ? onPress(): null}
    >
      <Text style={[styles.text, size === 'normal' ?  styles.normalSizeText : styles.smallSizeText, btnStyle]} {...params}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
  },
  disabled: {
    opacity: 0.4,
  },
  text: {
    color: colors.white,
    textTransform: "uppercase",
  },
  normalSizeBtn: {
    padding: 15,
    borderRadius: 8,
  },
  normalSizeText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  smallSizeBtn: {
    padding: 8,
    borderRadius: 5,
  },
  smallSizeText: {
    fontSize: 14,
    fontWeight: "bold",
    paddingHorizontal: 5,
  },
});

export default AppButton;
