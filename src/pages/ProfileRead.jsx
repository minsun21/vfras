import { useState, useEffect } from "react";
import { PROFILE_EDIT_FIELDS } from "../config/FieldsConfig";
import Input from "../components/Input";
import { ROUTES } from "../constants/routes";
import {
  ProfileMessages,
} from "../constants/Message";
import axios from "../api/axios";
import { KEYS } from "../constants/Keys";
import { useSelector } from "react-redux";
import Form from "../components/Form";

const ProfileRead = () => {
  const adminId = useSelector((state) => state.auth.user[KEYS.ADMIN_ID]);

  const [formData, setFormData] = useState({});

  useEffect(() => {
    initData();
  }, []);

  const initData = () => {
    axios.get(`${ROUTES.PROFILE}/${adminId}`).then((res) => {
      const result = res.data.resultData;
      setFormData(result);
    });
  };

  return (
    <>
      <span>{ProfileMessages.info1}</span>
      <Form className="tbl-view">
        <table>
          <colgroup>
            <col className="w250"></col>
            <col></col>
          </colgroup>
          <tbody>
            {PROFILE_EDIT_FIELDS.map((field) => {
              const { key, type } = field;

              const value = formData[key] || "";

              return (
                <tr key={key}>
                  <th className="Labels">
                    <label>{field.label}</label>
                  </th>
                  <td className="value">
                    {key === KEYS.PASSWORD ? (
                      <div className="rowBox">
                        <Input
                          size="nm"
                          type={type}
                          disabled
                        />
                      </div>
                    ) : (
                      <>
                        <Input
                          value={value}
                          type={field.type}
                          placeholder={formData[key]}
                          disabled
                        />
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Form>
    </>
  );
};

export default ProfileRead;
