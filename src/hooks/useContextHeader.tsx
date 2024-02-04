// context/EscolhaContext.tsx
import { createContext, useContext, ReactNode, useState } from 'react';

type TitleHeaderProps = {
  textHeader: string;
  setTextHeader: (textHeader: string) => void;
};

const TextHeaderContext = createContext<TitleHeaderProps | undefined>(undefined);

type EscolhaProviderProps = {
  children: ReactNode;
};

export const TextHeaderProvider = ({ children }: EscolhaProviderProps) => {
  const [textHeader, setTextHeader] = useState<string>("");

  return (
    <TextHeaderContext.Provider value={{ textHeader, setTextHeader }}>
      {children}
    </TextHeaderContext.Provider>
  );
};

export const useTextHeader = () => {
  const context = useContext(TextHeaderContext);
  if (!context) {
    throw new Error('titleHeader must be used within a setTitleHeader');
  }
  return context;
};
