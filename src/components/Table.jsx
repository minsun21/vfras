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

const Table = forwardRef(
  (
    {
      columns,
      data,
      pageSize = 5,
      rowSelectionEnabled = true,
      onRowSelectionChange,
      showIndex = true,
    },
    ref
  ) => {
    const [rowSelection, setRowSelection] = useState({});
    const [tableData, setTableData] = useState([]);

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
                  className="col-navigate"
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
      table.setPageSize(pageSize);
    }, [pageSize, table]);

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

    const renderMultiLine = (value) => {
      if (typeof value !== "string") return value;
      return value.split("\n").map((line, i) => <div key={i}>{line}</div>);
    };

    const renderCell = (cell) => {
      const rendered = flexRender(
        cell.column.columnDef.cell,
        cell.getContext()
      );
      if (typeof rendered === "string") {
        return rendered.split("\n").map((line, i) => <div key={i}>{line}</div>);
      }
      return <div style={{ whiteSpace: "pre-line" }}>{rendered}</div>;
    };

    return (
      <div className="common-table-container">
        <table className="common-table">
          <thead>
            <tr>
              {table.getHeaderGroups()[0].headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : renderMultiLine(header.column.columnDef.header)}
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
        <div className="pagination">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          {pageNumbers.map((num) => (
            <button
              className={`pagination-page${num === pageIndex ? " active" : ""}`}
              key={num}
              onClick={() => table.setPageIndex(num)}
            >
              {num + 1}
            </button>
          ))}
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            onClick={() => table.setPageIndex(pageCount - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
        </div>
      </div>
    );
  }
);

export default Table;
