import React from "react";
import Menu from "./menu";
import classNames from "classnames";

interface SidebarProps {
  open: any;
}

const Sidebar: React.FC<SidebarProps> = ({ open }) => {
  return (
    <div
      className={classNames("w-64", "p-4",
        { block: open, hidden: !open },
        "md:block","", "left-0", "bottom-0", "h-full",
        { static: !open, "md:h-auto": open }
      )}
    >
      <div className="w-full">
        <Menu />
      </div>
    </div>
  );
};

export default Sidebar;
