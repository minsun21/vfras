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

const Table = forwardRef(
  (
    {
      columns,
      data,
      pageSize = 5,
      rowSelectionEnabled = false,
      onRowSelectionChange,
      showIndex = true,
    },
    ref
  ) => {
    const [rowSelection, setRowSelection] = useState({});
    const [tableData, setTableData] = useState(data);

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
                  className="navigate"
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
          if (col.columns) {
            return { ...col, columns: enhanceColumns(col.columns) };
          }
          return col;
        });
      return enhanceColumns(columns);
    }, [columns, tableData]);

    const selectionColumn = {
      id: "select",
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllPageRowsSelected()}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
    };

    const indexColumn = {
      accessorKey: "rowIndex",
      header: "순번",
      cell: ({ row }) => row.index + 1,
    };

    const tableColumns = useMemo(
      () => [
        ...(rowSelectionEnabled ? [selectionColumn] : []),
        ...(showIndex ? [indexColumn] : []),
        ...processedColumns,
      ],
      [rowSelectionEnabled, showIndex, processedColumns]
    );

    const table = useReactTable({
      data: tableData,
      columns: tableColumns,
      state: { rowSelection },
      onRowSelectionChange: setRowSelection,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      enableRowSelection: rowSelectionEnabled,
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

    return (
      <div className="common-table-container">
        <table className="common-table">
          <thead>
            <tr>
              {rowSelectionEnabled && (
                <th rowSpan={2}>
                  <input
                    type="checkbox"
                    checked={table.getIsAllPageRowsSelected()}
                    onChange={table.getToggleAllPageRowsSelectedHandler()}
                  />
                </th>
              )}
              {showIndex && <th rowSpan={2}>순번</th>}
              {columns.map((col, idx) =>
                col.columns ? (
                  <th key={idx} colSpan={col.columns.length}>
                    {String(col.header)
                      .split("\\n")
                      .map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                  </th>
                ) : (
                  <th key={idx} rowSpan={2}>
                    {String(col.header)
                      .split("\\n")
                      .map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
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
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
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
              className={`pagination-page${num === pageIndex ? "-active" : ""}`}
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
