// Components
import { View } from "react-native";
import ButtonSaveCEPs from "../ButtonSaveCEPs";
import Map from "../Map";

// Styles
import styles from "./styles";

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.leftArea}>
        <Map/>
      </View>
      <View style={styles.rightArea}>
        <ButtonSaveCEPs/>
      </View>
    </View>
  )
}