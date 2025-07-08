import { useSelector } from "react-redux";
import ProfileRead from "./ProfileRead";
import ProfileEdit from "./ProfileEdit";
import { PERMISSIONS } from "../constants/Permissions";

const Prfoile = () => {
  const permissions = useSelector((state) => state.auth.user?.permissions);

  return (
    <>
      {permissions.includes(PERMISSIONS.MY_U) ? <ProfileEdit /> : <ProfileRead />}
    </>
  );
};

export default Prfoile;
