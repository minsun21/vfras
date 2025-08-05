import React, {
  useEffect,
  useState,
  useMemo,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { LABELS } from "../constants/Labels";
import Form from "./Form";
import Select from "./Select";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "../features/loadingSlice";
import TableLoader from "./TableLoader";

const Table = forwardRef(
  (
    {
      columns,
      data: tableData,
      setTableData,
      pageSize = 10,
      rowSelectionEnabled = true,
      rowClickSelect = false,
      onRowSelectionChange,
      onCheckboxSelectionChange,
      showIndex = true,
      resultLabel = true,
      pageSelect = true,
      topBtns,
      paginationEnabled = true,
      manualPagination = false,
      fetchData,
      maxHeight,
      scrollRef,
      newRowRef,
    },
    ref
  ) => {
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.loading);
    const [clickSelection, setClickSelection] = useState({});
    const [checkboxSelection, setCheckboxSelection] = useState({});
    const [currentPageSize, setCurrentPageSize] = useState(pageSize);
    const [pageInfo, setPageInfo] = useState({
      pageIndex: 0,
      pageSize: 10,
      totalPages: 0,
      totalElements: 0,
    });
    const triggerFetchRef = useRef(false);
    const isSplit = rowClickSelect === true;

    useEffect(() => {
      if (manualPagination) {
        triggerFetchRef.current = true;
        setPageInfo((prev) => ({
          ...prev,
          pageSize: currentPageSize,
          pageIndex: 0,
        }));
      } else {
        table.setPageSize(currentPageSize);
      }
    }, [currentPageSize, manualPagination]);

    useEffect(() => {
      if (manualPagination && typeof fetchData === "function") {
        dispatch(startLoading());
        fetchData(pageInfo.pageIndex, pageInfo.pageSize)
          .then((res) => {
            const resultData = res.data.resultData;
            setTableData(resultData.subscribers || []);
            setPageInfo((prev) => ({
              ...prev,
              totalPages: resultData.totalPages,
              totalElements: resultData.totalElements,
            }));
          })
          .finally(() => {
            dispatch(stopLoading());
            triggerFetchRef.current = false;
          });
      }
    }, [pageInfo.pageIndex, pageInfo.pageSize]);

    useImperativeHandle(ref, () => ({
      triggerFetch: (page = 0, size = 15) => {
        triggerFetchRef.current = true;
        setPageInfo({
          pageIndex: page,
          pageSize: size,
          totalPages: 0,
          totalElements: 0,
        });
      },
      getUpdatedData: () => tableData,
      getSelectedRowIds: () =>
        table.getSelectedRowModel().rows.map((r) => r.original.id),
      updateRowsById: (ids, updater) => {
        const updated = tableData.map((row) =>
          ids.includes(row.id || row.subNo) ? updater(row) : row
        );
        setTableData(updated);
      },
      clearSelection: () => {
        setClickSelection({});
        setCheckboxSelection({});
      },
    }), [tableData]);


    const handleCheckBox = (row) => {
      const newSelection = {
        ...(isSplit ? checkboxSelection : { ...checkboxSelection }),
        [row.id]: !checkboxSelection[row.id],
      };
      setCheckboxSelection(newSelection);
      if (!isSplit && typeof onRowSelectionChange === "function") {
        const rows = table
          .getCoreRowModel()
          .rows.filter((r) => newSelection[r.id])
          .map((r) => r.original);
        onRowSelectionChange(rows);
      } else if (isSplit && typeof onCheckboxSelectionChange === "function") {
        const rows = table
          .getCoreRowModel()
          .rows.filter((r) => newSelection[r.id])
          .map((r) => r.original);
        onCheckboxSelectionChange(rows);
      }
    };

    const processedColumns = useMemo(() => {
      const enhanceColumns = (cols) =>
        cols.map((col) => {
          if (col.columns) {
            return { ...col, columns: enhanceColumns(col.columns) };
          }

          if (col.type?.startsWith("check")) {
            const columnId = col.accessorKey;
            return {
              ...col,
              cell: ({ row }) => (
                <input
                  type="checkbox"
                  className="check-style"
                  checked={!!row.original[columnId]}
                  onChange={() => {
                    const updated = tableData.map((r) =>
                      r === row.original
                        ? { ...r, [columnId]: !r[columnId] }
                        : r
                    );
                    setTableData(updated);
                  }}
                />
              ),
            };
          }

          if (typeof col.clickable === "function") {
            return {
              ...col,
              cell: ({ row, getValue }) => (
                <span
                  className="col-clickable"
                  onClick={(e) => {
                    e.stopPropagation();
                    col.clickable({
                      row,
                      value: getValue(),
                      columnId: col.accessorKey,
                    });
                  }}
                >
                  {getValue()}
                </span>
              ),
            };
          }

          return col;
        });

      return enhanceColumns(columns);
    }, [columns, tableData]);

    const table = useReactTable({
      data: tableData,
      columns: [
        ...(rowSelectionEnabled
          ? [
            {
              id: "select",
              header: () => <></>,
              cell: ({ row }) => (
                <input
                  type="checkbox"
                  checked={checkboxSelection[row.id] || false}
                  onChange={() => handleCheckBox(row)}
                  onClick={(e) => e.stopPropagation()}
                />
              ),
            },
          ]
          : []),
        ...(showIndex
          ? [
            {
              accessorKey: "rowIndex",
              header: LABELS.INDEX,
              cell: ({ row }) => row.index + 1,
            },
          ]
          : []),
        ...processedColumns,
      ],
      state: isSplit ? { rowSelection: clickSelection } : {},
      onRowSelectionChange: isSplit
        ? (updater) => {
          const next =
            typeof updater === "function" ? updater(clickSelection) : updater;
          const single = Object.keys(next).length
            ? { [Object.keys(next)[0]]: true }
            : {};
          setClickSelection(single);
        }
        : undefined,
      getCoreRowModel: getCoreRowModel(),
      ...(paginationEnabled
        ? { getPaginationRowModel: getPaginationRowModel() }
        : {}),
      enableRowSelection: isSplit,
    });


    useEffect(() => {
      const selectedIds = Object.keys(clickSelection).filter(
        (id) => clickSelection[id]
      );
      const selectedRows = table
        .getCoreRowModel()
        .rows.filter((r) => selectedIds.includes(r.id))
        .map((r) => r.original);

      if (isSplit && typeof onRowSelectionChange === "function") {
        onRowSelectionChange(selectedRows);
      }
    }, [clickSelection]);

    const handleAllCheckbox = () => {
      const allSelected = table
        .getCoreRowModel()
        .rows.every((r) => checkboxSelection[r.id]);
      const newSelection = {};
      table.getCoreRowModel().rows.forEach((row) => {
        newSelection[row.id] = !allSelected;
      });
      setCheckboxSelection(newSelection);

      const selectedRows = table
        .getCoreRowModel()
        .rows.filter((r) => newSelection[r.id])
        .map((r) => r.original);

      if (isSplit && typeof onCheckboxSelectionChange === "function") {
        onCheckboxSelectionChange(selectedRows);
      } else if (!isSplit && typeof onRowSelectionChange === "function") {
        onRowSelectionChange(selectedRows);
      }
    };

    useEffect(() => {
      if (paginationEnabled) {
        table.setPageSize(currentPageSize);
      }
    }, [currentPageSize, table, paginationEnabled]);

    const pageCount = table.getPageCount();
    const pageIndex = table.getState().pagination.pageIndex;
    const pageNumbers = Array.from({ length: pageCount }, (_, i) => i);


    const renderPageNumbers = () => {
      const currentIndex = pageInfo.pageIndex;
      const totalPages = pageInfo.totalPages;
      const maxVisible = 10;
      const half = Math.floor(maxVisible / 2);

      let start = currentIndex - half;
      let end = currentIndex + half;

      // 범위 보정
      if (start < 0) {
        end += -start;
        start = 0;
      }
      if (end > totalPages) {
        start -= end - totalPages;
        end = totalPages;
      }
      if (start < 0) start = 0;

      const buttons = [];
      for (let i = start; i < end; i++) {
        buttons.push(
          <li key={i}>
            <button
              className={i === currentIndex ? "active" : ""}
              onClick={() => setPageInfo({ ...pageInfo, pageIndex: i })}
              disabled={isLoading}
            >
              {i + 1}
            </button>
          </li>
        );
      }

      return buttons;
    };


    const renderCell = (cell) => {
      const rendered = flexRender(
        cell.column.columnDef.cell,
        cell.getContext()
      );
      if (typeof rendered === "string") {
        return rendered.split("\n").map((line, i) => <div key={i}>{line}</div>);
      }
      return <div>{rendered}</div>;
    };

    const renderMultiLine = (value) => {
      if (typeof value !== "string") return value;
      return value.split("\n").map((line, i) => <div key={i}>{line}</div>);
    };


    const pageSizeOptions = useMemo(() => {
      const baseSizes = [10, 30, 50, 100];
      const totalCount = manualPagination ? pageInfo.totalElements : tableData.length;

      if (!totalCount) return baseSizes;

      const nextRounded = Math.ceil(totalCount / 10) * 10;

      const options = baseSizes.filter((n) => n <= nextRounded && n <= 100);

      if (nextRounded <= 100 && !options.includes(nextRounded)) {
        options.push(nextRounded);
      }

      return [...new Set(options)].sort((a, b) => a - b);
    }, [manualPagination, pageInfo.totalElements, tableData.length]);

    return (
      <>
        <Form className="form">
          <div className="tbl-list-top">
            <div className="top-button">
              {resultLabel && (
                <span className="total mr0">
                  {LABELS.SEARCH_RESULT(manualPagination ? pageInfo.totalElements : tableData.length)}
                </span>
              )}
              {topBtns && <span>{topBtns()}</span>}
            </div>
            {pageSelect && (
              <div className="top-button fRight">
                <div className="select-box">
                  <Select
                    Options={pageSizeOptions.map((n) => ({ key: n, value: n }))}
                    nonEmpty={true}
                    value={currentPageSize}
                    onChange={(e) => setCurrentPageSize(Number(e.target.value))}
                  />
                </div>
              </div>
            )}
          </div>
        </Form>
        {isLoading && <TableLoader />}
        <div
          className="tbl-list"
          ref={scrollRef}
          style={
            maxHeight
              ? { maxHeight: `${maxHeight}px`, overflowY: "auto", position: "relative" }
              : { overflowY: "visible", position: "relative" }}
        >
          <table style={{ pointerEvents: isLoading ? "none" : "auto", opacity: isLoading ? 0.5 : 1 }}>
            <thead>
              <tr>
                {rowSelectionEnabled && (
                  <th rowSpan={2}>
                    <input
                      type="checkbox"
                      onChange={handleAllCheckbox}
                      checked={
                        table.getCoreRowModel().rows.length > 0 &&
                        table
                          .getCoreRowModel()
                          .rows.every((r) => checkboxSelection[r.id])
                      }
                      ref={(input) => {
                        if (input) {
                          const all = table.getCoreRowModel().rows;
                          const someSelected = all.some(
                            (r) => checkboxSelection[r.id]
                          );
                          const allSelected = all.every(
                            (r) => checkboxSelection[r.id]
                          );
                          input.indeterminate = someSelected && !allSelected;
                        }
                      }}
                    />
                  </th>
                )}
                {showIndex && <th rowSpan={2} >{LABELS.INDEX}</th>}
                {columns.map((col, idx) =>
                  col.columns ? (
                    <th key={idx} colSpan={col.columns.length}>
                      {renderMultiLine(col.header)}
                    </th>
                  ) : (
                    <th key={idx} rowSpan={2}>
                      {renderMultiLine(col.header)}
                    </th>
                  )
                )}
              </tr>
              <tr>
                {columns.flatMap((col, idx) =>
                  col.columns
                    ? col.columns.map((sub, j) => (
                      <th key={`sub-${idx}-${j}`}>{sub.header}</th>
                    ))
                    : []
                )}
              </tr>
            </thead>
            <tbody>
              {(paginationEnabled
                ? table.getRowModel().rows
                : table.getPrePaginationRowModel().rows
              ).map((row) => (
                <tr
                  key={row.id}
                  ref={row.original?._isNew ? newRowRef : null}
                  className={
                    isSplit
                      ? clickSelection[row.id]
                        ? "selected"
                        : ""
                      : checkboxSelection[row.id]
                        ? "selected"
                        : ""
                  }
                  onClick={(e) => {
                    if (row.original._isNew) return;
                    if (e.target.tagName === "INPUT") return;

                    if (isSplit) {
                      setClickSelection((prev) => {
                        const isAlreadySelected = prev[row.id];
                        if (isAlreadySelected) {
                          const newSelection = { ...prev };
                          delete newSelection[row.id];
                          return newSelection;
                        } else {
                          return { [row.id]: true };
                        }
                      });
                    } else {
                      handleCheckBox(row);
                    }
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>{renderCell(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div >
        {paginationEnabled && (
          <div className="paging"
            style={{
              pointerEvents: isLoading ? "none" : "auto",
              opacity: isLoading ? 0.5 : 1,
            }}
          >
            <ul key={manualPagination ? pageInfo.pageIndex : pageIndex}>
              <li className="first">
                <button
                  onClick={() => {
                    if (manualPagination) {
                      setPageInfo({ ...pageInfo, pageIndex: 0 });
                    } else {
                      table.setPageIndex(0);
                    }
                  }}
                  disabled={manualPagination ? pageInfo.pageIndex === 0 : !table.getCanPreviousPage()}
                ></button>
              </li>
              <li className="prev">
                <button
                  onClick={() => {
                    if (manualPagination) {
                      setPageInfo({ ...pageInfo, pageIndex: pageInfo.pageIndex - 1 });
                    } else {
                      table.previousPage();
                    }
                  }}
                  disabled={manualPagination ? pageInfo.pageIndex === 0 : !table.getCanPreviousPage()}
                ></button>
              </li>

              {manualPagination
                ? renderPageNumbers(pageInfo.pageIndex)
                : pageNumbers.map((num) => (
                  <li key={num}>
                    <button
                      className={`${num === pageIndex ? "active" : ""}`}
                      onClick={() => table.setPageIndex(num)}
                    >
                      {num + 1}
                    </button>
                  </li>
                ))}

              <li className="next">
                <button
                  onClick={() => {
                    if (manualPagination) {
                      setPageInfo({ ...pageInfo, pageIndex: pageInfo.pageIndex + 1 });
                    } else {
                      table.nextPage();
                    }
                  }}
                  disabled={manualPagination ? pageInfo.pageIndex >= pageInfo.totalPages - 1 : !table.getCanNextPage()}
                ></button>
              </li>
              <li className="end">
                <button
                  onClick={() => {
                    if (manualPagination) {
                      setPageInfo({ ...pageInfo, pageIndex: pageInfo.totalPages - 1 });
                    } else {
                      table.setPageIndex(pageCount - 1);
                    }
                  }}
                  disabled={manualPagination ? pageInfo.pageIndex >= pageInfo.totalPages - 1 : !table.getCanNextPage()}
                ></button>
              </li>
            </ul>
          </div>
        )
        }
      </>
    );
  }
);

export default Table;