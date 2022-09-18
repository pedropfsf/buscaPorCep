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
        <ItemCard align="left" title="Localidade">
          { data.localidade }
        </ItemCard>
        <ItemCard align="right" title="Bairro">
          { data.bairro }
        </ItemCard>
      </View>
      <View style={[styles.row, { marginBottom: 16 }]}>
        <ItemCard align="left" title="Logradouro">
          { data.logradouro }
        </ItemCard>
        <ItemCard align="right" title="CEP">
          { data.cep }
        </ItemCard>
      </View>
      <View style={[styles.row, { marginBottom: 16 }]}>
        <ItemCard align="left" title="UF">
          { data.uf }
        </ItemCard>
        <ItemCard align="right" title="Complemento">
          { data.complemento }
        </ItemCard>
      </View>
      <View style={[styles.row, { marginBottom: 16 }]}>
        <ItemCard align="left" title="DDD">
          { data.ddd }
        </ItemCard>
        <ItemCard align="right" title="IBGE">
          { data.ibge }
        </ItemCard>
      </View>
      <View style={styles.row}>
        <ItemCard align="left" title="GIA">
          { data.gia }
        </ItemCard>
        <ItemCard align="right" title="SIAFI">
          { data.siafi }
        </ItemCard>
      </View>
    </View>
  )
}