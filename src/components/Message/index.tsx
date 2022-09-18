// Components
import { Text } from "react-native";

// Styles
import styles from "./styles";
import colors from "../../styles/colors";

type MessageErrorProps = {
  children: string | string[];
  color?: string 
}

export default function MessageError({ 
  children, 
  color = colors.secondary 
}: MessageErrorProps) {
  return (
    <Text style={[
      styles.message,
      { color }
    ]}>
      { children }
    </Text>
  )
}