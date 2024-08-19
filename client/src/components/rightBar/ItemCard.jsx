import React from "react";

function ItemCard(props) {
  return (
    <div className="shadow-md px-5 py-4 rounded-2xl mb-4 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="flex justify-between">
        <span className="text-black font-medium text-lg dark:text-white transition-colors duration-300">
          {props.text}
        </span>
        <span className="hover:cursor-pointer text-blue-500 font-medium">
          See All
        </span>
      </div>
      {props.items.map((item) => {
        return item;
      })}
    </div>
  );
}

export default ItemCard;
