import React from "react";

function RightBarLatestActivities(props) {
  return (
    <div className="flex items-center justify-between my-5">
      <div className="flex items-center gap-5">
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={props.image}
          alt="profile image"
        />
        <p className="text-sm">
          <span className="font-medium text-black dark:text-white transition-colors duration-300">
            {props.name}
          </span>{" "}
          <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
            {props.activity}
          </span>
        </p>
      </div>
      <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
        {props.time}
      </span>
    </div>
  );
}

export default RightBarLatestActivities;
