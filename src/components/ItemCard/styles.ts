// Core
import { StyleSheet } from "react-native";

// Styles
import colors from "../../styles/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  textStrong: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.emphasis,
    marginBottom: 4,
  },
  textDefault: {
    fontSize: 14,
    color: `${colors.secondary}80`,
  },
});

export default styles;