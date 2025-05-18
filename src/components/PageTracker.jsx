import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const PageTracker = () => {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user); // 예시: 리덕스에 저장된 ID

  useEffect(() => {
    if (!user) return; 

    // const logVisit = async () => {
    //   try {
    //     await axios.post("/api/page-log", {
    //       userId,
    //       path: location.pathname,
    //       timestamp: new Date().toISOString(),
    //     });
    //   } catch (error) {
    //     console.error("📛 방문 이력 전송 실패:", error);
    //   }
    // };

    // logVisit();
  }, [location.pathname, user]);

  return null;
};

export default PageTracker;
