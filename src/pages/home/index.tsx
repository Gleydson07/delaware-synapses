import { HomeProjectsContainer } from "./styles";
import ErrorPage from "@/components/PageError";
import Wrapper from "@/components/Wrapper";
import Card from "@/components/Card";
import Loading from "@/components/Loading";
import { ClientProps, useHome } from "./useHome";

export default function Home() {
  const { isLoading, projects, handleSelectionProject } = useHome()

  if (isLoading) return (<Loading />)
  if (!projects || !projects.length && !isLoading) return (<Wrapper><ErrorPage /></Wrapper>)

  return (
    <Wrapper>
      {projects.map((project: ClientProps) => (
        <HomeProjectsContainer key={project.clientId}>
          <h2 className="home-projects-title">{project.name}</h2>
          <div className="home-projects-grid">
            {project.projectList.map(
              (list) =>
                list.isActive && (
                  <Card
                    onClick={() => handleSelectionProject(
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
      ))}
    </Wrapper>
  )
}
