import React, { useEffect, useState } from "react";

const Button = ({ type, title, handleClick }) => {
   
  const [content, setContent] = useState("");

  useEffect(() => {
    if (title) {
      setContent(content);
      return;
    }

    if (type === "confirm") {
      setContent("확인");
    } else if (type === "cancel") {
      setContent("취소");
    }
  }, [title, type]);

  return (
    <button className={`${type}`} onClick={handleClick}>
      {content}
    </button>
  );
};

export default Button;
