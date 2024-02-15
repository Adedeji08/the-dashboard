import React from "react";
import Menu from "./menu";

interface SidebarProps {
  open: any;
}

const Sidebar: React.FC<SidebarProps> = ({ open }) => {
  return (
    <div
      className={`w-60 p-4 ${
        open ? "block" : "hidden"
      } md:block fixed left-0 bottom-0 h-full md:static md:h-auto`}
    >
      <div className="w-full">
        <Menu />
      </div>
    </div>
  );
};

export default Sidebar;
