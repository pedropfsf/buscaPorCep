// Components
import { Text } from "react-native";

// Styles
import styles from "./styles";

type MessageErrorProps = {
  children: string | string[];
}

export default function MessageError({ children }: MessageErrorProps) {
  return (
    <Text style={styles.message}>
      { children }
    </Text>
  )
}