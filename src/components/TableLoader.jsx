import { useSelector } from "react-redux";

const TableLoader = () => {
  const loading = useSelector((state) => state.loading);

  if (!loading) return null;

  return (
    <div
      className="table-loading-overlay"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(255,255,255,0.6)",
        zIndex: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          padding: "20px 40px",
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        ⏳ 불러오는 중...
      </div>
    </div>
  );
};

export default TableLoader;
