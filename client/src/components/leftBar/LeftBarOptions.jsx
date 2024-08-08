import React from "react";

function LeftBarOptions(props) {
  return (
    <a
      className="flex items-center w-full h-14 px-4 mt-2 rounded hover:bg-gray-300 text-gray-700 dark:text-white dark:hover:bg-gray-600"
      href={props.link}
    >
      <span className="text-xl">{props.icon}</span>
      <span className="ml-3 text-base font-medium">{props.text}</span>
    </a>
  );
}
export default LeftBarOptions;
