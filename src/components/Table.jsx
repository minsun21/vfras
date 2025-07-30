import React, {
  useEffect,
  useState,
  useMemo,
  forwardRef,
  useImperativeHandle,
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
    const [clickSelection, setClickSelection] = useState({});
    const [checkboxSelection, setCheckboxSelection] = useState({});
    const [currentPageSize, setCurrentPageSize] = useState(pageSize);
    const [pageInfo, setPageInfo] = useState({
      pageIndex: 0,
      pageSize: 20, // 최초 20개만
      totalPages: 0,
      totalElements: 0,
    });

    const isSplit = rowClickSelect === true;

    useEffect(() => {
      if (manualPagination && typeof fetchData === "function") {
        fetchData(pageInfo.pageIndex, pageInfo.pageSize).then((res) => {
          const resultData = res.data.resultData;
          setTableData(resultData.subscribers || []);
          setPageInfo((prev) => ({
            ...prev,
            totalPages: resultData.totalPages,
            totalElements: resultData.totalElements,
          }));
          setCurrentPageSize(pageInfo.pageSize); // 최초 동기화
        });
      }
    }, [pageInfo.pageIndex, pageInfo.pageSize]);

    const handleCheckBox = (row) => {
      const newSelection = {
        ...(isSplit ? checkboxSelection : { ...checkboxSelection }),
        [row.id]: !checkboxSelection[row.id],
      };
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

    const processedColumns = useMemo(() => {
      const enhanceColumns = (cols) =>
        cols.map((col) => {
          if (col.columns) return { ...col, columns: enhanceColumns(col.columns) };

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
                      r === row.original ? { ...r, [columnId]: !r[columnId] } : r
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
      pageCount: Math.ceil(pageInfo.totalElements / pageInfo.pageSize),
      manualPagination: manualPagination,
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
      getPaginationRowModel: getPaginationRowModel(),
      enableRowSelection: isSplit,
    });

    useImperativeHandle(
      ref,
      () => ({
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
        triggerFetch: (page = 0, size = 15) => {
          fetchData(page, size).then((res) => {
            const resultData = res.data.resultData;
            setTableData(resultData.subscribers || []);
            setPageInfo({
              pageIndex: page,
              pageSize: size,
              totalPages: resultData.totalPages,
              totalElements: resultData.totalElements,
            });
          });
        },
      }),
      [tableData, table]
    );

    const renderPageNumbers = () => {
      const pageIndex = pageInfo.pageIndex;
      const pageCount = Math.ceil(pageInfo.totalElements / pageInfo.pageSize);
      const maxVisible = 10;
      const range = Math.floor(maxVisible / 2);

      let start = Math.max(1, pageIndex + 1 - range);
      let end = Math.min(pageCount, start + maxVisible - 1);

      if (end - start < maxVisible - 1) {
        start = Math.max(1, end - maxVisible + 1);
      }

      const buttons = [];

      // 처음 페이지
      if (start > 1) {
        buttons.push(
          <li key="first">
            <button onClick={() => setPageInfo({ ...pageInfo, pageIndex: 0 })}>
              1
            </button>
          </li>
        );
        if (start > 2) {
          buttons.push(
            <li key="dots-start">
              <button
                className="dots"
                onClick={() =>
                  setPageInfo({
                    ...pageInfo,
                    pageIndex: Math.max(0, start - maxVisible),
                  })
                }
              >
                …
              </button>
            </li>
          );
        }
      }

      // 중간 페이지들
      for (let i = start; i <= end && i < pageCount; i++) {
        buttons.push(
          <li key={i}>
            <button
              className={i - 1 === pageIndex ? "active" : ""}
              onClick={() => setPageInfo({ ...pageInfo, pageIndex: i - 1 })}
            >
              {i}
            </button>
          </li>
        );
      }

      // 마지막 쪽 … 버튼만 (숫자 없이)
      if (end < pageCount - 1) {
        buttons.push(
          <li key="dots-end">
            <button
              className="dots"
              onClick={() =>
                setPageInfo({ ...pageInfo, pageIndex: pageCount - 1 })
              }
            >
              …
            </button>
          </li>
        );
      }

      return buttons;
    };


    const renderCell = (cell) => {
      const rendered = flexRender(cell.column.columnDef.cell, cell.getContext());
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
      const MAX_PAGE_SIZE = 100;
      const baseSizes = [10, 30, 50, 100];

      const nextRounded = Math.min(
        Math.ceil(pageInfo.totalElements / 10) * 10,
        MAX_PAGE_SIZE
      );

      const Options = baseSizes.filter((n) => n <= nextRounded);
      if (!Options.includes(nextRounded)) Options.push(nextRounded);

      return [...new Set(Options)].sort((a, b) => a - b);
    }, [pageInfo.totalElements]);

    return (
      <>
        <Form className="form">
          <div className="tbl-list-top">
            <div className="top-button">
              {resultLabel && (
                <span className="total mr0">
                  {LABELS.SEARCH_RESULT(pageInfo.totalElements)}
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
                    onChange={(e) => {
                      const newSize = Number(e.target.value);
                      setCurrentPageSize(newSize);
                      setPageInfo({ ...pageInfo, pageIndex: 0, pageSize: newSize });
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </Form>

        <div
          className="tbl-list"
          ref={scrollRef}
          style={
            maxHeight
              ? { maxHeight: `${maxHeight}px`, overflowY: "auto" }
              : { overflowY: "visible" }
          }
        >
          <table>
            <thead>
              <tr>
                {rowSelectionEnabled && <th rowSpan={2}></th>}
                {showIndex && <th rowSpan={2}>{LABELS.INDEX}</th>}
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
              {table.getRowModel().rows.map((row) => (
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
        </div>

        {paginationEnabled && (
          <div className="paging">
            <ul>
              <li className="first">
                <button
                  onClick={() => setPageInfo({ ...pageInfo, pageIndex: 0 })}
                  disabled={pageInfo.pageIndex === 0}
                ></button>
              </li>
              <li className="prev">
                <button
                  onClick={() =>
                    setPageInfo({
                      ...pageInfo,
                      pageIndex: Math.max(0, pageInfo.pageIndex - 1),
                    })
                  }
                  disabled={pageInfo.pageIndex === 0}
                ></button>
              </li>

              {renderPageNumbers()}

              <li className="next">
                <button
                  onClick={() =>
                    setPageInfo({
                      ...pageInfo,
                      pageIndex: Math.min(
                        Math.ceil(pageInfo.totalElements / pageInfo.pageSize) - 1,
                        pageInfo.pageIndex + 1
                      ),
                    })
                  }
                  disabled={
                    pageInfo.pageIndex >=
                    Math.ceil(pageInfo.totalElements / pageInfo.pageSize) - 1
                  }
                ></button>
              </li>
              <li className="end">
                <button
                  onClick={() =>
                    setPageInfo({
                      ...pageInfo,
                      pageIndex:
                        Math.ceil(pageInfo.totalElements / pageInfo.pageSize) - 1,
                    })
                  }
                  disabled={
                    pageInfo.pageIndex >=
                    Math.ceil(pageInfo.totalElements / pageInfo.pageSize) - 1
                  }
                ></button>
              </li>
            </ul>
          </div>
        )}
      </>
    );
  }
);

export default Table;
