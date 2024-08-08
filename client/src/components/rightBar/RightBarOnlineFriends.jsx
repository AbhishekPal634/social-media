import React from "react";

function RightBarOnlineFriends(props) {
  return (
    <div className="flex items-center justify-between my-5">
      <div className="flex items-center gap-5 relative">
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={props.image}
          alt="profile image"
        ></img>
        <div className="w-2 h-2 rounded-full bg-lime-500 absolute top-0 left-6"></div>
        <span className="font-medium text-black text-sm dark:text-white transition-colors duration-300">
          {props.name}
        </span>
      </div>
    </div>
  );
}

export default RightBarOnlineFriends;
