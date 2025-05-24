import React, { useEffect, useState, useRef } from "react";
import Button, { BUTTON_SEARCH } from "../components/Button";
import Input, { INPUT_SIZE_LG } from "../components/Input";
import Table from "../components/Table";
import {
  SOUND_SOURCE_COLUMNS,
  sounds_source_columns,
} from "../config/DataConfig";
import { InfoMessages, SoundSourceMessages } from "../constants/Message";
import { useModal } from "../contexts/ModalContext";
import { ROUTES } from "../constants/routes";
import axios from "../api/axios";
import { KEYS } from "../constants/Keys";
import Form from "../components/Form";

const SoundSource = () => {
  const tableRef = useRef();
  const { showAlert } = useModal();
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([
      {
        [KEYS.RBT_ID]: 3820472,
        [KEYS.DESCRIPT]: "편지",
      },
      {
        [KEYS.RBT_ID]: 1234523,
        [KEYS.DESCRIPT]: "모르시나요",
      },
      {
        [KEYS.RBT_ID]: 3457435,
        [KEYS.DESCRIPT]: "가끔 니가 생각나",
      },
      {
        [KEYS.RBT_ID]: 2653455,
        [KEYS.DESCRIPT]: "Period",
      },
      {
        [KEYS.RBT_ID]: 2477854,
        [KEYS.DESCRIPT]: "Again",
      },
      {
        [KEYS.RBT_ID]: 6799556,
        [KEYS.DESCRIPT]: "화",
      },
      {
        [KEYS.RBT_ID]: 8576833,
        [KEYS.DESCRIPT]: "슈퍼노바",
      },
      {
        [KEYS.RBT_ID]: 5799336,
        [KEYS.DESCRIPT]: "레블하트",
      },
      {
        [KEYS.RBT_ID]: 583594,
        [KEYS.DESCRIPT]: "Forever",
      },
      {
        [KEYS.RBT_ID]: 16690345,
        [KEYS.DESCRIPT]: "Like Water",
      },
    ]);
    // TODO :: 최초 로드는 전체 리스트 출력 하는지? , keywords를 빈값으로 보내면 되는건지?
    // axios.get(ROUTES.CONTENTS, keyword).then((res) => {
    //   if (res.data.length === 0) {
    //     showAlert({
    //       message: InfoMessages.noSearchResult,
    //     });
    //     return;
    //   }
    //   setData(res.data);
    // });
  }, []);

  const search = () => {
    showAlert({
      message: InfoMessages.noSearchResult,
    });
    // axios.get(ROUTES.CONTENTS, keyword).then((res) => {
    //   if (res.data.length === 0) {
    //     showAlert({
    //       message: InfoMessages.noSearchResult,
    //     });
    //     return;
    //   }
    //   setData(res.data);
    // });
  };

  return (
    <>
      <Form
        className="search-box"
        onSubmit={search}
      >
        <table className="tbl-input">
          <colgroup></colgroup>
          <tbody>
            <tr>
              <td>
                <div className="form-field dflex wrap gap10">
                  <Input
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder={SoundSourceMessages.searchPlaceHolder}
                    size={INPUT_SIZE_LG}
                  />
                  <Button type={BUTTON_SEARCH} onClick={search} />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </Form>
      <Table
        ref={tableRef}
        columns={SOUND_SOURCE_COLUMNS}
        data={data}
        pageSize={10}
        rowSelectionEnabled={false}
      />
    </>
  );
};

export default SoundSource;
