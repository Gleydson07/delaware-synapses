import Header from "@/components/Header";
import { HomeProjectsContainer } from "./styles";
import ErrorPage from "@/components/PageError";
import Wrapper from "@/components/Wrapper";
import Card from "@/components/Card";
import { getProjects } from "@/api/projects";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

type ProjectProps = {
  projectId: number;
  projectUuid: string;
  name: string
  isActive: boolean;
}

type ClientProps = {
  clientId: number;
  clientUuid: string;
  isActive: boolean;
  name: string;
  projectList: ProjectProps[];
}

export default function Home() {
  const [projects, setProjects] = useState<ClientProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadProjects = async () => {
    setIsLoading(true);
    const data = await getProjects();
    setIsLoading(false);
    setProjects(data);
  }

  useEffect(() => {
    loadProjects();
  }, []);

  if (isLoading) {
    return (
      <>
        <Header />
        <Loading/>
      </>
    )
  }

  if (!projects || !projects.length) {
    return (
      <>
        <Header />
        <Wrapper>
          <ErrorPage />
        </Wrapper>
      </>
    )
  }

  return (
    <>
      <Header />
      <Wrapper>
        {projects && Array.isArray(projects) ? (
          projects.map((project: ClientProps) => (
            <HomeProjectsContainer key={project.clientId}>
              <h2 className="home-projects-title">{project.name}</h2>
              <div className="home-projects-grid">
                {project.projectList.map((list) => (
                  list.isActive && <Card
                    key={list.projectUuid}
                    headerTitle={`${project.name} - ${list.name}`}
                    link={`/control-center/${list.projectUuid}`}
                    title={list.name}
                  />
                ))}
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
