import React, { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function Stories() {
  const { currentUser } = useContext(AuthContext);
  const scrollRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  //hiding scrollbars
  const noScrollbarStyle = {
    WebkitOverflowScrolling: "touch", // For smooth scrolling on iOS
    overflowX: "scroll",
    overflowY: "hidden",
    scrollbarWidth: "none" /* Firefox */,
    msOverflowStyle: "none" /* IE and Edge */,
    scrollBehavior: "smooth", // Adding smooth scrolling
  };

  //handle horizontal scroll
  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === "left") {
      current.scrollLeft -= 300;
    } else {
      current.scrollLeft += 300;
    }
    checkArrows();
  };

  const checkOverflow = () => {
    const { current } = scrollRef;
    setIsOverflowing(current.scrollWidth > current.clientWidth);
    checkArrows(); // check for arrow visibility
  };

  // Check if arrows should be visible
  const checkArrows = () => {
    const { current } = scrollRef;
    setShowLeftArrow(current.scrollLeft > 0);
    setShowRightArrow(
      current.scrollLeft + current.clientWidth < current.scrollWidth
    );
  };

  // Update screen size state on window resize
  const handleResize = () => {
    setIsLargeScreen(window.innerWidth >= 1024);
  };

  useEffect(() => {
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", checkOverflow);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Temporary story data
  const storiesData = [
    {
      id: 1,
      name: "John Doesnt",
      image: "https://picsum.photos/300",
    },
    {
      id: 2,
      name: "Jane Doesnt",
      image: "https://picsum.photos/400",
    },
    {
      id: 3,
      name: "Sam Doesnt",
      image: "https://picsum.photos/500",
    },
    {
      id: 4,
      name: "Alex Doesnt",
      image: "https://picsum.photos/600",
    },
  ];

  return (
    <div className="mb-5 rounded-2xl shadow-xl bg-white dark:bg-gray-800 dark:text-white transition-colors duration-300 relative">
      {isOverflowing && isLargeScreen && showLeftArrow && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1 bg-white dark:bg-gray-800 text-black dark:text-white rounded-full shadow-lg z-10 flex justify-center items-center"
          style={{ fontSize: "0.75rem" }} // Define width and height to make it square
        >
          <ArrowBackIosIcon fontSize="small" />
        </button>
      )}

      {isOverflowing && isLargeScreen && showRightArrow && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 bg-white dark:bg-gray-800 text-black dark:text-white rounded-full shadow-lg z-10"
          style={{ fontSize: "0.75rem" }}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </button>
      )}
      <div
        ref={scrollRef}
        className="flex gap-4 h-32 p-4"
        style={noScrollbarStyle}
        onScroll={checkArrows}
      >
        <div className="relative flex-shrink-0">
          <img
            className="object-cover w-16 h-16 mb-1 rounded-full"
            src={currentUser.profilepic}
            alt="story"
          />
          <span className="absolute bottom-2 left-1.5 text-black dark:text-white text-xs font-normal">
            Your Story
          </span>

          <button className="absolute sm:bottom-8 sm:left-11 bottom-8 left-10 text-white bg-blue-500 border-0 rounded-full h-5 w-5 flex justify-center items-center cursor-pointer">
            <AddIcon fontSize="small" />
          </button>
        </div>
        {storiesData.map((story) => (
          <div className="relative flex-shrink-0" key={story.id}>
            <img
              className="object-cover w-16 h-16 mb-1 rounded-full"
              src={story.image}
              alt="story"
            />
            <span className="absolute bottom-2 left-2 text-black dark:text-white text-xs font-normal overflow-hidden w-14 overflow-ellipsis whitespace-nowrap">
              {story.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stories;
