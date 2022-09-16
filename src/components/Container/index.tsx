// Core
import { View } from "react-native"; 

// Styles
import styles from "./styles";

type ContainerProps = {
  children: JSX.Element | JSX.Element[];
}

export default function Container({ children }: ContainerProps) {
  return (
    <View style={styles.container}>
      { children }
    </View>
  )
}