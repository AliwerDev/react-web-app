import React, { useCallback } from "react";
import styled from "@emotion/styled";
import { theme } from "../../theme";

export type TableColumn<T> = {
  key: keyof T | "index" | "actions";
  label: string;
  width?: string;
  type?: "index" | "date" | "actions";
  align?: "start" | "center" | "end";
  extra?: number;
  customColumn?: (value: any) => React.ReactNode;
};

interface TableProps {
  columns: TableColumn<any>[];
  rows: any[];
  loading?: boolean;
  className?: string;
  rowKey?: string;
}

const Table = ({ columns, loading, rows, className = "", rowKey = "id" }: TableProps) => {
  const getColumn = useCallback((col: TableColumn<any>, row: any, rowIndex: number) => {
    const key = col.key as string;
    const style: any = col.width ? { maxWidth: col.width, minWidth: col.width, width: col.width } : { minWidth: "100px" };
    if (col.align) style.textAlign = col.align;

    return (
      <td style={style} key={key}>
        {col.type === "index" ? rowIndex + 1 + (col.extra || 0) : col.type === "date" ? row[col.key] : col.customColumn ? col.customColumn(row) : row[col.key]}
      </td>
    );
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <StyledTableContainer className={className}>
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key as string} style={{ maxWidth: col.width || "auto", textAlign: col.align || "start" }}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row: any, rowIndex) => (
            <tr key={row[rowKey] as React.Key}>{columns.map((col) => getColumn(col, row, rowIndex))}</tr>
          ))}
        </tbody>
      </table>
    </StyledTableContainer>
  );
};

const StyledTableContainer = styled.div`
  overflow: auto;
  margin-block: 20px;

  table {
    width: 100%;
    background-color: ${theme.bgColor};
    border-collapse: collapse;

    th,
    td {
      padding: 10px;
      text-align: left;
      color: ${theme.textColor};
      background-color: ${theme.bgColor};
    }

    th {
      font-weight: bold;
    }

    td {
      /* border: 1px solid ${theme.borderColor}; */
    }

    tr:nth-child(odd) {
      td {
        background-color: ${theme.secondaryBgColor};
      }
    }

    a {
      color: ${theme.linkColor};
      text-decoration: none;

      &:hover {
        color: ${theme.linkHoverColor};
      }
    }
  }
`;

export default Table;
