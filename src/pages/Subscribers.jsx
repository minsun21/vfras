import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button, { BUTTON_SEARCH, BUTTON_DELETE } from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import Table from "../components/Table";
import { ROUTES } from "../constants/routes";
import {
  SUBSRIBES_COLUMNS,
  SUBSRIBES_COLUMNS_USER,
} from "../config/DataConfig";
import { LABELS } from "../constants/Labels";
import {
  ErrorMessages,
  InfoMessages,
  subsriberMessages,
} from "../constants/Message";
import { useModal } from "../contexts/ModalContext";
import { KEYS } from "../constants/Keys";
import {
  SEARCH_DIVISIONS,
  SEARCH_SERVICE_TYPES,
  SEARCH_SUBSRIBERS_STATE,
  SEARCH_SUBSRIBERS_TYPES,
} from "../config/OPTIONS";
import Form from "../components/Form";
import { findMappedValue } from "../utils/Util";
import { useSelector } from "react-redux";
import axios from "../api/axios";

const Subscriber = () => {
  const tableRef = useRef();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.user?.role);
  const { showAlert, showDialog } = useModal();

  const [searchInputs, setSearchInputs] = useState({});
  const [filterInputs, setFilterInputs] = useState({});
  const [data, setData] = useState([]);
  const [filterdData, setFilteredData] = useState([]);

  const [selectRows, setselectRows] = useState([]);

  useEffect(() => {
    setSearchInputs({
      [KEYS.SEARCH_DIVISION]: SEARCH_DIVISIONS[0].key,
      [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[0].key,
    });

    initFilterInputs();

    setData([
      {
        [KEYS.ADMIN_ID]: 1,
        [KEYS.ID]: 1,
        [KEYS.SUB_NO]: "0211183422",
        [KEYS.TEL_FROM_NO]: "211654222",
        [KEYS.TEL_TO_NO]: "021116662222",
        [KEYS.FROM_NO]: "02111125322",
        [KEYS.TO_NO]: "02111112533",
        [KEYS.USER_NUMBER]: "02114222222 ~ 025444233",
        [KEYS.PBX_NUMBER]: "021115334222 ~ 02134412233",
        [KEYS.NAME]: "홍길동",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[1].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[2].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[1].key,
      },
      {
        [KEYS.ADMIN_ID]: 2,
        [KEYS.ID]: 12,
        [KEYS.SUB_NO]: "0211123322",
        [KEYS.TEL_FROM_NO]: "0224312222",
        [KEYS.TEL_TO_NO]: "02111533222",
        [KEYS.FROM_NO]: "02111156662",
        [KEYS.TO_NO]: "02111124322",
        [KEYS.USER_NUMBER]: "02111000012222 ~ 02122222233",
        [KEYS.PBX_NUMBER]: "02115557222 ~ 021177772233",
        [KEYS.NAME]: "김철수",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[1].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[1].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[3].key,
      },
      {
        [KEYS.ADMIN_ID]: 3,
        [KEYS.ID]: 13,
        [KEYS.SUB_NO]: "0211835222",
        [KEYS.TEL_FROM_NO]: "02444112222",
        [KEYS.TEL_TO_NO]: "02153312222",
        [KEYS.FROM_NO]: "02111112662",
        [KEYS.TO_NO]: "02116442222",
        [KEYS.USER_NUMBER]: "021888822 ~ 021111555533",
        [KEYS.PBX_NUMBER]: "023333312222 ~ 02177777233",
        [KEYS.NAME]: "양관식",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[1].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[1].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[2].key,
      },
      {
        [KEYS.ADMIN_ID]: 4,
        [KEYS.SUB_NO]: "0211110062",
        [KEYS.TEL_FROM_NO]: "05551112222",
        [KEYS.TEL_TO_NO]: "02175412222",
        [KEYS.FROM_NO]: "02118452222",
        [KEYS.TO_NO]: "02111888222",
        [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.NAME]: "이선재",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[2].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[1].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[1].key,
      },
      {
        [KEYS.ADMIN_ID]: 5,
        [KEYS.SUB_NO]: "0211752222",
        [KEYS.TEL_FROM_NO]: "64411112222",
        [KEYS.TEL_TO_NO]: "02111344222",
        [KEYS.FROM_NO]: "02111999222",
        [KEYS.TO_NO]: "02544112222",
        [KEYS.USER_NUMBER]: "02111522222 ~ 0218888783",
        [KEYS.PBX_NUMBER]: "02111334422 ~ 02117555233",
        [KEYS.NAME]: "김혜윤",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[2].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[2].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[1].key,
      },
      {
        [KEYS.ADMIN_ID]: 6,
        [KEYS.SUB_NO]: "0219562222",
        [KEYS.TEL_FROM_NO]: "09881112222",
        [KEYS.TEL_TO_NO]: "67711112222",
        [KEYS.FROM_NO]: "025444112222",
        [KEYS.TO_NO]: "02112432222",
        [KEYS.USER_NUMBER]: "021152422 ~ 0211113123",
        [KEYS.PBX_NUMBER]: "02111533222 ~ 02114332233",
        [KEYS.NAME]: "이수혁",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[3].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[2].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[3].key,
      },
      {
        [KEYS.ADMIN_ID]: 7,
        [KEYS.SUB_NO]: "0211112222",
        [KEYS.TEL_FROM_NO]: "0211412222",
        [KEYS.TEL_TO_NO]: "021134432222",
        [KEYS.FROM_NO]: "02111433222",
        [KEYS.TO_NO]: "02111332222",
        [KEYS.USER_NUMBER]: "0216113222 ~ 0211422233",
        [KEYS.PBX_NUMBER]: "021546722 ~ 021115346233",
        [KEYS.NAME]: "변우섭",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: "삭제",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[1].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[1].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[1].key,
      },
      {
        [KEYS.ADMIN_ID]: 8,
        [KEYS.SUB_NO]: "0211245222",
        [KEYS.TEL_FROM_NO]: "0214333112222",
        [KEYS.TEL_TO_NO]: "021177772222",
        [KEYS.FROM_NO]: "021118888222",
        [KEYS.TO_NO]: "02111999922",
        [KEYS.USER_NUMBER]: "02162892222 ~ 02129w2233",
        [KEYS.PBX_NUMBER]: "0211138312222 ~ 0211171533",
        [KEYS.NAME]: "최수영",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: "가입",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[3].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[2].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[3].key,
      },
      {
        [KEYS.ADMIN_ID]: 5449,
        [KEYS.SUB_NO]: "02111444222",
        [KEYS.TEL_FROM_NO]: "0254112222",
        [KEYS.TEL_TO_NO]: "0214542222",
        [KEYS.FROM_NO]: "021533453222",
        [KEYS.TO_NO]: "0214512222",
        [KEYS.USER_NUMBER]: "021275512222 ~ 021537112233",
        [KEYS.PBX_NUMBER]: "0211164312222 ~ 021233233",
        [KEYS.NAME]: "김태연",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[2].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[1].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[1].key,
      },
      {
        [KEYS.ADMIN_ID]: 549,
        [KEYS.SUB_NO]: "0211197822",
        [KEYS.TEL_FROM_NO]: "021444112222",
        [KEYS.TEL_TO_NO]: "021333112222",
        [KEYS.FROM_NO]: "021111423422",
        [KEYS.TO_NO]: "021114232222",
        [KEYS.USER_NUMBER]: "021111544422 ~ 02111153333",
        [KEYS.PBX_NUMBER]: "021114444222 ~ 021111264433",
        [KEYS.NAME]: "구교환",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[2].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[1].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[1].key,
      },
      {
        [KEYS.ADMIN_ID]: 1429,
        [KEYS.SUB_NO]: "0211112222",
        [KEYS.TEL_FROM_NO]: "02111112222",
        [KEYS.TEL_TO_NO]: "02111112222",
        [KEYS.FROM_NO]: "02111112222",
        [KEYS.TO_NO]: "02111112222",
        [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.NAME]: "LGU+",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[1].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[1].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[1].key,
      },
      {
        [KEYS.ADMIN_ID]: 329,
        [KEYS.SUB_NO]: "0211116322",
        [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.NAME]: "이현서",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[1].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[1].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[1].key,
      },
      {
        [KEYS.ADMIN_ID]: 459,
        [KEYS.SUB_NO]: "0211873222",
        [KEYS.TEL_FROM_NO]: "02111112222",
        [KEYS.TEL_TO_NO]: "02111112222",
        [KEYS.FROM_NO]: "02111112222",
        [KEYS.TO_NO]: "02111112222",
        [KEYS.USER_NUMBER]: "0213332222 ~ 02544412233",
        [KEYS.PBX_NUMBER]: "02113442222 ~ 021142222233",
        [KEYS.NAME]: "성동일",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[1].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[1].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[2].key,
      },
      {
        [KEYS.ADMIN_ID]: 449,
        [KEYS.SUB_NO]: "0219162222",
        [KEYS.TEL_FROM_NO]: "02111112222",
        [KEYS.TEL_TO_NO]: "02111112222",
        [KEYS.FROM_NO]: "02111112222",
        [KEYS.TO_NO]: "02111112222",
        [KEYS.USER_NUMBER]: "02111432222 ~ 02115432233",
        [KEYS.PBX_NUMBER]: "021111344222 ~ 02177712233",
        [KEYS.NAME]: "라미란",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[3].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[1].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[1].key,
      },
      {
        [KEYS.ADMIN_ID]: 319,
        [KEYS.SUB_NO]: "0211119422",
        [KEYS.TEL_FROM_NO]: "02111112222",
        [KEYS.TEL_TO_NO]: "02111112222",
        [KEYS.FROM_NO]: "02111112222",
        [KEYS.TO_NO]: "02111112222",
        [KEYS.USER_NUMBER]: "02163312222 ~ 02117562233",
        [KEYS.PBX_NUMBER]: "02111444222 ~ 0211177833",
        [KEYS.NAME]: "이훈이",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[2].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[1].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[1].key,
      },
      {
        [KEYS.ADMIN_ID]: 219,
        [KEYS.SUB_NO]: "0211161322",
        [KEYS.TEL_FROM_NO]: "021766112222",
        [KEYS.TEL_TO_NO]: "021154412222",
        [KEYS.FROM_NO]: "021112222222",
        [KEYS.TO_NO]: "0211111438722",
        [KEYS.USER_NUMBER]: "02111243322 ~ 0265562233",
        [KEYS.PBX_NUMBER]: "021111175552 ~ 02175562233",
        [KEYS.NAME]: "설경구",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[2].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[1].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[3].key,
      },
      {
        [KEYS.ADMIN_ID]: 19,
        [KEYS.SUB_NO]: "0211890122",
        [KEYS.TEL_FROM_NO]: "07556672222",
        [KEYS.TEL_TO_NO]: "0211165222",
        [KEYS.FROM_NO]: "02111333222",
        [KEYS.TO_NO]: "02111112222",
        [KEYS.USER_NUMBER]: "0211422232 ~ 0211115444233",
        [KEYS.PBX_NUMBER]: "021114333222 ~ 021111666233",
        [KEYS.NAME]: "정해인",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[2].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[2].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[1].key,
      },
    ]);
  }, []);

  const initFilterInputs = () => {
    setFilterInputs({
      [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[0].key,
      [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[0].key,
      [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[0].key,
    });
  };

  const navigateManage = (row) => {
    navigate(ROUTES.SUBSCRIBERS_MANAGE, {
      state: {
        [KEYS.SUB_NO]: row[KEYS.SUB_NO],
        selectRow: {
          [KEYS.SUB_NO]: row[KEYS.SUB_NO],
          [KEYS.NAME]: row[KEYS.NAME],
          [KEYS.SUB_STATUS]: row[KEYS.SUB_STATUS],
          [KEYS.SUB_TYPE]: findMappedValue(
            SEARCH_SUBSRIBERS_TYPES,
            row[KEYS.SUB_TYPE]
          ),
          [KEYS.SERVICE_TYPE]: findMappedValue(
            SEARCH_SERVICE_TYPES,
            row[KEYS.SERVICE_TYPE]
          ),
          [KEYS.FROM_NO]: row[KEYS.FROM_NO],
          [KEYS.TO_NO]: row[KEYS.TO_NO],
          [KEYS.TEL_FROM_NO]: row[KEYS.TEL_FROM_NO],
          [KEYS.TEL_TO_NO]: row[KEYS.TEL_TO_NO],
        }, // TOBE :: 삭제
      },
    });
  };

  const approvedSub = () => {
    if (selectRows.length === 0) {
      showAlert({
        message: ErrorMessages.nonSelect,
      });
      return;
    }

    for (const selectedRow of selectRows) {
      if (selectedRow[KEYS.SUB_STATUS] !== SEARCH_SUBSRIBERS_STATE[1].key) {
        showAlert({
          message: subsriberMessages.approvedError,
        });
        return;
      }
    }

    // axios.put(ROUTES.SUBSCRIBERS_APPROVE, selectRows).then(res=>{
    //   const selectedIds = tableRef.current.getSelectedRowIds();
    //   tableRef.current.updateRowsById(selectedIds, (row) => ({
    //     ...row,
    //     state: LABELS.SUBSCRIBE,
    //   }));
    //   showAlert({
    //     message: InfoMessages.successEdit,
    //   });
    // })

    const selectedIds = tableRef.current.getSelectedRowIds();
    tableRef.current.updateRowsById(selectedIds, (row) => ({
      ...row,
      [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[2].key,
    }));
    showAlert({
      message: InfoMessages.successEdit,
    });
  };

  const clickDelete = () => {
    if (selectRows.length === 0) {
      showAlert({
        message: ErrorMessages.nonSelect,
      });
      return;
    }

    showDialog({
      message: InfoMessages.confirmDelete(selectRows.length),
      onConfirm: deleteAccount,
    });
  };

  const deleteAccount = () => {
    // axios.delete(ROUTES.SUBSCRIBERS, selectRows).then((res) => {
    //   showAlert({
    //     message: InfoMessages.successDelete,
    //   });
    // });

    const filteredData = data.filter(
      (item) =>
        !selectRows.some((r) => r[KEYS.ADMIN_ID] === item[KEYS.ADMIN_ID])
    );
    setData(filteredData);
    tableRef.current?.clearSelection();

    // closeModal();
    setTimeout(() => {
      showAlert({
        message: InfoMessages.successDelete,
      });
    }, 100);
  };

  const search = () => {
    initFilterInputs();

    // showAlert({
    //   message: InfoMessages.noSearchResult,
    // });

    setData([
      {
        [KEYS.ADMIN_ID]: 1,
        [KEYS.ID]: 1,
        [KEYS.SUB_NO]: "0211183422",
        [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.NAME]: "LGU+",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[1].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[2].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[1].key,
      },
      {
        [KEYS.ADMIN_ID]: 2,
        [KEYS.ID]: 12,
        [KEYS.SUB_NO]: "0211123322",
        [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.NAME]: "LGU+",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[1].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[1].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[3].key,
      },
      {
        [KEYS.ADMIN_ID]: 3,
        [KEYS.ID]: 13,
        [KEYS.SUB_NO]: "0211835222",
        [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.NAME]: "LGU+",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[1].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[1].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[2].key,
      },
      {
        [KEYS.ADMIN_ID]: 4,
        [KEYS.SUB_NO]: "0211110062",
        [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.NAME]: "LGU+",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[2].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[1].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[1].key,
      },
      {
        [KEYS.ADMIN_ID]: 5,
        [KEYS.SUB_NO]: "0211752222",
        [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.NAME]: "LGU+",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[2].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[2].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[1].key,
      },
      {
        [KEYS.ADMIN_ID]: 6,
        [KEYS.SUB_NO]: "0219562222",
        [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.NAME]: "LGU+",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[3].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[2].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[3].key,
      },
      {
        [KEYS.ADMIN_ID]: 7,
        [KEYS.SUB_NO]: "0211112222",
        [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.NAME]: "LGU+",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: "삭제",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[1].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[1].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[1].key,
      },
      {
        [KEYS.ADMIN_ID]: 8,
        [KEYS.SUB_NO]: "0211245222",
        [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.NAME]: "LGU+",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: "가입",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[3].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[2].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[3].key,
      },
      {
        [KEYS.ADMIN_ID]: 5449,
        [KEYS.SUB_NO]: "0211112222",
        [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.NAME]: "LGU+",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[2].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[1].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[1].key,
      },
      {
        [KEYS.ADMIN_ID]: 549,
        [KEYS.SUB_NO]: "0211197822",
        [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.NAME]: "LGU+",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[2].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[1].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[1].key,
      },
      {
        [KEYS.ADMIN_ID]: 1429,
        [KEYS.SUB_NO]: "0211112222",
        [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.NAME]: "LGU+",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[1].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[1].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[1].key,
      },
      {
        [KEYS.ADMIN_ID]: 329,
        [KEYS.SUB_NO]: "0211116322",
        [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.NAME]: "LGU+",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[1].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[1].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[1].key,
      },
      {
        [KEYS.ADMIN_ID]: 459,
        [KEYS.SUB_NO]: "0211873222",
        [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.NAME]: "LGU+",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[1].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[1].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[2].key,
      },
      {
        [KEYS.ADMIN_ID]: 449,
        [KEYS.SUB_NO]: "0219162222",
        [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.NAME]: "LGU+",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[3].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[1].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[1].key,
      },
      {
        [KEYS.ADMIN_ID]: 319,
        [KEYS.SUB_NO]: "0211119422",
        [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.NAME]: "LGU+",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[2].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[1].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[1].key,
      },
      {
        [KEYS.ADMIN_ID]: 219,
        [KEYS.SUB_NO]: "0211161322",
        [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.NAME]: "LGU+",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[2].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[1].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[3].key,
      },
      {
        [KEYS.ADMIN_ID]: 19,
        [KEYS.SUB_NO]: "0211890122",
        [KEYS.USER_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.PBX_NUMBER]: "02111112222 ~ 0211112233",
        [KEYS.NAME]: "LGU+",
        [KEYS.APPLY_DATE]: "2024.02.04",
        [KEYS.SUB_STATUS]: SEARCH_SUBSRIBERS_STATE[2].key,
        [KEYS.SUB_TYPE]: SEARCH_SUBSRIBERS_TYPES[2].key,
        [KEYS.SERVICE_TYPE]: SEARCH_SERVICE_TYPES[1].key,
      },
    ]);

    // axios.post(ROUTES.ACCOUNTS, searchInputs).then((res) => {
    //   if (res.data.length === 0) {
    //     showAlert({
    //       message: InfoMessages.noSearchResult,
    //     });
    //     return;
    //   }
    //   setData(res.data);
    // });
  };

  const topBtns = () => {
    if (role !== KEYS.ADMIN) return null;
    return (
      <>
        <Button label={LABELS.APPROVE} onClick={approvedSub} />
        <Button type={BUTTON_DELETE} onClick={clickDelete} />
      </>
    );
  };

  const onChange = (e) => {
    setSearchInputs({
      ...searchInputs,
      [e.target.name]: e.target.value,
    });
  };

  const filterData = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setFilterInputs((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  useEffect(() => {
    const filtered = data.filter((item) => {
      return Object.entries(filterInputs).every(([key, val]) => {
        if (!val) return true;
        return item[key] === val;
      });
    });

    setFilteredData(filtered);
  }, [filterInputs, data]);

  return (
    <div>
     {/* 
      <button onClick={() => axios.get("https://httpstat.us/200?sleep=1000")}>
        임시 로딩
      </button>
      <button className="ml20"
        onClick={async () => {
          try {
            await axios.get("https://httpstat.us/401");
          } catch (e) {
            // 에러는 인터셉터에서 처리하므로 아무것도 하지 않음
          }
        }}
      >
        임시 세션종료
      </button>
      */}
      <Form className="search-box">
        <table className="tbl-input">
          <thead>
            <tr>
              <th>
                <label className="schTxtL1">{LABELS.DIVISION_SEARCH}</label>
              </th>
              <th>
                <label className="schTxtL1">{LABELS.SUBSCRIBER_TYPE}</label>
              </th>
              <th>
                <label className="schTxtL1">{LABELS.SERVICE_TYPE}</label>
              </th>
              <th>
                <label className="schTxtL1">{LABELS.SUBSCRIBER_STATE}</label>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="form-field dflex wrap gap10">
                  <Select
                    value={searchInputs[KEYS.SEARCH_DIVISION]}
                    options={SEARCH_DIVISIONS}
                    nonEmpty={true}
                    name={KEYS.SEARCH_DIVISION}
                    onChange={onChange}
                  />
                  <Input
                    type="text"
                    className="form-input"
                    name={KEYS.SEARCH_DIVISION_VALUE}
                    value={searchInputs[KEYS.SEARCH_DIVISION_VALUE] || ""}
                    placeholder={subsriberMessages.searchPlaceHolder}
                    onChange={onChange}
                  />
                  <span>
                    <Button type={BUTTON_SEARCH} onClick={search} />
                  </span>
                </div>
              </td>
              <td>
                <Select
                  value={filterInputs[KEYS.SUB_TYPE]}
                  options={SEARCH_SUBSRIBERS_TYPES}
                  nonEmpty={true}
                  name={KEYS.SUB_TYPE}
                  onChange={filterData}
                />
              </td>
              <td>
                <Select
                  value={filterInputs[KEYS.SERVICE_TYPE]}
                  options={SEARCH_SERVICE_TYPES}
                  nonEmpty={true}
                  name={KEYS.SERVICE_TYPE}
                  onChange={filterData}
                />
              </td>
              <td>
                <Select
                  value={filterInputs[KEYS.SUB_STATUS]}
                  options={SEARCH_SUBSRIBERS_STATE}
                  nonEmpty={true}
                  name={KEYS.SUB_STATUS}
                  onChange={filterData}
                />
              </td>
              <td>
                <Button onClick={initFilterInputs} label={LABELS.RESET} />
              </td>
            </tr>
          </tbody>
        </table>
      </Form>
      <Table
        ref={tableRef}
        columns={
          role === KEYS.ADMIN
            ? SUBSRIBES_COLUMNS(navigateManage)
            : SUBSRIBES_COLUMNS_USER
        }
        data={filterdData}
        setTableData={setFilteredData}
        pageSize={10}
        onRowSelectionChange={setselectRows}
        topBtns={topBtns}
      />
    </div>
  );
};

export default Subscriber;
