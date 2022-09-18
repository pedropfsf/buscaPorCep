// Components
import { Text } from "react-native";

// Styles
import styles from "./styles";

type TitleProps = {
  children: string;
}

export default function Title({ 
  children,
}: TitleProps) {

  return (
    <Text style={styles.title}>
      { children }
    </Text>
  )
}