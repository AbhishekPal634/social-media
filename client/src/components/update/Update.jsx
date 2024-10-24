import { useState } from "react";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Update = ({ setOpenUpdate, user }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    email: user.email,
    password: user.password,
    name: user.name,
    city: user.city,
    website: user.website,
  });

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (user) => {
      return makeRequest.put("/users", user);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();

    let coverUrl = cover ? await upload(cover) : user.coverPic;
    let profileUrl = profile ? await upload(profile) : user.profilePic;

    mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
    setOpenUpdate(false);
    setCover(null);
    setProfile(null);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/2 shadow-lg">
        <h1 className="text-lg font-semibold text-gray-700">
          Update Your Profile
        </h1>
        <form>
          <div className="flex flex-wrap gap-4 mb-4">
            <label htmlFor="cover" className="flex flex-col">
              <span className="text-gray-600">Cover Picture</span>
              <div className="relative">
                <img
                  src={
                    cover
                      ? URL.createObjectURL(cover)
                      : "/upload/" + user.coverPic
                  }
                  alt=""
                  className="w-full h-24 object-cover rounded-lg"
                />
                <CloudUploadIcon className="absolute top-0 left-0 right-0 bottom-0 m-auto text-gray-400 cursor-pointer" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              className="hidden"
              onChange={(e) => setCover(e.target.files[0])}
            />
            <label htmlFor="profile" className="flex flex-col">
              <span className="text-gray-600">Profile Picture</span>
              <div className="relative">
                <img
                  src={
                    profile
                      ? URL.createObjectURL(profile)
                      : "/upload/" + user.profilePic
                  }
                  alt=""
                  className="w-24 h-24 object-cover rounded-full"
                />
                <CloudUploadIcon className="absolute top-0 left-0 right-0 bottom-0 m-auto text-gray-400 cursor-pointer" />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              className="hidden"
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>
          {["email", "password", "name", "city", "website"].map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-gray-600">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                value={texts[field]}
                name={field}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          ))}
          <button
            onClick={handleClick}
            className="w-full bg-blue-500 text-white rounded-md py-2 mt-4 hover:bg-blue-600 transition"
          >
            Update
          </button>
        </form>
        <button
          className="absolute top-2 right-2 bg-red-500 text-white rounded-md p-1"
          onClick={() => setOpenUpdate(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Update;
