// Core
import { useState, useEffect, useCallback } from "react";

// Components
import { Modal, Pressable, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import ButtonMap from "../ButtonMap";
import { AntDesign } from '@expo/vector-icons';

// Context
import { useCEP } from "../../contexts/cepContext";

// Styles
import styles from "./styles";
import colors from "../../styles/colors";

type RegionProps = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const initialRegion = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function Map() {
  const [ region, setRegion ] = useState(initialRegion as RegionProps);
  const [ visible, setVisible ] = useState(false);
  const { data } = useCEP();

  if ("erro" in data) {
    return <View style={{ position: "absolute" }}></View>
  }

  useEffect(() => {
    setRegion({
      latitude: data?.latitude ? Number(data?.latitude) : 37.78825,
      longitude: data?.longitude ? Number(data?.longitude) : -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  }, [JSON.stringify(data)]);

  const openMap = useCallback(() => {
    setVisible(true);
  }, []);

  const closeMap = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <>
      <ButtonMap onPress={openMap}/>
      <Modal 
        style={{ flex: 1 }} 
        transparent={true} 
        visible={visible}
        animationType="fade"
      >
        <MapView 
          style={{ flex: 1 }}
          initialRegion={region}
          onRegionChange={region => setRegion(region)}
        >
          <Marker
            coordinate={{
              latitude: data?.latitude ? Number(data?.latitude) : 37.78825,
              longitude: data?.longitude ? Number(data?.longitude) : -122.4324,
            }}
            title={data.cep}
            description={`${data.uf?.toUpperCase()} ${data.localidade} ${data.bairro} ${data.complemento}`}
          />
        </MapView>
        <Pressable 
          style={styles.buttonClose} 
          onPress={closeMap}
        >
          <AntDesign
            name="closecircle" 
            size={40} 
            color={colors.danger} 
          />
        </Pressable>
      </Modal>
    </>
  )
}