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

const SoundSource = () => {
  const tableRef = useRef();
  const { showAlert } = useModal();
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    // axios
    setData(sounds_source_data);
  }, []);

  const search = () => {
    // axios
    showAlert({
      message: infoMessages.noSearchResult,
    });
  };

  return (
    <>
      <form class="search-box">
				<table class="tbl-input">
						<colgroup>
						</colgroup>
						{/*<thead>
							<tr>
								<th>
									<label class="schTxtL1">{LABELS.SEARCH}</label>
								</th>
							</tr>
						</thead>
            */}
						<tbody>
							<tr>
								<td>
									<div class="form-field dflex wrap gap10">
                    <Input
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
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
      <form class="form">
				<div class="tbl-list-top mt20">
					<div class="top-button"> 
						<span class="total mr0">{LABELS.SEARCH_RESULT(data.length)}</span> 
					</div>
				</div>
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
