import React from "react";
import Input from "../Input";
import { DID_ADD_FIELDS } from "../../config/FieldsConfig";
import { useDispatch, useSelector } from "react-redux";
import { setDidFormData } from "../../features/didAddSlice";
import { KEYS } from "../../constants/Keys";

const AddDidModal = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.didAdd);

  return (
    <div className="tbl-list btNo">
      <table>
        <colgroup>
          <col className="w250"></col>
          <col></col>
        </colgroup>
        <tbody>
          {DID_ADD_FIELDS.map((field, idx) => {
            const { label, type = "text", required, size, fields, key } = field;

            const handleChange = (e) => {
              const value = e.target.value;
              dispatch(setDidFormData({ key, value }));
            };

            const handleSubChange = (key, value) => {
              dispatch(setDidFormData({ key, value }));
            };

            return (
              <tr key={idx}>
                <th className="Labels" required={required}>
                  {label}
                </th>
                <td className="value">
                  {fields ? (
                    <div className="dflex">
                      {fields.map((subField, idx) => (
                        <div key={subField.key} className="rowBox">
                          <Input
                            size="sm"
                            type={subField.type}
                            value={formData[subField.key]}
                            onChange={(e) =>
                              handleSubChange(subField.key, e.target.value)
                            }
                          />
                          {idx === 0 && (
                            <span className="dashCenter">{"-"}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Input
                      type={type}
                      value={formData[key]}
                      onChange={handleChange}
                      size={size}
                    />
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

export default AddDidModal;
