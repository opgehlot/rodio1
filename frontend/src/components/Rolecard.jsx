import React from "react";

const RoleCard = ({ title, icon, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-5 rounded-xl border-2 p-3 transition-all duration-200 ${
        selected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 bg-white hover:border-blue-300"
      }`}
    >
      <div
        className={`w-24 h-24 rounded-lg flex items-center justify-center transition-all ${
          selected ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500"
        }`}
      >
        {icon}
      </div>

      <span className="text-lg font-medium text-gray-800">
        {title}
      </span>
    </button>
  );

};

export default RoleCard;