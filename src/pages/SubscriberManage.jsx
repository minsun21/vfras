import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button, { BUTTON_SEARCH, BUTTON_CANCEL } from "../components/Button";
import { LABELS } from "../constants/Label";
import Input from "../components/Input";
import { SUBSCRIBERManageFields } from "../config/FieldsConfig";
import { ROUTES } from "../constants/routes";

const SubscriberManage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [data, setData] = useState(() =>
    SUBSCRIBERManageFields.reduce((acc, field) => {
      acc[field.key] = field.value || "";
      return acc;
    }, {})
  );
  const [searchMainNumber, setSearchMainNumber] = useState("");

  useEffect(() => {
    // userid로 정보 검색
    console.log(state);

    const selectedId = state?.selectedId || [];
    // setInitData();
    // setFormData(() =>
    //   accountEditFields.reduce((acc, field) => {
    //     acc[field.key] = field.placeholder || "";
    //     return acc;
    //   }, {})
    // );
  }, [state]);

  return (
    <div>
      <div className="search-area">
        <div>
          <Input
            label={LABELS.MAIN_NUMBER}
            value={searchMainNumber}
            type="number"
            onChange={(e) => setSearchMainNumber(e.target.value)}
          />
          <Button type={BUTTON_SEARCH} />
        </div>
        <Button
          type={BUTTON_CANCEL}
          label={LABELS.SUBSCRIBE_EDIT}
          onClick={() => navigate(ROUTES.ACCOUNT_MANAGE_EDIT)}
        />
      </div>
      <table className="info-table">
        <tbody>
          {SUBSCRIBERManageFields.map((field) => {
            const { key, multi } = field;

            return (
              <tr key={field.key}>
                <td className="label">{field.label}</td>
                <td>
                  {key === "mainNumber" ? (
                    <div>
                      <span>{data[field.key]}</span>
                      <span>{LABELS.LV_NUMBER}</span>
                    </div>
                  ) : multi ? (
                    <div>
                      {field.fields.map((subField, idx) => (
                        <div key={subField.key}>
                          <span>{subField.value}</span>
                          {idx === 0 && <span>{"-"}</span>}
                        </div>
                      ))}
                    </div>
                  ) : (
                    data[field.key]
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SubscriberManage;
