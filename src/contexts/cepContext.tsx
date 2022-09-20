// Core
import { useContext, createContext, useState } from "react";

// Types
import Data from "../types/Data";

type CepContextProps = {
  data: Data | { erro: string },
  setData: React.Dispatch<React.SetStateAction<Data | { erro: string }>>;
  valueCep: string;
  setValueCep: React.Dispatch<React.SetStateAction<string>>,
}

const CepContext = createContext({} as CepContextProps);

type CepProviderProps = {
  children: JSX.Element | JSX.Element[];
}

export function CepProvider({ children }: CepProviderProps) {
  const [ valueCep, setValueCep ] = useState("");
  const [ data, setData ] = useState({} as Data | { erro: string });

  return (
    <CepContext.Provider 
      value={{
        data,
        setData,
        valueCep,
        setValueCep
      }}
    >
      { children }
    </CepContext.Provider>
  )
};

export function useCEP() {
  return useContext(CepContext);
}