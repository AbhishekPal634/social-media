// import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import PinterestIcon from "@mui/icons-material/Pinterest";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import PlaceIcon from "@mui/icons-material/Place";
// import LanguageIcon from "@mui/icons-material/Language";
// import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import Posts from "../../components/posts/Posts";
// import { useQuery } from "@tanstack/react-query";
// import { makeRequest } from "../../axios";
// import { useLocation } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../../context/authContext";

// function Profile() {
//   const location = useLocation();
//   const userId = parseInt(location.pathname.split("/")[2]);

//   const { currentUser } = useContext(AuthContext);

//   const { isLoading, error, data } = useQuery({
//     queryKey: ["user", userId],
//     queryFn: () =>
//       makeRequest.get("/users/find/" + userId).then((res) => {
//         return res.data;
//       }),
//     enabled: !!userId,
//   });

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error loading profile!</div>;
//   }

//   if (!data) {
//     return <div>No user data available!</div>;
//   }

//   const handleFollow = () => {};

//   return (
//     <div className="bg-gray-100 dark:bg-gray-700 transition-colors duration-300">
//       <div className="w-full h-72 relative">
//         <img
//           src={data.coverpic}
//           alt="cover image"
//           className="w-full h-full object-cover"
//         />
//         <img
//           src={data.profilepic}
//           alt="profile image"
//           className="w-48 h-48 object-cover rounded-full absolute left-0 right-0 m-auto top-48"
//         />
//       </div>
//       <div className="py-5 px-6">
//         <div className="h-56 shadow-sm rounded-2xl bg-white dark:bg-gray-800 dark:text-white transition-colors duration-300 p-2 sm:p-12 flex items-center justify-between mb-4 max-sm:flex-col max-sm:h-80">
//           <div className="sm:flex-1 flex gap-2 max-sm:mt-20">
//             <a href="http://facebook.com">
//               <FacebookTwoToneIcon fontSize="medium" />
//             </a>
//             <a href="http://facebook.com">
//               <InstagramIcon fontSize="medium" />
//             </a>
//             <a href="http://facebook.com">
//               <TwitterIcon fontSize="medium" />
//             </a>
//             <a href="http://facebook.com">
//               <LinkedInIcon fontSize="medium" />
//             </a>
//             <a href="http://facebook.com">
//               <PinterestIcon fontSize="medium" />
//             </a>
//           </div>
//           <div className="sm:flex-1 flex flex-col items-center gap-2 sm:mt-10">
//             <span className="text-3xl font-medium">{data.name}</span>
//             <div className="flex items-center justify-around w-full">
//               <div className="flex items-center gap-1 text-gray-400">
//                 <PlaceIcon fontSize="medium" />
//                 <span className="text-sm">{data.city}</span>
//               </div>
//               <div className="flex items-center gap-1 text-gray-400">
//                 <LanguageIcon fontSize="medium" />
//                 <span className="text-sm">{data.website}</span>
//               </div>
//             </div>
//             {userId === currentUser.id ? (
//               <button className="py-1 px-3 border-0 rounded-full bg-blue-500 text-sm font-medium text-white">
//                 Update
//               </button>
//             ) : (
//               <button
//                 className="py-1 px-3 border-0 rounded-full bg-blue-500 text-sm font-medium text-white"
//                 onClick={handleFollow}
//               >
//                 Follow
//               </button>
//             )}
//           </div>
//           <div className="sm:flex-1 flex items-center justify-end gap-2">
//             <EmailOutlinedIcon fontSize="medium" />
//             <MoreVertIcon fontSize="medium" />
//           </div>
//         </div>
//         <Posts />
//       </div>
//     </div>
//   );
// }

// export default Profile;

import React, { useState, useContext } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
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
import Update from "../../components/update/Update";

function Profile() {
  const location = useLocation();
  const userId = parseInt(location.pathname.split("/")[2]);
  const { currentUser } = useContext(AuthContext);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const { isLoading, error, data } = useQuery({
    queryKey: ["user", userId],
    queryFn: () =>
      makeRequest.get(`/users/find/${userId}`).then((res) => res.data),
    enabled: !!userId,
  });

  const { data: relationshipData = [] } = useQuery({
    queryKey: ["relationship"],
    queryFn: () =>
      makeRequest
        .get(`/relationships?followedUserId=${userId}`)
        .then((res) => res.data),
    enabled: !!userId,
  });

  React.useEffect(() => {
    setIsFollowing(relationshipData.includes(currentUser.id));
  }, [relationshipData, currentUser.id]);

  const mutation = useMutation({
    mutationFn: (following) => {
      if (following) {
        return makeRequest.delete(`/relationships?userId=${userId}`);
      }
      return makeRequest.post("/relationships", { userId });
    },
    onSuccess: () => {
      // Update local state immediately
      setIsFollowing((prev) => !prev);
    },
  });

  const handleFollow = () => {
    mutation.mutate(isFollowing);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading profile!</div>;
  }

  if (!data) {
    return <div>No user data available!</div>;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-700 transition-colors duration-300">
      <div className="w-full h-72 relative">
        <img
          src={data.coverpic}
          alt="cover image"
          className="w-full h-full object-cover"
        />
        <img
          src={data.profilepic}
          alt="profile image"
          className="w-48 h-48 object-cover rounded-full absolute left-0 right-0 m-auto top-48"
        />
      </div>
      <div className="py-5 px-6">
        <div className="h-56 shadow-sm rounded-2xl bg-white dark:bg-gray-800 dark:text-white transition-colors duration-300 p-2 sm:p-12 flex items-center justify-between mb-4 max-sm:flex-col max-sm:h-80">
          <div className="sm:flex-1 flex gap-2 max-sm:mt-20">
            <a
              href="http://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookTwoToneIcon fontSize="medium" />
            </a>
            <a
              href="http://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon fontSize="medium" />
            </a>
            <a
              href="http://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIcon fontSize="medium" />
            </a>
            <a
              href="http://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon fontSize="medium" />
            </a>
            <a
              href="http://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <PinterestIcon fontSize="medium" />
            </a>
          </div>
          <div className="sm:flex-1 flex flex-col items-center gap-2 sm:mt-10">
            <span className="text-3xl font-medium">{data.name}</span>
            <div className="flex items-center justify-around w-full">
              <div className="flex items-center gap-1 text-gray-400">
                <PlaceIcon fontSize="medium" />
                <span className="text-sm">{data.city}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <LanguageIcon fontSize="medium" />
                <span className="text-sm">{data.website}</span>
              </div>
            </div>
            {userId === currentUser.id ? (
              <button
                className="py-1 px-3 border-0 rounded-full bg-blue-500 text-sm font-medium text-white"
                onClick={() => setOpenUpdate(true)}
              >
                Update
              </button>
            ) : (
              <button
                className="py-1 px-3 border-0 rounded-full bg-blue-500 text-sm font-medium text-white"
                onClick={handleFollow}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            )}
          </div>
          <div className="sm:flex-1 flex items-center justify-end gap-2">
            <EmailOutlinedIcon fontSize="medium" />
            <MoreVertIcon fontSize="medium" />
          </div>
        </div>
        <Posts userId={userId} />
      </div>
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
}

export default Profile;
