// Core
import { useContext, createContext, useState } from "react";

type CepContextProps = {
  valueCep: string;
  setValueCep: React.Dispatch<React.SetStateAction<string>>,
}

const CepContext = createContext({} as CepContextProps);

type CepProviderProps = {
  children: JSX.Element | JSX.Element[];
}

export function CepProvider({ children }: CepProviderProps) {
  const [ valueCep, setValueCep ] = useState("");

  return (
    <CepContext.Provider 
      value={{
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