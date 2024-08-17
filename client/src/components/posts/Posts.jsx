import React from "react";
import PostCard from "./PostCard";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

function Posts() {
  //temp
  const { isLoading, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      makeRequest.get("/posts").then((res) => {
        return res.data.rows;
      }),
  });
  return (
    <div className="flex flex-col gap-11text-gray-500 dark:text-white">
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading..."
        : data.map((post) => <PostCard post={post} key={post.id} />)}
    </div>
  );
}

export default Posts;
