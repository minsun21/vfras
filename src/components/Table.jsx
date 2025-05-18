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
      data,
      pageSize = 5,
      rowSelectionEnabled = true,
      onRowSelectionChange,
      showIndex = true,
      resultLabel = true,
      pageSelect = true,
      topBtns,
    },
    ref
  ) => {
    const [rowSelection, setRowSelection] = useState({});
    const [tableData, setTableData] = useState([]);
    const [currentPageSize, setCurrentPageSize] = useState(pageSize);

    useEffect(() => {
      setTableData(data);
    }, [data]);

    const handleRowRadioChange = (rowIndex, columnId) => {
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

          if (col.id?.startsWith("radio")) {
            const columnId = col.id;
            return {
              ...col,
              cell: ({ row }) => (
                <input
                  type="checkbox"
                  className="radio-style"
                  checked={!!row.original[columnId]}
                  onChange={() => handleRowRadioChange(row.index, columnId)}
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
      getPaginationRowModel: getPaginationRowModel(),
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
          setTableData(updated);
        },
      }),
      [tableData, table]
    );

    useEffect(() => {
      table.setPageSize(currentPageSize);
    }, [currentPageSize, table]);

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

    const renderHeader = (header) => {
      const content = flexRender(
        header.column.columnDef.header,
        header.getContext()
      );
      return typeof content === "string"
        ? content.split("\n").map((line, i) => <div key={i}>{line}</div>)
        : content;
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

    const pageSizeOptions = useMemo(() => {
      const baseSizes = [10, 20, 50, 100];
      const nextRounded = Math.ceil(data.length / 10) * 10;
      const options = baseSizes.filter((n) => n < nextRounded);
      if (!options.includes(nextRounded)) options.push(nextRounded);
      return options;
    }, [data]);

    return (
      <>
        <Form className="form">
          <div className="tbl-list-top mt20">
            <div className="top-button">
              {resultLabel && (
                <span className="total mr0">
                  {LABELS.SEARCH_RESULT(data.length)}
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
                {table.getHeaderGroups()[0].headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : renderHeader(header)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
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
      </>
    );
  }
);

export default Table;
