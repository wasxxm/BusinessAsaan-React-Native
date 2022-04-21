import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import Icon from "./Icon";
import Text from "./Text";

import colors from "../config/colors";

function ListPickerItem({ item, onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        {item.icon && <Icon
          backgroundColor={item.backgroundColor}
          name={item.icon}
          size={80}
        />}
        <Text style={styles.label}>{item.label}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    margin: 5,
    width: "100%",
    backgroundColor: colors.white,
  },
  label: {
    textAlign: "center",
  },
});

export default ListPickerItem;
