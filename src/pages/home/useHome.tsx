import { getProjects } from "@/api/projects";
import { useTitleHeader } from "@/hooks/useHeader";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type ProjectProps = {
  projectId: number;
  projectUuid: string;
  name: string;
  isActive: boolean;
};

export type ClientProps = {
  clientId: number;
  clientUuid: string;
  isActive: boolean;
  name: string;
  projectList: ProjectProps[];
};

export const useHome = () => {
  const router = useRouter();
  const [projects, setProjects] = useState<ClientProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { updateProjectName, clearProjectName } = useTitleHeader();

  const loadProjects = async () => {
    setIsLoading(true);
    const data = await getProjects();
    setIsLoading(false);
    setProjects(data);
  };

  const handleSelectionProject = (name: string, uuid: string) => {
    updateProjectName(name);
    router.push(`/control-center/${uuid}`)
  };

  useEffect(() => {
    clearProjectName();
    loadProjects();
  }, []);

  return {
    isLoading,
    projects,
    handleSelectionProject
  }
}
