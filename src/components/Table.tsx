import React from "react";
import {
  Table as ShadTable,
  TableRow,
  TableHeader,
  TableBody,
  TableHead,
  TableCell,
} from "./ui/table";

interface TableProps {
  headers: string[];
  rows: Record<string, any>[];
}

const Table: React.FC<TableProps> = ({ headers, rows }) => {
  return (
    <ShadTable className="border shadow w-full">
      <TableHeader>
        <TableRow>
          {headers.map((header, index) => (
            <TableHead
              key={index}
              className={
                header === "Actions" ? "w-[150px] text-right" : "w-1/4"
              }
            >
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.length === 0 ? (
          <TableRow>
            <TableCell colSpan={headers.length} className="text-center">
              No data available
            </TableCell>
          </TableRow>
        ) : (
          rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {Object.values(row).map((cell, cellIndex) => (
                <TableCell
                  key={cellIndex}
                  className={
                    headers[cellIndex] === "Actions"
                      ? "w-[150px] text-right"
                      : "w-1/4"
                  }
                >
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </ShadTable>
  );
};

export default Table;
