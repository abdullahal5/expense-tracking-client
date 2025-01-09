import { JSX } from "react";
import styles from "./Table.module.css";

interface TableRow {
  [key: string]: string | number | JSX.Element;
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
          {data?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>{row[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
