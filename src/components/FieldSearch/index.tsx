// Core
import { useRef, useCallback, useEffect } from "react";

// Components
import { 
  View, 
  TextInput,
  Animated,
  Keyboard,
  ActivityIndicator
} from "react-native";
import { FontAwesome } from '@expo/vector-icons';

// Styles
import styles from "./styles";
import colors from "../../styles/colors";

type FieldSearchProps = {
  value?: string;
  onChange?: ((text: string) => void) | undefined;
  loading?: boolean;
}

const FontAwesomeAnimated = Animated.createAnimatedComponent(FontAwesome);
const TextInputAnimated = Animated.createAnimatedComponent(TextInput);

export default function FieldSearch({ 
  value, 
  onChange,
  loading = false
}: FieldSearchProps) {
  const colorTheme = useRef(new Animated.Value(0)).current
  const MILISECONDS = 500;

  useEffect(() => {
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(colorTheme, {
        toValue: 0,
        duration: MILISECONDS,
        useNativeDriver: false
      }).start();
    });

    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      Animated.timing(colorTheme, {
        toValue: 1,
        duration: MILISECONDS,
        useNativeDriver: false
      }).start();
    });

    return () => {
      hideSubscription.remove();
      showSubscription.remove();
    };
  }, []);

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
        {
          loading
          ?
          <ActivityIndicator
            size={32}
            color={colors.emphasis}
          />
          :
          <FontAwesomeAnimated 
            name="search" 
            size={32} 
            color={colors.emphasis}
          />
        }
      </View>
      <TextInputAnimated
        style={[
          styles.input,
          {color: applyTheme()}
        ]}
        value={value}
        onChangeText={onChange}
      />
    </Animated.View>
  )
}