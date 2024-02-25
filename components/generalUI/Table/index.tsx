import { FC } from "react";
import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface TableProps {
  columns: {
    label: string;
    value: string;
    className?: string;
  }[];
  data: { [key: string]: string }[];
  className?: string;
}

export const Table: FC<TableProps> = ({ columns, data, className }) => {
  return (
    <UITable>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableCell key={column.label} className={column.className}>
              {column.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            {columns.map((column) => (
              <TableCell key={column.value} className={column.className}>
                {row[column.value]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </UITable>
  );
};
