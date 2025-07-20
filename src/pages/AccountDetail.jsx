import { useSelector } from "react-redux";
import AccountEdit from "./AccountEdit";
import AccountRead from "./AccountRead";
import { PERMISSIONS } from "../constants/Permissions";

const AccountDetail = () => {
  const permissions = useSelector((state) => state.auth.user?.permissions);

  return (
    <>
      {permissions.includes(PERMISSIONS.ACCNT_U) ? <AccountEdit /> : <AccountRead />}
    </>
  );
};

export default AccountDetail;
