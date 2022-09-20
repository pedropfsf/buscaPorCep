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

type RegionProps = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

type MapProps = {
  visible: boolean;
}

const initialRegion = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function Map() {
  const [ region, setRegion ] = useState({} as RegionProps);
  const [ visible, setVisible ] = useState(false);
  const { data } = useCEP();

  if ("erro" in data) {
    return <View></View>
  }

  useEffect(() => {
    setRegion({
      latitude: Number(data?.latitude ?? 37.78825),
      longitude: Number(data?.longitude ?? -122.4324),
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
      <Pressable onPress={closeMap}>
        <AntDesign
          style={styles.buttonClose} 
          name="closecircle" 
          size={40} 
          color="black" 
        />
      </Pressable>
      <Modal 
        style={{ flex: 1 }} 
        transparent={true} 
        visible={visible}
        animationType="fade"
      >
        <MapView 
          style={{ flex: 1 }}
          initialRegion={initialRegion}
          region={region}
          onRegionChange={region => setRegion(region)}
        >
          <Marker
            coordinate={{
              latitude: Number(data?.latitude ?? 37.78825),
              longitude: Number(data?.longitude ?? -122.4324),
            }}
            title={data.cep}
            description={`${data.uf?.toUpperCase()} ${data.localidade} ${data.bairro} ${data.bairro} ${data.complemento}`}
          />
        </MapView>
      </Modal>
    </>
  )
}