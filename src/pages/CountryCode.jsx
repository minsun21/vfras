import React, { useEffect, useState } from "react";
import Button, { BUTTON_CANCEL } from "../components/Button";
import { LABELS } from "../constants/Label";
import { countryNumbers } from "../config/FieldsConfig";
import { countryNumberMessage } from "../constants/Message";
import { useModal } from "../contexts/ModalContext";

const CountryCode = () => {
  const { showDialog, showAlert, closeModal } = useModal();
  const [changeValue, setChangeValue] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [changeLineCount, setChangeLineCount] = useState(0);
  const [currentLineCount, setCurrentLineCount] = useState(0);

  useEffect(() => {
    const initData = countryNumbers.join("\n");
    setChangeValue(initData);
    setCurrentValue(initData);
    setChangeLineCount(countryNumbers.length);
    setCurrentLineCount(countryNumbers.length);
  }, []);

  const handleChange = (e) => {
    const input = e.target.value;

    const lines = input
      .split("\n")
      .map((line) => line.replace(/[^0-9]/g, "").slice(0, 4));

    setChangeValue(lines.join("\n"));

    // 빈 줄 제거한 기준으로 줄 수 계산
    const nonEmptyLineCount = lines.filter((line) => line !== "").length;
    setChangeLineCount(nonEmptyLineCount);
  };

  const validation = () => {
    const lines = changeValue
      .split("\n")
      .map((line) => line.replace(/[^0-9]/g, "").trim())
      .filter((line) => line !== ""); // 빈 줄 제거

    return !lines.some((line) => line.length < 4);
  };

  const clickAllChange = () => {
    if (!validation()) {
      showAlert({
        message: countryNumberMessage.errorChange,
      });
      return;
    }

    showDialog({
      message: countryNumberMessage.allChange,
      onConfirm: (allChange),
    });
  };

  const allChange = () => {
    const cleanedLines = changeValue
      .split("\n")
      .map((line) => line.trim()) // 공백 제거
      .filter((line) => line !== ""); // 빈 줄 제거

    const result = cleanedLines.join("\n");

    setChangeValue(result);
    setCurrentValue(result);
    setChangeLineCount(cleanedLines.length);
    setCurrentLineCount(cleanedLines.length);

    // 안되면 닫고 alert날려
    closeModal();

    // 성공
    showAlert({
      message: countryNumberMessage.successChange,
    });
  };

  return (
    <div>
      <div>
        <h5>{LABELS.STATION_CHANGE_NUMBER}</h5>
        <div>
          <span>{LABELS.COUNT_RESULT(changeLineCount)}</span>
          <Button
            type={BUTTON_CANCEL}
            label={LABELS.ALL_CHANGE}
            onClick={clickAllChange}
          />
        </div>
        <textarea
          value={changeValue}
          onChange={handleChange}
          type="number"
          rows={5}
          cols={5}
        />
        <div>
          <span>{countryNumberMessage.info1}</span>
          <span>{countryNumberMessage.info2}</span>
          <span>{countryNumberMessage.info3}</span>
        </div>
      </div>
      <div>
        <h5>{LABELS.STATION_CURRENT_NUMBER}</h5>
        <div>
          <span>{LABELS.COUNT_RESULT(currentLineCount)}</span>
          <Button type={BUTTON_CANCEL} label={LABELS.VIEW} />
        </div>
        <textarea
          value={currentValue}
          onChange={handleChange}
          type="number"
          rows={5}
          cols={5}
        />
      </div>
    </div>
  );
};

export default CountryCode;
