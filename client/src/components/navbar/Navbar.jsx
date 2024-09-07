import React, { useState, useContext } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { AuthContext } from "../../context/authContext";
import MobileMenu from "../leftBar/MobileMenu";

function Navbar() {
  const { handleThemeSwitch, theme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  // dark mode and light mode icon
  const ThemeIcon =
    theme === "dark" ? WbSunnyOutlinedIcon : DarkModeOutlinedIcon;

  const MenuIcon = isMobileMenuOpen ? CloseOutlinedIcon : MenuOutlinedIcon;

  function handleMenuClick() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    console.log(isMobileMenuOpen);
  }

  return (
    <>
      <div className="flex z-20 items-center justify-between py-3 px-5 h-16 border-b border-gray-300 sticky top-0 bg-white dark:bg-gray-800 dark:text-white transition-colors duration-300">
        <div className="flex items-center gap-8">
          <div className="block xl:hidden">
            <MenuIcon onClick={handleMenuClick} className="cursor-pointer" />
          </div>
          <Link to="/">
            <span className="font-bold text-xl text-indigo-600">Name Here</span>
          </Link>
          <div className="sm:flex items-center gap-3 border border-gray-300 rounded-full py-1 px-4 w-72 hidden">
            <input
              className="border-0 w-96 focus:outline-none p-1 bg-transparent  "
              type="text"
              placeholder="Search"
            />
            <SearchOutlinedIcon />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <ThemeIcon
            onClick={handleThemeSwitch}
            className="hover:cursor-pointer hover:text-blue-400"
          />
          <NotificationsOutlinedIcon className="hover:cursor-pointer hover:text-blue-400" />
          <div className="flex items-center gap-2 font-semibold">
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={currentUser.profilepic}
              alt="profile"
            />
            <span className="hidden lg:block">{currentUser.name}</span>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 z-10">
          <MobileMenu />
        </div>
      )}
    </>
  );
}

export default Navbar;
