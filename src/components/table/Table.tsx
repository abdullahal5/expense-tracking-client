import { JSX } from "react";
import styles from "./Table.module.css";

interface TableRow {
  [key: string]:
    | string
    | number
    | JSX.Element
    | { value: string | number; tooltip: string };
}

interface TableProps {
  columns: string[];
  data: TableRow[];
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns?.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, rowIndex) => {
            // const tooltip =
            //   typeof row[columns[0]] === "object" &&
            //   "tooltip" in (row[columns[0]] as object)
            //     ? (
            //         row[columns[0]] as {
            //           value: string | number;
            //           tooltip: string;
            //         }
            //       ).tooltip
            //     : "";

            return (
              <tr key={rowIndex} className={styles.row}>
                {columns.map((col, colIndex) => {
                  const cellData = row[col];
                  const value =
                    typeof cellData === "object" && "value" in cellData
                      ? cellData.value
                      : cellData;

                  return (
                    <td key={colIndex} className={styles.cell}>
                      {value}
                    </td>
                  );
                })}
                {/* <p className={styles.rowTooltip}>{tooltip && tooltip}</p> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
