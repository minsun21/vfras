import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { profileFields } from "../config/FieldsConfig";
import { ROUTES } from "../constants/routes";
import { LABELS } from "../constants/Labels";
import axios from "../api/axios";
import { useSelector } from "react-redux";
import { KEYS } from "../constants/Keys";

const Profile = () => {
  const adminId = useSelector((state) => state.auth.user[KEYS.ADMIN_ID]);

  const navigate = useNavigate();

  const [data, setData] = useState({});

  useEffect(() => {
    axios.get(`${ROUTES.PROFILE}/${adminId}`).then((res) => {
      const resultData = res.data.resultData;
      // res.data =>{ key1: value1, key2: value2 } 형태여야 함
      console.log("res, res");
      // setData(prev => ({ ...prev, ...res.data }));
    });
  }, []);

  return (
    <div>
      <div>
        ddd
        <Button
          label={LABELS.EDIT}
          onClick={() => navigate(ROUTES.PROFILE_EDIT)}
        />
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
