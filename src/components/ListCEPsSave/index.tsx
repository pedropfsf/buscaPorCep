// Core
import { 
  useState, 
  useCallback, 
  useEffect 
} from "react";

// Components
import { 
  View, 
  Text, 
  FlatList,
  ActivityIndicator,
  Pressable
} from "react-native";

// Utils
import StorageControl from "../../utils/StorageControl";

// Types
import Data from "../../types/Data";

// Styles
import styles from "./styles";
import colors from "../../styles/colors";

// Context
import { useCEP } from "../../contexts/cepContext";

type ListCEPsSaveProps = {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ListCEPsSave({ setIsOpenModal }: ListCEPsSaveProps) {
  const { setValueCep } = useCEP();
  const [ data, setData ] = useState([] as Data[]);
  const [ loading, setLoading ] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const saveCEPs = await StorageControl.getListCEPS();
  
      setData(saveCEPs);

    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false);
    }
  }, []);

  function selectCEP(cep: string) {
    return () => {
      setValueCep(cep);
      setIsOpenModal(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  
  if (loading) {
    return (
      <ActivityIndicator
        size={32}
        color={colors.secondary}
      />
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={data.filter(item => !!item.cep)}
        keyExtractor={(_item, index) => String(index)}
        renderItem={({ item, index }) => (
          <View style={styles.areaItem}>
            <Text style={styles.textItem} key={index}>
              { item.cep }
            </Text>
            <Pressable onPress={selectCEP(item.cep)}>
              <View style={styles.buttonShowCEP}>
                <Text style={styles.textButtonShowCEP}>
                  Olhar
                </Text>
              </View>
            </Pressable>
          </View>
        )}
      />
    </View>
  )
}