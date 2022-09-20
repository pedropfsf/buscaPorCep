// Components
import { StatusBar } from "react-native";

// Styles
import { StyleSheet } from "react-native";
import colors from "../../styles/colors";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.dominant,
  },
  buttonShowModal: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonHiddenModal: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 24,
    right: 24,
  },
});

export default styles;