// Core
import { useState, useEffect, useCallback } from 'react';

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

export default function ButtonMap({ onPress }: ButtonMapProps) {
  const { data } = useCEP();
  const [ isDisabled, setIsDisabled ] = useState(true);

  useEffect(() => {
    if ("latitude" in data && "longitude" in data) {
      if (!!data.latitude && !!data.longitude) {
        setIsDisabled(false);
      }
    }
  }, [JSON.stringify(data)]);

  const handlePress = useCallback(() => {
    if (!isDisabled) {
      onPress();
    }

  }, [isDisabled, onPress]);

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.container}>
        <Entypo 
          name="map" 
          size={40} 
          color={isDisabled ? `${colors.secondary}90` : colors.secondary}
        />
      </View>
    </Pressable>
  )
}