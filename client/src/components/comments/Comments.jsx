import React from "react";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Comments = ({ postId }) => {
  const [desc, setDesc] = useState("");
  const [charCount, setCharCount] = useState(0);

  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["comments"],
    queryFn: () =>
      makeRequest.get("/comments?postid=" + postId).then((res) => {
        return res.data.rows;
      }),
  });

  const MAX_CHAR_LIMIT = 200;

  // handle text change
  const handleChange = (event) => {
    const { value } = event.target;
    if (value.length <= MAX_CHAR_LIMIT) {
      setDesc(value);
      setCharCount(value.length);
    }
  };

  //resize the textarea
  const handleInput = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const mutation = useMutation({
    mutationFn: (newComment) => makeRequest.post("/comments", newComment),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  });

  const handleClick = async (event) => {
    event.preventDefault();
    mutation.mutate({ desc, postid: postId });
    setDesc("");
    setCharCount(0);
  };

  return (
    <div className="">
      <div className="flex items-center justify-between gap-5 my-5">
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={currentUser.profilepic}
          alt=""
        />
        <textarea
          className="w-full p-2 focus:outline-none border-b-2 border-gray-500 dark:bg-gray-800 transition-colors duration-300 resize-none overflow-hidden"
          placeholder="Write a comment..."
          value={desc}
          onChange={handleChange}
          onInput={handleInput}
          rows={1}
        />
      </div>
      <div className="flex gap-4 text-sm justify-end items-center text-gray-500 dark:text-gray-300">
        <span>
          {charCount} / {MAX_CHAR_LIMIT}
        </span>
        <button
          className="py-1 px-3 border-0 rounded-full bg-blue-500 text-sm font-medium text-white"
          onClick={handleClick}
        >
          Send
        </button>
      </div>
      {isLoading
        ? "loading..."
        : data.map((comment) => (
            <div className="my-7 flex justify-between gap-5">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={comment.profilepic}
                alt=""
              />
              <div className="flex flex-col gap-1 items-start flex-[5]">
                <div className="flex w-full justify-between items-center">
                  <span className="font-medium">{comment.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">
                    {moment(comment.createdat).fromNow()}
                  </span>
                </div>

                <p className="dark:text-white text-sm">{comment.desc}</p>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Comments;
