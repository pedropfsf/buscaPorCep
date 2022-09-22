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
import Container from './components/Container';
import Title from './components/Title';
import FieldSearch from './components/FieldSearch';
import Card from './components/Card';
import Message from './components/Message';
import Header from './components/Header';


// Services
import { cepService } from './services/cep/cep.service';

// Utils
import StorageControl from './utils/StorageControl';
import Mask from './utils/Mark';

// Context
import { useCEP } from './contexts/cepContext';

export default function Core() {
  const { 
    valueCep, 
    setValueCep, 
    data, 
    setData 
  }  = useCEP();
  const [ loading, setLoading ] = useState(false);
  const [ statusResponse, setStatusResponse ] = useState(0);
  const [ hiddenCard, setHiddenCard ] = useState(false);
  const [ message, setMessage ] = useState("");
  const netInfo = useNetInfo();

  const handleInput = useCallback((value: string) => {
    if (value.length < 10) {
      const valueFormatted = Mask.CEP(value)
        
      setValueCep(valueFormatted);
    }
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const listCEPS = await StorageControl.getListCEPS();

      const cepFound = listCEPS.filter(({ cep }) => {
        if (!cep) {
          return false;
        }

        const cepFormatted = cep.replace("-", "");

        return cepFormatted === valueCep;
      })[0];

      if (!!cepFound) {
        setData(cepFound);
        setStatusResponse(200);
        setLoading(false);
        Keyboard.dismiss();

        return;
      }

      const responseCep = await cepService.getByCEPJSON(valueCep);

      if (responseCep.status === 500) {
        setMessage("Por causa de problemas no servidor infelizmente não foi possível buscar os dados do CEP :( \n\n\n Tente novamente mais tarde");
        setLoading(false);
        Keyboard.dismiss();
      }

      if (responseCep.status === 200) {
        StorageControl.set(responseCep?.data);
      }

      if ("erro" in responseCep.data) {
        setMessage("Não foi encontrado :(");
        setLoading(false);
        Keyboard.dismiss();

        return;
      }

      setData(responseCep?.data);
      setStatusResponse(responseCep.status);
      setMessage("");

    } catch (error) {
      setMessage("Falha ao buscar os dados do CEP");

    } finally {
      setLoading(false);
      Keyboard.dismiss();
    }
  }, [ valueCep ]);

  const getDataSavedStore = useCallback(async () => {
    setLoading(true);
    const listCEPS = await StorageControl.getListCEPS();

    const cepFound = listCEPS.filter(({ cep }) => {
      if (!cep) {
        return false;
      }

      return cep === valueCep;
    })[0];

    if (!cepFound) {
      setMessage("CEP não foi encontrado entre os CEPs salvos no seu aplicativo");
      setLoading(false);
      Keyboard.dismiss();

      return;
    }

    setData(cepFound);
    setStatusResponse(200);
    Keyboard.dismiss();
    setMessage("");
    setLoading(false);
  }, [valueCep, netInfo]);

  useEffect(() => {
    if (valueCep.replace(/[^1-9]/, "").length === 8) {
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
      <Header/>
      {
        valueCep.length === 9
        ||
        <Title>Digite um CEP</Title>
      }
      <FieldSearch
        value={Mask.CEP(valueCep)}
        onChange={handleInput}
        loading={loading}
      />
      
      {
        statusResponse === 200 && !hiddenCard && !message
        &&
        <Card
          data={data}
        />
      }

      {
        !!message
        &&
        <Message>
          { message }
        </Message>
      }
    </Container>
  );
}