import React from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

function RightBarUserSuggestion(props) {
  return (
    <div className="flex items-center justify-between my-5">
      {/* userinfo */}
      <div className="flex items-center gap-5">
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={props.image}
          alt="profile image"
        ></img>
        <div className="flex flex-col justify-center">
          <span className="font-medium text-gray-600 dark:text-gray-300 transition-colors duration-300">
            {props.name}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">
            @{props.username}
          </span>
        </div>
      </div>
      <AddOutlinedIcon className="text-gray-400 hover:cursor-pointer" />
    </div>
  );
}

export default RightBarUserSuggestion;
