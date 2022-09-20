// Core
import { 
  StyleSheet, 
  StatusBar, 
  Dimensions 
} from "react-native";

// Styles
import colors from "../../styles/colors";

const widthApp = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: (StatusBar.currentHeight ?? 0) + 100,
    paddingLeft: 24,
    paddingRight: 24,
  },
  list: {
    width: widthApp
  },
  areaItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 24,
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 24,
  },
  textItem: {
    color: colors.secondary,
    fontSize: 24,
    marginRight: 8,
  },
  buttonShowCEP: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: colors.emphasis,
    borderRadius: 24,
  },
  textButtonShowCEP: {
    color: colors.dominant,
    fontWeight: "bold",
    fontSize: 16
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  }
});

export default styles;