import { useState } from 'react';

interface useTitleHeaderProps {
  projectName: string,
  updateProjectName: (value: string) => void
}

export default function useTitleHeader(): useTitleHeaderProps {
  const [projectName, setProjectName] = useState<string>('');

  const updateProjectName = (newName: string) => {
    setProjectName(newName);
    // localstorage tambem
  };

  return {
    projectName,
    updateProjectName,
  };
};
