// Core
import { useState, useEffect, useCallback } from 'react';
import { useNetInfo } from "@react-native-community/netinfo";

// Components
import { View, Pressable } from 'react-native';
import { Entypo } from '@expo/vector-icons';

// Styles
import styles from "./styles";
import colors from '../../styles/colors';

// Context
import { useCEP } from "../../contexts/cepContext";

type ButtonMapProps = {
  onPress: () => void;
}

const MILISECONDS = 400;
let timerShowMap: NodeJS.Timeout

export default function ButtonMap({ onPress }: ButtonMapProps) {
  const { data } = useCEP();
  const [ isDisabled, setIsDisabled ] = useState(true);
  const [ colorButtonShow, setColorButtonShow ] = useState(colors.secondary);
  const netInfo = useNetInfo();

  useEffect(() => {
    if ("latitude" in data && "longitude" in data) {
      if (!!data.latitude && !!data.longitude && netInfo.isConnected) {
        setIsDisabled(false);
      }
    }
  }, [JSON.stringify(data)]);

  const handlePress = useCallback(() => {
    pressInteraction();

    if (!isDisabled) {
      onPress();
    }

  }, [isDisabled, onPress]);

  const pressInteraction = useCallback(() => {
    setColorButtonShow(`${colors.secondary}90`);
    clearTimeout(timerShowMap);
    timerShowMap = setTimeout(() => {
      setColorButtonShow(colors.secondary);
    }, MILISECONDS);

  }, [MILISECONDS]);

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.container}>
        <Entypo 
          name="map" 
          size={40} 
          color={isDisabled ? `${colors.secondary}90` : colorButtonShow}
        />
      </View>
    </Pressable>
  )
}