// Core
import { 
  useState, 
  useCallback, 
  useEffect 
} from 'react';
import { Keyboard } from 'react-native';
import { useNetInfo } from "@react-native-community/netinfo";

// Components
import { StatusBar } from 'expo-status-bar';
import Container from './src/components/Container';
import Title from './src/components/Title';
import FieldSearch from './src/components/FieldSearch';
import Card from './src/components/Card';
import Message from './src/components/Message';

// Types
import Data from './src/types/Data';

// Services
import { cepService } from './src/services/cep.service';

// Utils
import StorageControl from './src/utils/StorageControl';
import colors from './src/styles/colors';

export default function App() {
  const [ valueCep, setValueCep ] = useState("");
  const [ loading, setLoading ] = useState(false);
  const [ data, setData ] = useState({} as Data | { erro: string });
  const [ statusResponse, setStatusResponse ] = useState(0);
  const [ hiddenCard, setHiddenCard ] = useState(false);
  const [ isNotCEPSaved, setIsNotCEPSaved ] = useState(false);
  const netInfo = useNetInfo();

  const handleInput = useCallback((value: string) => {
    if (value.length < 9) {
      const valueFormatted = value
        .replace(/( )+/g, "")
        .replace(/[a-z|A-Z]/, "");
  
        setValueCep(valueFormatted);
    }
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setIsNotCEPSaved(false);
      setLoading(true);

      const response = await cepService.getByCEPJSON(valueCep);

      if (response.status === 200) {
        StorageControl.set(response.data);
      }

      setData(response.data);
      setStatusResponse(response.status);
    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false);
    }
  }, [ valueCep ]);

  const getDataSavedStore = useCallback(async () => {
    setLoading(true);
    const listCEPS = await StorageControl.getListCEPS();

    const cepFound = listCEPS.filter(({ cep }) => {
      if (!cep) {
        return false;
      }

      const cepFormatted = cep.replace("-", "");

      return cepFormatted === valueCep;
    })[0];

    if (!cepFound) {
      setIsNotCEPSaved(true);
      setLoading(false);

      return;
    } else {
      setIsNotCEPSaved(false);
    }

    setData(cepFound);
    setStatusResponse(200);
    setLoading(false);
  }, [valueCep]);

  useEffect(() => {
    if (valueCep.length === 8) {
      if (!!netInfo.isConnected) {
        fetchData();
      } else {
        getDataSavedStore();
      }
    }
  }, [valueCep]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setHiddenCard(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setHiddenCard(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <Container>
      <StatusBar style="light"/>
      {
        valueCep.length === 8
        ||
        <Title>Digite o seu CEP</Title>
      }
      <FieldSearch
        value={valueCep}
        onChange={handleInput}
        loading={loading}
      />
      
      {
        statusResponse === 200 && !hiddenCard && !isNotCEPSaved
        &&
        <Card
          data={data}
        />
      }

      {
        statusResponse >= 500
        &&
        <Message color={colors.danger}>
          Por causa de problemas no servidor infelizmente não foi possível buscar os dados do CEP :( {"\n\n\n"}

          Tente novamente mais tarde
        </Message>
      }

      {
        isNotCEPSaved 
        &&
        <Message>
          CEP não foi encontrado entre os CEPs salvos no seu aplicativo
        </Message>
      }
    </Container>
  );
}

// && !netInfo.isConnected