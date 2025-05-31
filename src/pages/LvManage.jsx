import React, { useEffect, useState } from "react";
import Button, { BUTTON_CANCEL } from "../components/Button";
import { LABELS } from "../constants/Labels";
import { LvMessages } from "../constants/Message";
import { useModal } from "../contexts/ModalContext";
import { ROUTES } from "../constants/routes";
import axios from "../api/axios";

const LvManage = () => {
  const { showDialog, showAlert, closeModal } = useModal();
  const [changeValue, setChangeValue] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [changeLineCount, setChangeLineCount] = useState(0);
  const [currentLineCount, setCurrentLineCount] = useState(0);

  const lvNumbers =[
    7654, 7654, 7654, 7654, 7654, 7654, 7654, 7654, 7654, 7654, 7654, 7654, 7654,
    7654, 7654, 7654, 7654, 7654, 7654, 7654, 7654, 7654, 7654, 7654, 7654, 7654,
    7654, 7654, 7654, 7654, 7654, 7654, 7654, 7654,
  ]

  useEffect(() => {
    const initData = lvNumbers.join("\n");
    setChangeValue(initData);
    setCurrentValue(initData);
    setChangeLineCount(lvNumbers.length);
    setCurrentLineCount(lvNumbers.length);

    // axios.get(ROUTES.LV).then(res=>{
    //   setChangeValue(res.data);
    //   setCurrentValue(res.data);
    //   setChangeLineCount(res.data.length);
    //   setCurrentLineCount(res.data.length);
    // })
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
        message: LvMessages.errorChange,
      });
      return;
    }

    showDialog({
      message: LvMessages.allChange,
      onConfirm: allChange,
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
    setTimeout(() => {
      showAlert({
        message: LvMessages.successChange,
      });
    }, 100);
  };

  return (
    <div className="lvBoxLayout">

      <div className="lvBox">
          <h4 className="page-title">{LABELS.STATION_CHANGE_NUMBER}</h4>
          <div className="tbl-list-top">
            <div className="top-button">
              <span className="total mr0">
                {LABELS.COUNT_RESULT(changeLineCount)}
              </span>
            </div>
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
      </div>

      <div className="lvBox">
        <h4 className="page-title">{LABELS.STATION_CURRENT_NUMBER}</h4>
        <div className="tbl-list-top">
          <div className="top-button">
            <span className="total mr0">
                {LABELS.COUNT_RESULT(currentLineCount)}
              </span>
          </div>
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
      <div className="lvBoxBottom">
        <span>{LvMessages.info1}</span>
        <span>{LvMessages.info2}</span>
        <span>{LvMessages.info3}</span>
      </div>
    </div>
  );
};

export default LvManage;
