import { storageKeys } from "@/utils/config";
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface UseTitleHeaderProps {
  projectName: string,
  clearProjectName: () => void,
  updateProjectName: (value: string) => void
}

const TitleHeaderContext = createContext<UseTitleHeaderProps>({} as UseTitleHeaderProps);

type ProviderProps = {
  children: ReactNode;
};

export const TitleHeaderProvider = ({ children }: ProviderProps) => {
  const [projectName, setProjectName] = useState<string>('');

  const updateProjectName = (newName: string) => {
    localStorage.setItem(storageKeys.projectName, newName);
    setProjectName(newName);
  };

  const clearProjectName = () => {
    localStorage.removeItem(storageKeys.projectName);
    setProjectName("");
  };

  useEffect(() => {
    const projectName = localStorage.getItem(storageKeys.projectName);
    if (projectName) {
      setProjectName(projectName);
    }
  }, []);

  return (
    <TitleHeaderContext.Provider value={{
      projectName,
      updateProjectName,
      clearProjectName
    }}>
      {children}
    </TitleHeaderContext.Provider>
  );
};

export const useTitleHeader = () => {
  const context = useContext(TitleHeaderContext);
  if (!context) {
    throw new Error('titleHeader must be used within a setTitleHeader');
  }
  return context;
};
