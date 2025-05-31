import { useSelector } from "react-redux";

const Loader = () => {
  const loading = useSelector((state) => state.loading);

  if (!loading) return null;

  return (
    <div
      className="loader"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          padding: "20px 30px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        ⏳ 로딩 중...
      </div>
    </div>
  );
};

export default Loader;
