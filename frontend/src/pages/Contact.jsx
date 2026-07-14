import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h2>Profile</h2>

      <p>Name : {user?.name}</p>
      <p>Email : {user?.email}</p>
      <p>Mobile : {user?.mobile}</p>
      <p>Role : {user?.role}</p>
    </div>
  );
}

export default Profile;