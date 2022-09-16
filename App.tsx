// Core
import { 
  useState, 
  useCallback, 
  useEffect 
} from 'react';

// Components
import { StatusBar } from 'expo-status-bar';
import Container from './src/components/Container';
import Title from './src/components/Title';
import FieldSearch from './src/components/FieldSearch';

// Services
import { cepService } from './src/services/cep.service';

export default function App() {
  const [ valueCep, setValueCep ] = useState("");

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
      const response = await cepService.getByCEPJSON(valueCep);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
    
  }, []);

  useEffect(() => {
    if (valueCep.length === 8) {
      fetchData();
    }
  }, [valueCep]);

  return (
    <Container>
      <StatusBar style="light"/>
      <Title>Digite o seu CEP</Title>
      <FieldSearch
        value={valueCep}
        onChange={handleInput}
      />
    </Container>
  );
}