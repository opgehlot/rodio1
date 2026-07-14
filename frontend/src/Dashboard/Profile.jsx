import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div className="mt-15 ">
      <h2>Profile</h2>
        <p>Role : {user?.role}</p>
      <p>Name :welcome to  {user?.name}</p>
      <p>Email : {user?.email}</p>
      <p>Mobile : {user?.mobile}</p>
      <p>Role : {user?.role}</p>
    </div>
  );
}

export default Profile;