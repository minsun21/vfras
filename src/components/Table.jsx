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
      pageSize = 15,
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
      pageSize: 10,
      totalPages: 0,
      totalElements: 0,
    });

    const isSplit = rowClickSelect === true;

    useEffect(() => {
      if (manualPagination && typeof fetchData === "function") {
        fetchData(pageInfo.pageIndex, pageInfo.pageSize).then((res) => {
          const resultData = res.data.resultData;
          console.log(resultData);
          setTableData(resultData.subscribers || []);
          setPageInfo((prev) => ({
            ...prev,
            totalPages: resultData.totalPages,
            totalElements: resultData.totalElements,
          }));
        });
      }
    }, [pageInfo.pageIndex, pageInfo.pageSize]);

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

    useImperativeHandle(
      ref,
      () => ({
        getUpdatedData: () => tableData,
        getSelectedRowIds: () =>
          table.getSelectedRowModel().rows.map((r) => r.original.id),
        updateRowsById: (ids, updater) => {
          const updated = tableData.map((row) => {
            return ids.includes(row.id || row.subNo) ? updater(row) : row;
          });

          setTableData(updated);
        },
        clearSelection: () => {
          setClickSelection({});
          setCheckboxSelection({});
        },
      }),
      [tableData, table]
    );

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
      const nextRounded = Math.ceil(tableData.length / 10) * 10;
      const options = baseSizes.filter((n) => n < nextRounded);
      if (!options.includes(nextRounded)) options.push(nextRounded);
      return options;
    }, [tableData]);

    return (
      <>
        <Form className="form">
          <div className="tbl-list-top">
            <div className="top-button">
              {resultLabel && (
                <span className="total mr0">
                  {LABELS.SEARCH_RESULT(tableData.length)}
                </span>
              )}
              {topBtns && <span>{topBtns()}</span>}
            </div>
            {pageSelect && (
              <div className="top-button fRight">
                <div className="select-box">
                  <Select
                    options={pageSizeOptions.map((n) => ({ key: n, value: n }))}
                    nonEmpty={true}
                    value={currentPageSize}
                    onChange={(e) => setCurrentPageSize(Number(e.target.value))}
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
                      setClickSelection({ [row.id]: true });
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
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                ></button>
              </li>
              <li className="prev">
                <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                ></button>
              </li>
              {pageNumbers.map((num) => (
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
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                ></button>
              </li>
              <li className="end">
                <button
                  onClick={() => table.setPageIndex(pageCount - 1)}
                  disabled={!table.getCanNextPage()}
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
