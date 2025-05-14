import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button, { BUTTON_SEARCH, BUTTON_CANCEL } from "../components/Button";
import Input, { INPUT_SIZE_LG } from "../components/Input";
import Select from "../components/Select";
import Table from "../components/Table";
import { ROUTES } from "../constants/routes";
import { subscribe_columns, subscribe_data } from "../config/DataConfig";
import {
  option_subsriberType,
  option_allType,
  option_serviceType,
  option_userState,
} from "../config/FieldsConfig";
import { LABELS } from "../constants/Labels";
import {
  errorMessages,
  infoMessages,
  subsriberMessages,
} from "../constants/Message";
import { useModal } from "../contexts/ModalContext";

const Subscriber = () => {
  const tableRef = useRef();
  const navigate = useNavigate();
  const { showAlert, showDialog } = useModal();

  const [searchInput, setSearchInput] = useState({});
  const [data, setData] = useState([]);
  const [allType, setAllType] = useState([]);
  const [subsriberTypeOptions, setsubsriberTypeOptions] = useState([]);
  const [serviceTypeOptions, setServiceTypeOptions] = useState([]);
  const [userStateOptions, setUserStateOptions] = useState([]);

  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    setAllType(option_allType);
    setsubsriberTypeOptions(option_subsriberType);
    setServiceTypeOptions(option_serviceType);
    setUserStateOptions(option_userState);

    setSearchInput({
      allType: option_allType[0],
      subsriberType: option_subsriberType[0],
      serviceType: option_serviceType[0],
      userState: option_userState[0],
    });

    setData(subscribe_data);
  }, []);

  const handleSave = () => {
    const updatedData = tableRef.current.getUpdatedData();
    console.log("최신 데이터:", updatedData);
  };

  const navigateManage = (row) => {
    navigate(ROUTES.SUBSCRIBER_MANAGE, {
      state: {
        selectedId: row.id,
      },
    });
  };

  const approvedSUBSCRIBER = () => {
    if (selectedRows.length === 0) {
      showAlert({
        message: errorMessages.nonSelect,
      });
      return;
    }

    // axios

    for (const selectedRow of selectedRows) {
      if (selectedRow.state === LABELS.SUBSCRIBE) {
        showAlert({
          message: subsriberMessages.approvedError,
        });
        return;
      }
    }

    const selectedIds = tableRef.current.getSelectedRowIds();

    tableRef.current.updateRowsById(selectedIds, (row) => ({
      ...row,
      state: LABELS.SUBSCRIBE,
    }));

    showAlert({
      message: infoMessages.successEdit,
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
    // showAlert({
    //   message: infoMessages.successDelete,
    // });
  };

  const search = () => {
    showAlert({
      message: infoMessages.noSearchResult,
    });
  };

  return (
    <div>
      <form class="search-box">
				<table class="tbl-input">
						<colgroup>
						</colgroup>
						<thead>
							<tr>
								<th>
									<label class="schTxtL1">{LABELS.CLASSIFICATION}</label>
								</th>
								<th>
									<label class="schTxtL1">{LABELS.SUBSCRIBER_TYPE}</label>
								</th>
								<th>
									<label class="schTxtL1">{LABELS.SERVICE_TYPE}</label>
								</th>
								<th>
									<label class="schTxtL1">{LABELS.SUBSCRIBER_STATE}</label>
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<div class="form-field dflex wrap gap10">
                    <div class="select-box">
                      <Select
                          value={searchInput.allType}
                          options={allType}
                          nonEmpty={true}
                        />  
                    </div>
                    <Input type="text" class="form-input" placeholder={subsriberMessages.searchPlaceHolder} /> 
                    <span><Button type={BUTTON_SEARCH} onClick={search} /></span>
										</div>
								</td>
								<td>
									<div class="select-box">
											<Select
                       // label={LABELS.SUBSCRIBER_TYPE}
                        value={searchInput.subsriberType}
                        options={subsriberTypeOptions}
                        nonEmpty={true}
                      />
										</div>
								</td>
								<td>
									<div class="select-box">
											 <Select
                        //  label={LABELS.SERVICE_TYPE}
                          value={searchInput.serviceType}
                          options={serviceTypeOptions}
                          nonEmpty={true}
                        />
										</div>
								</td>
								<td>
									<div class="select-box">
											 <Select
                        //  label={LABELS.SUBSCRIBER_STATE}
                          value={searchInput.userState}
                          options={userStateOptions}
                          nonEmpty={true}
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
						<span class="total mr0">총<b>99</b>건</span> 
						<span class="dline"></span>
						<span>
							<button type="button" class="sbtn scolor">승인</button>
							<button type="button" class="sbtn dark">삭제</button>
               <Button label={LABELS.APPROVE} onClick={approvedSUBSCRIBER} />
                <Button type={BUTTON_CANCEL} label={LABELS.DELETE} onClick={clickDelete} />
            </span>
					</div>
					<div class="top-button fRight">
						<div class="select-box">
							<select name="SelCount" id="SelCount">
								<option value="all">10개</option>
								<option value="all">30개</option>
								<option value="all">50개</option>
								<option value="all">100개</option>
							</select>
						</div>
					</div>
				</div>
      </form>      
      <Table
        ref={tableRef}
        columns={subscribe_columns(navigateManage)}
        data={data}
        pageSize={10}
        onRowSelectionChange={setSelectedRows}
      />
    </div>
  );
};

export default Subscriber;
