// Core
import { StyleSheet } from "react-native";

// Styles
import colors from "../../styles/colors";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 24,
    padding: 16,
    marginTop: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  messageError: {
    color: colors.secondary,
    fontSize: 24,
    textAlign: "center",
    marginTop: 32
  }
});

export default styles;