import React, { useEffect, useState, useRef } from "react";
import Button, { BUTTON_SEARCH } from "../components/Button";
import Input, { INPUT_SIZE_LG } from "../components/Input";
import Table from "../components/Table";
import {
  sounds_source_columns,
  sounds_source_data,
} from "../config/DataConfig";
import { LABELS } from "../constants/Labels";
import { infoMessages, soundSourceMessages } from "../constants/Message";
import { useModal } from "../contexts/ModalContext";
import { ROUTES } from "../constants/routes";
import axios from "../api/axios";

const SoundSource = () => {
  const tableRef = useRef();
  const { showAlert } = useModal();
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(sounds_source_data);
    // TODO :: 최초 로드는 전체 리스트 출력 하는지? , keywords를 빈값으로 보내면 되는건지?
    // axios.get(ROUTES.CONTENTS, keyword).then((res) => {
    //   if (res.data.length === 0) {
    //     showAlert({
    //       message: infoMessages.noSearchResult,
    //     });
    //     return;
    //   }
    //   setData(res.data);
    // });
  }, []);

  const search = () => {
    showAlert({
      message: infoMessages.noSearchResult,
    });
    // axios.get(ROUTES.CONTENTS, keyword).then((res) => {
    //   if (res.data.length === 0) {
    //     showAlert({
    //       message: infoMessages.noSearchResult,
    //     });
    //     return;
    //   }
    //   setData(res.data);
    // });
  };

  return (
    <>
      <form className="search-box" onSubmit={(e) => e.preventDefault()}>
        <table className="tbl-input">
          <colgroup></colgroup>
          <tbody>
            <tr>
              <td>
                <div className="form-field dflex wrap gap10">
                  <Input
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder={soundSourceMessages.searchPlaceHolder}
                    size={INPUT_SIZE_LG}
                  />
                  <Button type={BUTTON_SEARCH} onClick={search} />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <Table
        ref={tableRef}
        columns={sounds_source_columns}
        data={data}
        pageSize={10}
        rowSelectionEnabled={false}
      />
    </>
  );
};

export default SoundSource;
