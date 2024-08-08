import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";

function Profile() {
  return (
    <div className="bg-gray-100 dark:bg-gray-700 transition-colors duration-300">
      <div className="w-full h-72 relative">
        <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="cover image"
          className="w-full h-full object-cover"
        />
        <img
          src="https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
          alt="profile image"
          className="w-48 h-48 object-cover rounded-full absolute left-0 right-0 m-auto top-48"
        />
      </div>
      <div className="py-5 px-6">
        <div className="h-56 shadow-sm rounded-2xl bg-white dark:bg-gray-800 dark:text-white transition-colors duration-300 p-2 sm:p-12 flex items-center justify-between mb-4 max-sm:flex-col max-sm:h-80">
          <div className="sm:flex-1 flex gap-2 max-sm:mt-20">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="medium" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="medium" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="medium" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="medium" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="medium" />
            </a>
          </div>
          <div className="sm:flex-1 flex flex-col items-center gap-2 sm:mt-10">
            <span className="text-3xl font-medium">Jane Doe</span>
            <div className="flex items-center justify-around w-full">
              <div className="flex items-center gap-1 text-gray-400">
                <PlaceIcon fontSize="medium" />
                <span className="text-sm">USA</span>
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <LanguageIcon fontSize="medium" />
                <span className="text-sm">website.com</span>
              </div>
            </div>
            <button className="py-1 px-3 border-0 rounded-full bg-blue-500 text-sm font-medium text-white">
              Follow
            </button>
          </div>
          <div className="sm:flex-1 flex items-center justify-end gap-2">
            <EmailOutlinedIcon fontSize="medium" />
            <MoreVertIcon fontSize="medium" />
          </div>
        </div>
        <Posts />
      </div>
    </div>
  );
}

export default Profile;
