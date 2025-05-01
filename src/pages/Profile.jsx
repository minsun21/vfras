import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Pages.css";
import Button from "../components/Button";
import { profileFieldsConfig } from "../config/FieldsConfig";
import { ROUTES } from "../constants/routes";

const Profile = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(() =>
    profileFieldsConfig.reduce((acc, field) => {
      acc[field.key] = field.value || "";
      return acc;
    }, {})
  );

  useEffect(() => {
    // axios.get("/api/user/profile").then(res => {
    // res.data ==> { key1: value1, key2: value2 } 형태여야 함
    //   setData(prev => ({ ...prev, ...res.data }));
    // });
  }, []);

  return (
    <div>
      <div>
        <Button label="수정" onClick={() => navigate(ROUTES.PROFILE_EDIT)} />
      </div>
      <table className="info-table">
        <tbody>
          {profileFieldsConfig.map((field) => (
            <tr key={field.key}>
              <td className="label">{field.label}</td>
              <td>{data[field.key]}</td>{" "}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
