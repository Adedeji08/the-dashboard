import React from "react";
import Icon from "../assets/icons";
import { formatDate } from "../utilities/functions";
import { capitalizeFirstLetter } from "../utilities/functions";

interface TableColumn {
  header: string;
  accessor: string ;
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

const TableAdmin: React.FC<TableProps> = ({
  columns,
  data,
  onUserClick,
  selectedUserId,
}) => {

  return (
    <table className=" mt-6 w-full">
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
          <tr key={rowIndex} onClick={() => onUserClick(row.id)} className="cursor-pointer">
            {columns.map((column, colIndex) => (
              <td key={colIndex} className="pt-5">
                {column.accessor === "created_at" || column.accessor === "createdAt" ? (
                  formatDate(row[column.accessor])
                ) : column.header === "" ? (
                  <img
                    src={
                       `https://ui-avatars.com/api/?name=${row[column.accessor]}&background=0979A1&color=fff`
                    }
                    className="rounded-full w-[40px] h-[40px]"
                    alt="profile"
                  />
                ) : column.accessor === "id" ? (
                  <button onClick={() => onUserClick(row["id"])}>
                    <Icon name="dotIcon" />
                    
                  </button>
                ):
                column.header === "Name"? (
                  capitalizeFirstLetter(row[column.accessor])
                ) 
                
                :column.accessor === "_id" ? (
                  <button onClick={() => onUserClick(row["_id"])}>
                    <Icon name="dotIcon" />
                  </button>
                ) : column.accessor === "phone" && !row[column.accessor] ? (
                  "N/A"
                ): column.accessor === "role"? (
                  capitalizeFirstLetter( row[column.accessor].name)
                )

                :(
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

export default TableAdmin;
