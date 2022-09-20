// Core
import { StyleSheet, StatusBar } from "react-native";

const styles = StyleSheet.create({
  buttonClose: {
    position: "absolute",
    top: (StatusBar.currentHeight ?? 0) + 24,
  }
});

export default styles;