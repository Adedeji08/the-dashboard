import React from "react";
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
      case "active":
      case "resolved":
      case "approved":
        return "#D1FFC9";
      case "pending":
      case "suspended":
      case "closed":
      case "blocked":
      case "rejected":
        return "#FCCFCF";
      case "in_progress":
        return "#87CEEB";
      case "failed":
      case "inactive":
        return "#D9D9D9";
      default:
        return "transparent";
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

  const getInitials = (name: string) => {
    if (!name) return '';
    const nameParts = name.split(" ");
    const initials = nameParts.map(part => part[0]).join("");
    return initials.substring(0, 2).toUpperCase();
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
      <tbody className="text-[12px]">
        {data?.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            onClick={() => onUserClick(row["id"] || row["_id"])}
            className={`cursor-pointer ${selectedUserId === (row["id"] || row["_id"]) ? "bg-gray-200" : ""}`}
          >
            {columns.map((column, colIndex) => (
              <td key={colIndex} className="pt-5">
                {column.accessor === "created_at" || column.accessor === "createdAt" ? (
                  formatDate(row[column.accessor])
                ) : column.accessor === "profilePhoto" ? (
                  <img
                    src={
                      row[column.accessor]
                       ||
                         `https://ui-avatars.com/api/?name=${(row["fullname"]) || (row["fullName"])}&background=0979A1&color=fff`
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
