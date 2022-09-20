// Core
import { StyleSheet, StatusBar } from "react-native";

const styles = StyleSheet.create({
  buttonClose: {
    position: "absolute",
    top: (StatusBar.currentHeight ?? 0) + 24,
    right: 24,
    zIndex: 1000
  }
});

export default styles;