import React from "react";
import styled from "@emotion/styled";

type Column = {
  key: string;
  label: string;
  width?: string;
};

type Row = {
  [key: string]: React.ReactNode;
};

interface TableProps {
  columns: Column[];
  rows: Row[];
  className?: string;
  rowKey?: string;
}

const Table: React.FC<TableProps> = ({ columns, rows, className, rowKey = "id" }) => {
  return (
    <TableContainer className={`tg-theme ${className || ""}`}>
      <StyledTable>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={{ width: col.width || "auto" }}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[rowKey] as React.Key}>
              {columns.map((col) => (
                <td key={col.key}>{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default Table;

// Styled components with Telegram theme classes
const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
  border-radius: 8px;
  padding: 10px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  // Apply Telegram-specific theme styles
  &.tg-theme-dark th,
  &.tg-theme-dark td {
    color: #ffffff;
    background-color: #2a2a2a;
  }

  &.tg-theme-light th,
  &.tg-theme-light td {
    color: #000000;
    background-color: #ffffff;
  }

  th,
  td {
    padding: 8px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    text-align: left;
  }

  th {
    font-weight: bold;
  }
`;
