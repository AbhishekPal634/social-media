import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios.js";

function Share() {
  const [desc, setDesc] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [file, setFile] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

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

  //mutation
  const mutation = useMutation({
    mutationFn: (newPost) => makeRequest.post("/posts", newPost),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async (event) => {
    event.preventDefault();
    let imgURL = "";
    if (file) imgURL = await upload();
    mutation.mutate({ desc, img: imgURL });
    setFile(null);
    setDesc("");
    setCharCount(0);
  };

  return (
    <div className="flex rounded-2xl shadow-sm h-auto mb-4 py-4 px-4 sm:px-8 bg-white dark:bg-gray-800 dark:text-white transition-colors duration-300 items-center">
      <div className="w-full flex flex-col gap-5">
        <div className="flex gap-3 sm:gap-5">
          <img
            className="rounded-full object-cover h-10 w-10"
            src={currentUser.profilepic}
            alt="profile picture"
          />
          <textarea
            className="w-full p-2 focus:outline-none border-b-2 border-gray-500 dark:bg-gray-800 transition-colors duration-300 resize-none overflow-hidden"
            placeholder={`What's on your mind ${currentUser.name}?`}
            value={desc}
            onChange={handleChange}
            onInput={handleInput}
            rows={1}
          />
        </div>
        <div>
          {file && (
            <img
              className="sm:w-32 w-24 rounded-md"
              alt="uploaded image"
              src={URL.createObjectURL(file)}
            />
          )}
        </div>
        <div className="flex justify-between">
          <input
            type="file"
            id="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(event) => setFile(event.target.files[0])}
          />
          <label htmlFor="file">
            <div className="flex justify-center items-center gap-2 cursor-pointer">
              <AddPhotoAlternateOutlinedIcon className="text-gray-500 dark:text-gray-300" />
              <span className="text-sm text-gray-500 dark:text-gray-300">
                Add Image
              </span>
            </div>
          </label>
          <div className="flex gap-4 text-sm justify-center items-center text-gray-500 dark:text-gray-300">
            <span>
              {charCount} / {MAX_CHAR_LIMIT}
            </span>
            <button
              className="border-0 py-1 px-5 text-white cursor-pointer bg-blue-500 rounded-full text-lg"
              onClick={handleClick}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Share;
