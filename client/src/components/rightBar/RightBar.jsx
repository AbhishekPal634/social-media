import React from "react";
import ItemCard from "./ItemCard";
import RightBarUserSuggestion from "./RightBarUserSuggestion";
import RightBarLatestActivities from "./RightBarLatestActivities";
import RightBarOnlineFriends from "./RightBarOnlineFriends";

function RightBar() {
  const noScrollbarStyle = {
    WebkitOverflowScrolling: "touch", // For smooth scrolling on iOS
    overflowX: "hidden",
    overflowY: "scroll",
    scrollbarWidth: "none" /* Firefox */,
    msOverflowStyle: "none" /* IE and Edge */,
    scrollBehavior: "smooth", // Adding smooth scrolling
  };
  return (
    <div
      className="flex-[3.5] sticky top-[4rem] h-[calc(100vh-4rem)] overflow-scroll hidden lg:block"
      style={noScrollbarStyle}
    >
      {/* container */}
      <div className="py-5 px-5">
        {/* item */}
        <ItemCard
          text="Suggestions For You"
          items={[
            <RightBarUserSuggestion
              name="John Doii"
              image="/images/registerCardBg.jpg"
            />,
            <RightBarUserSuggestion
              name="John Die"
              image="/images/registerCardBg.jpg"
            />,
          ]}
        />
        <ItemCard
          text="Latest Activities"
          items={[
            <RightBarLatestActivities
              name="John Doii"
              image="/images/registerCardBg.jpg"
              activity="liked a post"
              time="1 min ago"
            />,
            <RightBarLatestActivities
              name="John Die"
              image="/images/registerCardBg.jpg"
              activity="updated profile picture"
              time="2 hours ago"
            />,
            <RightBarLatestActivities
              name="John Dooo"
              image="/images/registerCardBg.jpg"
              activity="liked a comment"
              time="3 hours ago"
            />,
            <RightBarLatestActivities
              name="John Dont"
              image="/images/registerCardBg.jpg"
              activity="posted"
              time="yesterday"
            />,
          ]}
        />
        <ItemCard
          text="Online Friends"
          items={[
            <RightBarOnlineFriends
              name="John Doii"
              image="/images/registerCardBg.jpg"
            />,
            <RightBarOnlineFriends
              name="John Doo"
              image="/images/registerCardBg.jpg"
            />,
            <RightBarOnlineFriends
              name="John Dont"
              image="/images/registerCardBg.jpg"
            />,
            <RightBarOnlineFriends
              name="John Die"
              image="/images/registerCardBg.jpg"
            />,
          ]}
        />
      </div>
    </div>
  );
}

export default RightBar;
