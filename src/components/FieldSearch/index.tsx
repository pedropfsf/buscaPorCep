// Core
import { useRef, useCallback } from "react";

// Components
import { 
  View, 
  TextInput,
  Animated 
} from "react-native";
import { FontAwesome } from '@expo/vector-icons';

// Styles
import styles from "./styles";
import colors from "../../styles/colors";

type FieldSearchProps = {
  value?: string;
  onChange?: ((text: string) => void) | undefined;
}

const FontAwesomeAnimated = Animated.createAnimatedComponent(FontAwesome);
const TextInputAnimated = Animated.createAnimatedComponent(TextInput);

export default function FieldSearch({ 
  value, 
  onChange, 
}: FieldSearchProps) {
  const colorTheme = useRef(new Animated.Value(0)).current
  const MILISECONDS = 500;

  const handleFocus = useCallback(() => {
    Animated.timing(colorTheme, {
      toValue: 1,
      duration: MILISECONDS,
      useNativeDriver: false
    }).start();

  }, [ colorTheme, MILISECONDS ]);

  const handleBlur = useCallback(() => {
    Animated.timing(colorTheme, {
      toValue: 0,
      duration: MILISECONDS,
      useNativeDriver: false
    }).start();

  }, [ colorTheme ]);

  function applyTheme() {
    return colorTheme.interpolate({
      inputRange: [ 0, 1 ],
      outputRange: [ colors.secondary, colors.emphasis ]
    });
  }
 
  return (
    <Animated.View style={[
      styles.container,
      {
        borderColor: applyTheme(),
      }
    ]}>
      <View>
        <FontAwesomeAnimated 
          name="search" 
          size={32} 
          color={colors.emphasis}
        />
      </View>
      <TextInputAnimated
        style={[
          styles.input,
          {
            color: applyTheme()
          }
        ]}
        value={value}
        onChangeText={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </Animated.View>
  )
}