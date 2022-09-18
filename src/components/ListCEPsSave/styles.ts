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
    paddingTop: (StatusBar.currentHeight ?? 0) + 120,
    paddingBottom: 24,
    paddingLeft: 24,
    paddingRight: 24,
  },
  list: {
    // flex: 1,
    width: widthApp
  },
  areaItem: {
    // width: widthApp - 24,
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
    fontSize: 24
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
  }
});

export default styles;