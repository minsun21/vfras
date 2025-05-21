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
      pageSize = 5,
      rowSelectionEnabled = true,
      onRowSelectionChange,
      showIndex = true,
      resultLabel = true,
      pageSelect = true,
      topBtns,
      paginationEnabled = true,
    },
    ref
  ) => {
    const [rowSelection, setRowSelection] = useState({});
    const [currentPageSize, setCurrentPageSize] = useState(pageSize);

    const handleCheckBox = (rowIndex, columnId) => {
      const updated = tableData.map((row, i) => {
        if (i === rowIndex) {
          return { ...row, [columnId]: !row[columnId] };
        }
        return row;
      });
      setTableData(updated);
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
                  onChange={() => handleCheckBox(row.index, columnId)}
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
                header: ({ table }) => (
                  <input
                    type="checkbox"
                    checked={table.getIsAllPageRowsSelected()}
                    onChange={(e) => {
                      table.getToggleAllPageRowsSelectedHandler()(e);
                    }}
                  />
                ),
                cell: ({ row }) => (
                  <input
                    type="checkbox"
                    checked={row.getIsSelected()}
                    onChange={(e) => {
                      row.getToggleSelectedHandler()(e);
                    }}
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
      state: { rowSelection },
      onRowSelectionChange: setRowSelection,
      getCoreRowModel: getCoreRowModel(),
      ...(paginationEnabled
        ? { getPaginationRowModel: getPaginationRowModel() }
        : {}),
      enableRowSelection: true,
    });

    useImperativeHandle(
      ref,
      () => ({
        getUpdatedData: () => tableData,
        getSelectedRowIds: () => {
          return table.getSelectedRowModel().rows.map((row) => row.original.id);
        },
        updateRowsById: (ids, updater) => {
          const updated = tableData.map((row) =>
            ids.includes(row.id) ? updater(row) : row
          );
          setTableData(updated); // 여기서 오류 발생 가능
        },
      }),
      [tableData, table]
    );

    useEffect(() => {
      if (paginationEnabled) {
        table.setPageSize(currentPageSize);
      }
    }, [currentPageSize, table, paginationEnabled]);

    useEffect(() => {
      if (typeof onRowSelectionChange === "function") {
        const selectedRows = table
          .getSelectedRowModel()
          .rows.map((row) => row.original);
        onRowSelectionChange(selectedRows);
      }
    }, [rowSelection, table, onRowSelectionChange]);

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

    const pageSizeOptions = useMemo(() => {
      const baseSizes = [10, 30, 50, 100];
      const nextRounded = Math.ceil(tableData.length / 10) * 10;
      const options = baseSizes.filter((n) => n < nextRounded);
      if (!options.includes(nextRounded)) options.push(nextRounded);
      return options;
    }, [tableData]);

    const renderMultiLine = (value) => {
      if (typeof value !== "string") return value;

      return value.split("\n").map((line, i) => <div key={i}>{line}</div>);
    };

    return (
      <>
        <Form className="form">
          <div className="tbl-list-top mt20">
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
                    options={pageSizeOptions.map((n) => ({
                      key: n,
                      value: n,
                    }))}
                    nonEmpty={true}
                    value={currentPageSize}
                    onChange={(e) => setCurrentPageSize(Number(e.target.value))}
                  />
                </div>
              </div>
            )}
          </div>
        </Form>
        <div className="tbl-list">
          <table>
            <thead>
              <tr>
                {rowSelectionEnabled && (
                  <th rowSpan={2}>
                    <input
                      type="checkbox"
                      checked={table.getIsAllPageRowsSelected()}
                      onChange={(e) => {
                        table.getToggleAllPageRowsSelectedHandler()(e);
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
                  className={row.getIsSelected() ? "selected" : ""}
                  onClick={() => {
                    if (rowSelectionEnabled) row.toggleSelected();
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
                    key={num}
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
