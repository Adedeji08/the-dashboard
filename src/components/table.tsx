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
      case "resolved":
        return "#D1FFC9";
      case "pending":
        return "#FCCFCF";
      case "in_progress":
        return "#87CEEB";
      case "failed":
        return "#D9D9D9";
      case "suspended":
        return "#FCCFCF";
      case "closed":
        return "#FCCFCF";
      case "blocked":
        return "#FCCFCF";
      case "inactive":
        return "#D9D9D9";
      default:
        return "transparent";
        case "approved":
        return "#D1FFC9";
      case "rejected":
        return "#FCCFCF";
    }
  };

  const formatStatusText = (status: string) => {
    switch (status) {
      case "in_progress":
        return "In Progress";
      default:
        return status?.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
    }
  };

  return (
    <table className="table mt-6 w-full">
      <thead className="bg-[#CFF0FC] h-10">
        <tr className="text-[16px] text-left">
          {columns?.map((column, index) => (
            <th className="font-medium" key={index}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-[12px]" >
        {data?.map((row, rowIndex) => (
          <tr key={rowIndex} 
          onClick={() => onUserClick(row["id"] || row["_id"])}
          className={`cursor-pointer ${selectedUserId === (row["id"] || row["_id"]) ? 'bg-gray-200' : ''}`}
          >
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
                    className="rounded-full w-[40px] h-[40px]"
                    alt="profile"
                  />
                ) : column.accessor === "id" ? (
                  <button onClick={() => onUserClick(row["id"])}>
                    <Icon name="dotIcon" />
                  </button>
                ) : column.accessor === "_id" ? (
                  <button onClick={() => onUserClick(row["_id"])}>
                    <Icon name="dotIcon" />
                  </button>
                ) : column.accessor === "phone" && !row[column.accessor] ? (
                  "N/A"
                ) : column.accessor === "status" ? (
                  <p
                    className="-mt-1 text-[12px] p-1 text-center font-normal w-20 rounded-md"
                    style={{
                      backgroundColor: getStatusColor(row[column.accessor]),
                    }}
                  >
                    {formatStatusText(row[column.accessor])}
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
