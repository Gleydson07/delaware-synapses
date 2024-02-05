import { EpicProps, findEpicsByFaseIdAndProjectId } from "@/api/epic";
import { PhaseProps, findPhasesByProjectId } from "@/api/phases";
import { cryptography } from "@/utils/cryptography";
import Menu from "./partials/Menu";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import Wrapper from "@/components/Wrapper";
import ErrorPage from "@/components/PageError";

export default function EpicDetails() {
  const [phases, setPhases] = useState<PhaseProps[]>([]);
  const [epics, setEpics] = useState<EpicProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const fetchData = async (decript: any) => {
    setIsLoading(true);
    const responsePhases = await findPhasesByProjectId(decript.uuid);

    if (responsePhases && responsePhases.length) {
      setPhases(responsePhases);

      const epicPromises = responsePhases.map(async (phase) => {
        const epics = await findEpicsByFaseIdAndProjectId(
          phase.phaseId,
          decript.uuid
        );
        return epics;
      });

      const allEpicsNested = await Promise.all(epicPromises);
      const allEpics = allEpicsNested.flat();

      if (allEpics && allEpics.length) {
        setEpics(allEpics as EpicProps[]);
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (!!slug) {
      const decrypt = slug && cryptography.decrypt(slug);
      slug && fetchData(decrypt);

      if (typeof slug !== "string") {
        router.push("/home");
        return;
      }
    }
  }, []);

  if (isLoading) return <Loading />;

  if (!phases || (!phases.length && !isLoading))
    return (
      <Wrapper>
        <ErrorPage />
      </Wrapper>
    );

  return <Menu token={slug} phases={phases} epics={epics} />
}
