import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Comments = () => {
  const { currentUser } = useContext(AuthContext);
  //Temporary
  const comments = [
    {
      id: 1,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
      name: "John Doe",
      userId: 1,
      profilePicture:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
      name: "Jane Doe",
      userId: 2,
      profilePicture:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
  ];
  return (
    <div className="">
      <div className="flex items-center justify-between gap-5 my-5">
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={currentUser.profilepic}
          alt=""
        />
        <input
          className="w-full p-2 focus:outline-none border-b-2 border-gray-500 dark:bg-gray-800 transition-colors duration-300"
          type="text"
          placeholder="write a comment"
        />
        <button className="py-1 px-3 border-0 rounded-full bg-blue-500 text-sm font-medium text-white">
          Send
        </button>
      </div>
      {comments.map((comment) => (
        <div className="my-7 flex justify-between gap-5">
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={comment.profilePicture}
            alt=""
          />
          <div className="flex flex-col gap-1 items-start flex-[5]">
            <div className="flex w-full justify-between items-center">
              <span className="font-medium">{comment.name}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">
                1 hour ago
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
