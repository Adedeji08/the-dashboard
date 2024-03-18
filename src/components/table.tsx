import React from "react";
import PlaceholderImage from "../assets/Ellipse 5.svg";
import Icon from "../assets/icons";
import { formatDate } from "../utilities/functions";

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
  selectedUserId: string | null;
  currentPage?: number | null;
  onPageChange?: number | null;
  onUserClick: (id: string) => void;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  onUserClick,
  selectedUserId,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "successful":
        return "#D1FFC9";
      case "active":
        return "#D1FFC9";
      case "pending":
        return "#FCCFCF";
      case "failed":
        return "#D9D9D9";
        case "closed":
          return "#FCCFCF";
      case "blocked":
        return "#FCCFCF";
      case "inactive":
        return "#D9D9D9";
      default:
        return "transparent";
    }
  };

  return (
    <table className="table mt-6 w-full">
      <thead className="bg-[#CFF0FC] h-10">
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
                {column.accessor === "created_at" || column.accessor === "createdAt" ? (
                  formatDate(row[column.accessor])
                ) : column.accessor === "profilePhoto" ? (
                  <img
                    src={
                      row[column.accessor]
                        ? row[column.accessor]
                        : PlaceholderImage
                    }
                    width={40}
                    alt="profile"
                  />
                ) : column.accessor === "id" ? (
                  <button onClick={() => onUserClick(row["id"])}>
                    <Icon name="dotIcon" />
                  </button>
                ): column.accessor === "_id" ? (
                  <button onClick={() => onUserClick(row["_id"])}>
                    <Icon name="dotIcon" />
                  </button>
                ) : column.accessor === "phone" && !row[column.accessor] ? (
                  "N/A"
                ) : column.accessor === "status" ? (
                  <p
                    className="-mt-1 text-[12px] text-center font-normal w-20 h-4 rounded-md"
                    style={{
                      backgroundColor: getStatusColor(row[column.accessor]),
                    }}
                  >
                    {row[column.accessor]}
                  </p>
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
