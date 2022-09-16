// Core
import { StyleSheet, StatusBar } from "react-native";

// Styles
import colors from "../../styles/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.dominant,
    paddingTop: (StatusBar.currentHeight ?? 0) + 24,
    paddingBottom: 24,
    paddingLeft: 24,
    paddingRight: 24,
  }
});

export default styles;