import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import Button, {
  BUTTON_CANCEL,
  BUTTON_DELETE,
  BUTTON_SEARCH,
} from "../components/Button";
import Input, { INPUT_SIZE_LG } from "../components/Input";
import {
  account_manage_columns,
  account_manage_data,
} from "../config/DataConfig";
import { ROUTES } from "../constants/routes";
import {
  accountMessages,
  errorMessages,
  infoMessages,
} from "../constants/Message";
import { LABELS } from "../constants/Labels";
import { useModal } from "../contexts/ModalContext";

const AccountManage = () => {
  const navigate = useNavigate();
  const tableRef = useRef();
  const { showAlert, showDialog } = useModal();
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState(account_manage_data);

  const handleSave = () => {
    const updatedData = tableRef.current.getUpdatedData();
    console.log("최신 데이터:", updatedData);
  };

  const clickEdit = () => {
    if (selectedRows.length === 0) {
      showAlert({
        message: errorMessages.nonSelect,
      });
      return;
    }
    if (selectedRows.length > 1) {
      showAlert({
        message: errorMessages.oneSelect,
      });
      return;
    }

    navigate(ROUTES.ACCOUNT_EDIT, {
      state: {
        selectedId: selectedRows[0].id,
      },
    });
  };

  const search = () => {
    showAlert({
      message: infoMessages.noSearchResult,
    });
  };

  const clickDelete = () => {
    if (selectedRows.length === 0) {
      showAlert({
        message: errorMessages.nonSelect,
      });
      return;
    }

    showDialog({
      message: infoMessages.confirmDelete(selectedRows.length),
      onConfirm: deleteAccount,
    });
  };

  const deleteAccount = () => {
    console.log("delete");
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
                        placeholder={accountMessages.searchPlaceHolder}
                        size={INPUT_SIZE_LG}
                      />
                      <Button type={BUTTON_SEARCH} onClick={search} />
                      <Button
                        label={LABELS.USER_REGISTER}
                        onClick={() => navigate(ROUTES.ACCOUNT_REGISTER)}
                      />
                    
										</div>
								</td>
							</tr>
						</tbody>
					</table>
			</form>
      <form class="form">
				<div class="tbl-list-top mt20">
					<div class="top-button"> 
						<span class="total mr0"><span>{LABELS.SEARCH_RESULT(data.length)}</span></span> 
					</div>
				</div>
      </form>      

      <Table
        ref={tableRef}
        columns={account_manage_columns}
        data={data}
        pageSize={5}
        onRowSelectionChange={setSelectedRows}
      />

      <div class="btn-wrap">
        <div>
          <Button
          type={BUTTON_CANCEL}
          label={LABELS.USER_EDIT}
          onClick={clickEdit}
        />
        </div>
        <div>
          <Button type={BUTTON_DELETE} onClick={clickDelete} />
        </div>
      </div>

    </>
  );
};

export default AccountManage;
