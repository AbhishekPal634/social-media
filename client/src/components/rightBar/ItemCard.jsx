import React from "react";

function ItemCard(props) {
  return (
    <div className="shadow-md px-5 py-1 rounded-2xl mb-4 bg-white dark:bg-gray-800 transition-colors duration-300">
      <span className="text-gray-500 dark:text-white transition-colors duration-300">
        {props.text}
      </span>
      {props.items.map((item) => {
        return item;
      })}
    </div>
  );
}

export default ItemCard;
