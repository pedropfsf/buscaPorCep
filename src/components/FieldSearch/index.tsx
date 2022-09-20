// Core
import { 
  createRef, 
  useCallback, 
  useEffect, 
  useRef,
  useState
} from "react";

// Components
import { 
  View, 
  TextInput,
  Keyboard,
  ActivityIndicator,
  Pressable,
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

export default function FieldSearch({ 
  value, 
  onChange,
  loading = false
}: FieldSearchProps) {
  const input = createRef<TextInput>()
  const MILISECONDS = 500;
  const [ colorTheme, setColorTheme ] = useState(false);

  useEffect(() => {
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setColorTheme(false);
    });

    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setColorTheme(true);
    });

    return () => {
      hideSubscription.remove();
      showSubscription.remove();
    };
  }, []);

  const focusInput = useCallback(() => {
    if (input.current) {
      input.current.focus();
    }
  }, [input]);
 
  return (
    <Pressable style={{ width: "100%" }} onPress={focusInput}>
      <View style={[
        styles.container,
        {
          borderColor: colorTheme ? colors.emphasis : colors.secondary,
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
            <FontAwesome 
              name="search" 
              size={32} 
              color={colors.emphasis}
            />
          }
        </View>
        <TextInput
          ref={input}
          style={[
            styles.input,
            {color: colorTheme ? colors.emphasis : colors.secondary}
          ]}
          value={value}
          onChangeText={onChange}
          keyboardType="numeric"
        />
      </View>
    </Pressable>
  )
}