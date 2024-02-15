import React from "react";
import { Link, useLocation } from "react-router-dom";

interface MenuItemProps {
  to: any;
  label: any;
}

const MenuItem: React.FC<MenuItemProps> = ({ to, label }) => {
  const location = useLocation();
  const active = location.pathname === to;

  return (
    <Link to={to}>
      <div
        className={`flex items-center mb-4 p-2 rounded-md font-semibold text-base cursor-pointer
          ${active ? "bg-[#0979A1CC] text-[#fff]" : "hover:bg-gray-100"}`}
      >
        {label}
      </div>
    </Link>
  );
};

const Menu: React.FC = () => {
  const menuItems: MenuItemProps[] = [
    { to: "/", label: "Account" },
    { to: "/transactions", label: "Transactions" },
    { to: "/refunds", label: "Refunds" },
    { to: "/mediation", label: "Mediation" },
    { to: "/blacklist", label: "Blacklist" },
    { to: "/support", label: "Customer Support" },
    { to: "/analytics", label: "Analytics" },
  ];

  return (
    <div>
      {menuItems.map((item, index) => (
        <MenuItem key={index} to={item.to} label={item.label} />
      ))}
    </div>
  );
};

export default Menu;
