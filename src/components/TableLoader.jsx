import { useSelector } from "react-redux";

const TableLoader = () => {
  const loading = useSelector((state) => state.loading);

  if (!loading) return null;

  return (
    <div className="tblLoaderBox">
      <div className="spinner"></div>
    </div>
  );
};

export default TableLoader;
