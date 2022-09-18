import { View, Text, FlexAlignType } from "react-native";
import styles from "./styles";

type ItemCardProps = {
  align?: "left" | "right";
  title: string;
  children: string;
}

export default function ItemCard({ 
  align, 
  title, 
  children 
}: ItemCardProps) {
  function applyAlignItem(align: ItemCardProps["align"]): FlexAlignType | undefined {
    switch (align) {
      default:
      case "left":
        return "flex-start";
      
      case "right":
        return "flex-end";
    }
  }

  return (
    <View
      style={[
        styles.container,
        { alignItems: applyAlignItem(align) }
      ]}
    >
      <Text 
        style={[
          styles.textStrong,
          {
            textAlign: align
          }
        ]}
      >
        { title }
      </Text>
      <Text 
        style={[
          styles.textDefault,
          {
            textAlign: align
          }
        ]}
      >
        { children || "Não foi encontrado" }
      </Text>
    </View>
  )
}