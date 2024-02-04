import { HomeProjectsContainer } from "./styles";
import ErrorPage from "@/components/PageError";
import Wrapper from "@/components/Wrapper";
import Card from "@/components/Card";
import { getProjects } from "@/api/projects";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import { useTitleHeader } from "@/hooks/useHeader";

type ProjectProps = {
  projectId: number;
  projectUuid: string;
  name: string;
  isActive: boolean;
};

type ClientProps = {
  clientId: number;
  clientUuid: string;
  isActive: boolean;
  name: string;
  projectList: ProjectProps[];
};

export default function Home() {
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

  const handleChangeProject = (name: string, uuid: string) => {
    updateProjectName(name);
    router.push(`/control-center/${uuid}`)
  };

  useEffect(() => {
    clearProjectName();
    loadProjects();
  }, []);

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (!projects || !projects.length) {
    return (
      <>
        <Wrapper>
          <ErrorPage />
        </Wrapper>
      </>
    );
  }

  return (
    <>
      <Wrapper>
        {projects && Array.isArray(projects) ? (
          projects.map((project: ClientProps) => (
            <HomeProjectsContainer key={project.clientId}>
              <h2 className="home-projects-title">{project.name}</h2>
              <div className="home-projects-grid">
                {project.projectList.map(
                  (list) =>
                    list.isActive && (
                      <Card
                        onClick={() => handleChangeProject(
                          `${project.name} - ${list.name}`,
                          list.projectUuid
                        )}
                        key={list.projectUuid}
                        title={list.name}
                      />
                    )
                )}
              </div>
            </HomeProjectsContainer>
          ))
        ) : (
          <ErrorPage />
        )}
      </Wrapper>
    </>
  );
}
