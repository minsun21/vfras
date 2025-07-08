import { useSelector } from "react-redux";
import { PERMISSIONS } from "../constants/Permissions";
import SubscribersManageRead from "./SubscribersManageRead";
import SubscribersManageEdit from "./SubscribersManageEdit";

const SubscribersManage = () => {
  const permissions = useSelector((state) => state.auth.user?.permissions);

  return (
    <>
      {permissions.includes(PERMISSIONS.SUBS_U) ? <SubscribersManageEdit /> : <SubscribersManageRead />}
    </>
  );
};

export default SubscribersManage;
