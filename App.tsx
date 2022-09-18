// Core
import { 
  useState, 
  useCallback, 
  useEffect 
} from 'react';
import { Keyboard } from 'react-native';

// Components
import { StatusBar } from 'expo-status-bar';
import Container from './src/components/Container';
import Title from './src/components/Title';
import FieldSearch from './src/components/FieldSearch';
import Card from './src/components/Card';
import MessageError from './src/components/MessageError';

// Types
import Data from './src/types/Data';

// Services
import { cepService } from './src/services/cep.service';

export default function App() {
  const [ valueCep, setValueCep ] = useState("");
  const [ loading, setLoading ] = useState(false);
  const [ data, setData ] = useState({} as Data | { erro: string });
  const [ statusResponse, setStatusResponse ] = useState(0);
  const [ hiddenCard, setHiddenCard ] = useState(false);

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
      setLoading(true);
      const response = await cepService.getByCEPJSON(valueCep);

      setData(response.data);
      setStatusResponse(response.status);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [ valueCep ]);

  useEffect(() => {
    if (valueCep.length === 8) {
      fetchData();
    }
  }, [valueCep]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setHiddenCard(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setHiddenCard(false);
    });

    return () => showSubscription.remove();
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
        statusResponse === 200 && !hiddenCard
        &&
        <Card
          data={data}
        />
      }

      {
        statusResponse >= 500
        &&
        <MessageError>
          Por causa de problemas no servidor infelizmente não foi possível buscar os dados do CEP :( {"\n\n\n"}

          Tente novamente mais tarde
        </MessageError>
      }
    </Container>
  );
}