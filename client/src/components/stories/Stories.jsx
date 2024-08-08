import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import AddIcon from "@mui/icons-material/Add";

function Stories() {
  const { currentUser } = useContext(AuthContext);

  // TempData
  const storiesData = [
    {
      id: 1,
      name: "John Doesnt",
      image: "/images/registerCardBg.jpg",
    },
    {
      id: 2,
      name: "John Doesnt",
      image: "/images/registerCardBg.jpg",
    },
    {
      id: 3,
      name: "John Doesnt",
      image: "/images/registerCardBg.jpg",
    },
    {
      id: 4,
      name: "John Doesnt",
      image: "/images/registerCardBg.jpg",
    },
  ];
  return (
    <div className="flex gap-3 sm:h-48 mb-5 h-24 overflow-x-auto overflow-y-hidden whitespace-nowrap">
      <div className="rounded-lg overflow-hidden relative">
        <img
          className="sm:w-32 sm:h-48 object-cover w-16 h-16 max-sm:rounded-full mb-1"
          src={currentUser.profilePic}
          alt="story"
        />
        <span className="absolute bottom-2 left-2 text-black dark:text-white sm:text-white sm:text-sm text-xs font-medium">
          {currentUser.name}
        </span>

        <button className="absolute sm:bottom-8 sm:left-2 bottom-8 left-10 text-white bg-blue-500 border-0 rounded-full h-5 w-5 flex justify-center items-center cursor-pointer">
          <AddIcon />
        </button>
      </div>
      {storiesData.map((story) => {
        return (
          <div className="rounded-lg overflow-hidden relative" key={story.id}>
            <img
              className="sm:w-32 sm:h-48 object-cover w-16 h-16 mb-1 max-sm:rounded-full"
              src={story.image}
              alt="story"
            />
            <span className="absolute bottom-2 left-2 text-black dark:text-white sm:text-white sm:text-sm text-xs font-medium">
              {story.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default Stories;
