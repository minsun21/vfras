import React, { useEffect, useState, useRef } from "react";
import Button, { BUTTON_SEARCH } from "../components/Button";
import Input, { INPUT_SIZE_LG } from "../components/Input";
import Table from "../components/Table";
import { SOUND_SOURCE_COLUMNS } from "../config/DataConfig";
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
    search();
  }, []);

  const search = () => {
    axios
      .get(ROUTES.CONTENTS, {
        params: { [KEYS.KEYWORD]: keyword },
      })
      .then((res) => {
        const result = res.data.resultData;
        if (result.length === 0) {
          showAlert({
            message: InfoMessages.noSearchResult,
          });
          return;
        }
        tableRef.current?.clearSelection?.();
        setData(result);
      });
  };

  return (
    <>
      <Form className="search-box" onSubmit={search}>
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
                    type="number"
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
        pageSize={15}
        rowSelectionEnabled={false}
      />
    </>
  );
};

export default SoundSource;
