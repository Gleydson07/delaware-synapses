import { fetchUserStoriesData } from "@/api/userHistory";
import { useEffect, useState } from "react";
import Tasks from "./Tasks";

export default function Users({featureId, decrypted }: any) {
  const [users, setUsers] = useState<any>([]);

  const fetchData = async () => {
    if (featureId) {
      const users = await getUserStorysForAllFeature(featureId);
      setUsers(users);
    }
  };

  const getUserStorysForAllFeature = async (featureId: number) => {
    const responseUserStories = await fetchUserStoriesData(
      featureId,
      decrypted.uuid
    );

    return responseUserStories;
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!users) {
    return null;
  }

  return (
    <>
      {users?.map((user: any) => (
        <Tasks key={user.almId} user={user} decrypted={decrypted} />
      ))}
    </>
  );
}