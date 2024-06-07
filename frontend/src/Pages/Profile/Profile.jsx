import { useParams } from "react-router-dom";
import { useFetchData, useAuth } from "../../Hooks";

export const Profile = () => {
  const { userId } = useParams();
  const { token } = useAuth();
  const { data, loading, error } = useFetchData(
    true,
    `/api/user/${userId}`,
    "GET",
    null,
    token
  );

  console.log("received_data", data);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const { user } = data;

  return (
    <div>
      <h1>Profile</h1>
      {data && (
        <>
          <p>{user.username}</p>
          <p>{user.email}</p>
          <p>{user.displayName}</p>
        </>
      )}
    </div>
  );
};
