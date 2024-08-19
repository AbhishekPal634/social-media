import React from "react";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";

function RightBarOnlineFriends(props) {
  return (
    <div className="flex items-center justify-between my-5">
      <div className="flex items-center gap-5 relative">
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={props.image}
          alt="profile image"
        ></img>
        <div className="w-3 h-3 rounded-full bg-lime-500 absolute top-0 left-7"></div>
        <div className="flex flex-col justify-center">
          <span className="font-medium text-gray-600 dark:text-gray-300 transition-colors duration-300">
            {props.name}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">
            @{props.username}
          </span>
        </div>
      </div>
      <ChatOutlinedIcon className="text-gray-400 hover:cursor-pointer" />
    </div>
  );
}

export default RightBarOnlineFriends;
