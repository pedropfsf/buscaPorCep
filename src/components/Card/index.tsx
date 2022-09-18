// Components
import { View, Text } from "react-native";
import ItemCard from "../ItemCard";

// Styles
import styles from "./styles";

// Types
import Data from "../../types/Data";

type CardProps = {
  data: Data | { erro: string };
}

export default function Card({ data }: CardProps) {
  if ("erro" in data) {
    return (
      <Text style={styles.messageError}>
        Não foi encontrado o endereço do CEP :(
      </Text>
    )
  }

  return (
    <View style={styles.container}>
      <View style={[styles.row, { marginBottom: 16 }]}>
        <ItemCard align="left" title="localidade">
          { data.localidade }
        </ItemCard>
        <ItemCard align="right" title="bairro">
          { data.bairro }
        </ItemCard>
      </View>
      <View style={[styles.row, { marginBottom: 16 }]}>
        <ItemCard align="left" title="logradouro">
          { data.logradouro }
        </ItemCard>
        <ItemCard align="right" title="cep">
          { data.cep }
        </ItemCard>
      </View>
      <View style={[styles.row, { marginBottom: 16 }]}>
        <ItemCard align="left" title="uf">
          { data.uf }
        </ItemCard>
        <ItemCard align="right" title="complemento">
          { data.complemento }
        </ItemCard>
      </View>
      <View style={[styles.row, { marginBottom: 16 }]}>
        <ItemCard align="left" title="ddd">
          { data.ddd }
        </ItemCard>
        <ItemCard align="right" title="ibge">
          { data.ibge }
        </ItemCard>
      </View>
      <View style={styles.row}>
        <ItemCard align="left" title="gia">
          { data.gia }
        </ItemCard>
        <ItemCard align="right" title="siafi">
          { data.siafi }
        </ItemCard>
      </View>
    </View>
  )
}