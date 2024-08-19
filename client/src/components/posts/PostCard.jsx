import React, { useContext, useState } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function PostCard({ post }) {
  const [commentOpen, setCommentOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["likes", post.id],
    queryFn: () =>
      makeRequest.get("/likes?postid=" + post.id).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (liked) => {
      if (liked) {
        return makeRequest.delete("/likes?postid=" + post.id);
      } else {
        return makeRequest.post("/likes", { postid: post.id });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["likes"]);
    },
  });

  const handleLike = () => {
    mutation.mutate(data && data.includes(currentUser.id));
  };

  return (
    <div className="shadow-sm px-5 py-1 rounded-2xl mb-4 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="sm:p-5 px-0 py-3">
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={post.profilepic}
              alt="profile image"
            />
            <div className="flex flex-col">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="flex flex-col">
                  <span className="font-medium">{post.name}</span>
                </div>
              </Link>
              <span className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">
                {moment(post.createdat).fromNow()}
              </span>
            </div>
          </div>
          <MoreHorizOutlinedIcon />
        </div>
        <div>
          {/* Conditionally render the image */}
          {post.img && (
            <img
              className="w-full max-h-96 object-cover mt-5"
              src={"./upload/" + post.img}
              alt="post media"
            />
          )}
          <p className="mt-4 mb-7 text-md">{post.desc}</p>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 text-sm">
              {isLoading ? (
                "Loading..."
              ) : data && data.includes(currentUser.id) ? (
                <FavoriteOutlinedIcon
                  className="text-red-500 cursor-pointer"
                  onClick={handleLike}
                />
              ) : (
                <FavoriteBorderOutlinedIcon
                  className="cursor-pointer"
                  onClick={handleLike}
                />
              )}
              <span>{data ? data.length : 0}</span>
            </div>
            <div
              className="flex items-center gap-2 text-sm"
              onClick={() => {
                setCommentOpen(!commentOpen);
              }}
            >
              <TextsmsOutlinedIcon />
              12
            </div>
            <div className="flex items-center gap-2 cursor-pointer text-sm">
              <ShareOutlinedIcon />
            </div>
          </div>
          <div>
            <BookmarkBorderOutlinedIcon />
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
}

export default PostCard;
