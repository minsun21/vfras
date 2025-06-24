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
          padding: "25px 40px",
          backgroundColor: " rgba(255, 255, 255, 0.7)",
          borderRadius: "20px",
          boxShadow: "0 0 10px rgba(255, 255, 255, 0.32)",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        ⏳ loading ...
      </div>
    </div>
  );
};

export default Loader;
