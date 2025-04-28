import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Breadcrumb = () => {
  const items = useSelector((state) => state.breadcrumb);

  return (
    <nav>
      {items.map((item, index) => (
        <span key={index}>
          {item.name}
          {index < items.length - 1 && " > "}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
