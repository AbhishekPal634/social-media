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
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import MobileFriendlyOutlinedIcon from "@mui/icons-material/MobileFriendlyOutlined";

function MobileMenu() {
  const noScrollbarStyle = {
    "::-webkit-scrollbar": {
      display: "none",
    },
    "-ms-overflow-style": "none" /* IE and Edge */,
    "scrollbar-width": "none" /* Firefox */,
  };
  return (
    <div
      className="flex flex-col fixed top-[4rem] left-0 w-64 h-full z-20 bg-white dark:bg-gray-800 transition-transform transform translate-x-0 overflow-y-scroll"
      style={noScrollbarStyle}
    >
      <div className="flex flex-col items-center w-full mt-3 flex-grow">
        <LeftBarOptions
          link="#"
          icon={<MessageOutlinedIcon />}
          text="Messages"
        />
        <LeftBarOptions link="#" icon={<PeopleOutlinedIcon />} text="Friends" />
        <LeftBarOptions link="#" icon={<FavoriteBorderIcon />} text="Likes" />
        <LeftBarOptions
          link="#"
          icon={<ChatBubbleOutlineOutlinedIcon />}
          text="Comments"
        />
        <LeftBarOptions
          link="#"
          icon={<BookmarksOutlinedIcon />}
          text="Bookmarks"
        />
        <LeftBarOptions
          link="#"
          icon={<GroupAddOutlinedIcon />}
          text="Suggestions"
        />
        <LeftBarOptions
          link="#"
          icon={<TaskOutlinedIcon />}
          text="Latest Activities"
        />
        <LeftBarOptions
          link="#"
          icon={<MobileFriendlyOutlinedIcon />}
          text="Online Friends"
        />
        <LeftBarOptions
          link="#"
          icon={<SettingsOutlinedIcon />}
          text="Settings"
        />
      </div>
    </div>
  );
}

export default MobileMenu;
