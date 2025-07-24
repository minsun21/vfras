import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ACCOUNTS_EDIT_FIELDS } from "../config/FieldsConfig";
import Input from "../components/Input";
import Select from "../components/Select";
import { ROUTES } from "../constants/routes";
import axios from "../api/axios";
import { KEYS } from "../constants/Keys";
import RadioGroup from "../components/RadioGroup";

const AccountRead = () => {
  const { state } = useLocation();
  const selectedId = state?.selectedInfo[KEYS.ADMIN_ID] || {};

  const [formData, setFormData] = useState({});

  useEffect(() => {
    // userid로 정보 검색
    if (!selectedId) return;
    initData();
  }, []);

  const initData = () => {
    axios.get(ROUTES.ACCOUNTS_MANAGE(selectedId), formData).then((res) => {
      const result = res.data.resultData;
      setFormData(result);
    });
  };

  return (
    <>
      <form className="tbl-view">
        <table>
          <colgroup>
            <col className="w250"></col>
            <col></col>
          </colgroup>
          <tbody>
            {ACCOUNTS_EDIT_FIELDS.map((field) => {
              const {
                key,
                label,
                type = "text",
                Options = [],
                required,
                comment,
              } = field;
              const value = formData[key] || "";

              return (
                <tr key={key}>
                  <th className="Labels">
                    {label}
                    {required && <em>*</em>}
                  </th>
                  <td className="value">
                    {type === "select" ? (
                      <Input
                        value={value}
                        type={type}
                        placeholder={formData[key]}
                        disabled
                      />
                    ) : type === "radio" ? (
                      <RadioGroup
                        name={key}
                        value={value}
                        Options={Options}
                      />
                    ) : comment ? (
                      <div className="rowBox">
                        <Input
                          value={value}
                          type={type}
                          placeholder={formData[key]}
                          disabled
                        />
                        <span className="comment">{comment}</span>
                      </div>
                    ) : // ) : key === KEYS.MOBILE ? (
                      //   <PhoneNumberInput value={value} onChange={handleChange} />
                      key === KEYS.PASSWORD2 ? (
                        <div className="rowBox">
                          <Input
                            value={value}
                            type={type}
                            placeholder={formData[key]}
                            disabled
                          />
                        </div>
                      ) : (
                        <Input
                          value={value}
                          type={type}
                          placeholder={formData[key]}
                          disabled
                        />
                      )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </form>
    </>
  );
};

export default AccountRead;
