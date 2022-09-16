import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    padding: 16,
    borderRadius: 24,

  },
  input: {
    flex: 1,
    paddingLeft: 16,
  },
});

export default styles;