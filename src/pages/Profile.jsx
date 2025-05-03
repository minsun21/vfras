import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { profileFields } from "../config/FieldsConfig";
import { ROUTES } from "../constants/routes";
import { LABELS } from "../constants/Labels";

const Profile = () => {
  
  const navigate = useNavigate();

  const [data, setData] = useState(() =>
    profileFields.reduce((acc, field) => {
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
        <Button label={LABELS.EDIT} onClick={() => navigate(ROUTES.PROFILE_EDIT)} />
      </div>
      <table className="info-table">
        <tbody>
          {profileFields.map((field) => (
            <tr key={field.key}>
              <td className="Labels">{field.label}</td>
              <td>{data[field.key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
