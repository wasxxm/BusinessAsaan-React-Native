import { Platform } from "react-native";

import colors from "./colors";

export default {
  colors,
  text: {
    color: colors.dark,
    fontSize: 16,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  smallText: {
    fontSize: 14,
  },
  heading: {
    fontSize: 20,
  },
  subHeading: {
    fontSize: 16,
    color: colors.medium,
  }
};
