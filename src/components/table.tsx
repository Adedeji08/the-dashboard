import React from "react";
import PlaceholderImage from "../assets/Ellipse 5.svg";
import Icon from "../assets/icons";

interface TableColumn {
  header: string;
  accessor: string;
}

interface TableRow {
  [key: string]: any;
}

interface TableProps {
  columns: TableColumn[];
  data: TableRow[];
  // selectedUserId: string | null; // Add selectedUserId prop
  // onUserClick: (id: string) => void; // Add onUserClick prop
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <table className="table mt-6 w-full">
      <thead className="bg-[#CFF0FC] h-10 rounded">
        <tr className="text-[16px] text-left">
          {columns.map((column, index) => (
            <th className="font-medium" key={index}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-[12px]">
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td key={colIndex} className="pt-5">
                {column.accessor === "created_at" ? (
                  formatDate(row[column.accessor])
                ) : column.accessor === "profilePhoto" ? (
                  <img
                    src={row[column.accessor] ? row[column.accessor] : PlaceholderImage}
                    alt="profile"
                  />
                ) : column.accessor === "id" ? (
                  <button 
                  // onClick={() => onUserClick(row["id"])}
                  > <Icon name="avatar" /> </button>
                ) : column.accessor === "phone" && !row[column.accessor] ? (
                  "N/A"
                ) : (
                  row[column.accessor]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
