import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button, { BUTTON_SEARCH, BUTTON_CANCEL } from "../components/Button";
import Input, { INPUT_SIZE_LG } from "../components/Input";
import Select from "../components/Select";
import { LABELS } from "../constants/Label";

const SubscriberManage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [formData, setFormData] = useState({});
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
            onChange={(e) => setSearchMainNumber(e.target.value)}
          />
          <Button type={BUTTON_SEARCH} />
        </div>
        <Button type={BUTTON_CANCEL} label={LABELS.SUBSRIBE_EDIT} />
      </div>
    </div>
  );
};

export default SubscriberManage;
