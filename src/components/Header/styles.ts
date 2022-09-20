// Core
import { StyleSheet, StatusBar } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: (StatusBar.currentHeight ?? 0) + 24
  },
  leftArea: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  rightArea: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default styles;