import React from "react";
import LeftBarOptions from "./LeftBarOptions";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";

function LeftBar() {
  const noScrollbarStyle = {
    "::-webkit-scrollbar": {
      display: "none",
    },
    "-ms-overflow-style": "none" /* IE and Edge */,
    "scrollbar-width": "none" /* Firefox */,
  };
  return (
    <div className="flex-[2] sticky top-[4rem] h-[calc(100vh-4rem)] hidden xl:block">
      <div
        className="flex flex-col items-center text-gray-700 bg-white h-full overflow-scroll dark:bg-gray-800 transition-colors duration-300"
        style={noScrollbarStyle}
      >
        <div className="flex flex-col items-center w-full mt-3 flex-grow">
          <LeftBarOptions
            link="#"
            icon={<MessageOutlinedIcon />}
            text="Messages"
          />
          <LeftBarOptions
            link="#"
            icon={<GroupsOutlinedIcon />}
            text="Groups"
          />
          <LeftBarOptions
            link="#"
            icon={<PeopleOutlinedIcon />}
            text="Friends"
          />
          <LeftBarOptions link="#" icon={<FavoriteBorderIcon />} text="Likes" />
          <LeftBarOptions
            link="#"
            icon={<ChatBubbleOutlineOutlinedIcon />}
            text="Comments"
          />
          <LeftBarOptions
            link="#"
            icon={<CollectionsOutlinedIcon />}
            text="Posts"
          />
          <LeftBarOptions
            link="#"
            icon={<BookmarksOutlinedIcon />}
            text="Bookmarks"
          />
          <LeftBarOptions
            link="#"
            icon={<HistoryOutlinedIcon />}
            text="Memories"
          />
        </div>
        <div className="w-full mt-auto mb-3">
          <LeftBarOptions
            link="#"
            icon={<SettingsOutlinedIcon />}
            text="Settings"
          />
        </div>
      </div>
    </div>
  );
}

export default LeftBar;
