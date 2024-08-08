import React from "react";

function RightBarUserSuggestion(props) {
  return (
    <div className="flex items-center justify-between my-5">
      {/* userinfo */}
      <div className="flex items-center gap-5">
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={props.image}
          alt="profile image"
        ></img>
        <span className="font-medium text-black text-sm dark:text-white transition-colors duration-300">
          {props.name}
        </span>
      </div>
      {/* buttons */}
      <div className="flex items-center gap-3">
        <button className="border-0 py-1 px-3 text-white cursor-pointer bg-blue-500 rounded-full text-sm">
          Follow
        </button>
        <button className="border-0 py-1 px-3 text-white cursor-pointer bg-red-500 rounded-full text-sm">
          Dismiss
        </button>
      </div>
    </div>
  );
}

export default RightBarUserSuggestion;
