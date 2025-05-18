import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button, { BUTTON_SEARCH, BUTTON_CANCEL } from "../components/Button";
import { LABELS } from "../constants/Labels";
import Input from "../components/Input";
import { subsriberManageFields } from "../config/FieldsConfig";
import { ROUTES } from "../constants/routes";
import { useModal } from "../contexts/ModalContext";
import { infoMessages } from "../constants/Message";

const SubscriberManage = () => {
  const navigate = useNavigate();
  const { showAlert } = useModal();
  const { state } = useLocation();

  const [data, setData] = useState(() =>
    subsriberManageFields.reduce((acc, field) => {
      acc[field.key] = field.value || "";
      return acc;
    }, {})
  );
  const [searchMainNumber, setSearchMainNumber] = useState("");

  useEffect(() => {
    // userid로 정보 검색

    const selectedId = state?.selectedId || [];
    // setInitData();
    // setFormData(() =>
    //   accountEditFields.reduce((acc, field) => {
    //     acc[field.key] = field.placeholder || "";
    //     return acc;
    //   }, {})
    // );
  }, [state]);

  const search = () => {
    showAlert({
      message: infoMessages.noSearchResult,
    });
  };

  return (
    <>
      <form className="search-box" onSubmit={(e) => e.preventDefault()}>
				<table className="tbl-input">
						<colgroup>
						</colgroup>
						<thead>
							<tr>
								<th>
									<label className="schTxtL1">{LABELS.MAIN_NUMBER}</label>
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<div className="form-field dflex wrap gap10">
                     <Input
                      //  label={LABELS.MAIN_NUMBER}
                        className="form-input"
                        value={searchMainNumber}
                        type="number"
                        onChange={(e) => setSearchMainNumber(e.target.value)}
                      />
                      <Button type={BUTTON_SEARCH} onClick={search} />
                      <Button
                        type={BUTTON_CANCEL}
                        label={LABELS.SUBSCRIBE_EDIT}
                        onClick={() => navigate(ROUTES.ACCOUNTS_EDIT)}
                      />
										</div>
								</td>
							</tr>
						</tbody>
					</table>
			</form>
      <form className="tbl-view">
				<table>
          <colgroup>
							<col className="w250"></col>
              <col></col>
					</colgroup>
          <tbody>
            {subsriberManageFields.map((field) => {
              const { key, multi } = field;

              return (
                <tr key={field.key}>
                  <th className="Labels">{field.label}</th>
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
      </form>
    </>
  );
};

export default SubscriberManage;
