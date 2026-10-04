import axios from "axios";
import { IoIosArrowDropdown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { API_END_POINT } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/userSlice";
import toast from "react-hot-toast";
import { setToggle } from "../../redux/movieSlice";

const Header = () => {
  const user = useSelector((store) => store.user.user);
  const toggle = useSelector((store) => store.movie.toggle);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const result = await axios.get(`${API_END_POINT}/logout`, {
        withCredentials: true,
      });

      if (result?.data?.success) {
        toast.success(result.data.message);
      }

      dispatch(setUser(null));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleHandler = () => {
    dispatch(setToggle());
  };

  return (
    <div className="absolute z-20 flex items-center justify-between px-6 w-[100%] bg-gradient-to-b from-black">
      <img
        className="w-56"
        src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original"
        alt="Netflix logo"
      />
      {user && (
        <div className="flex items-center">
          <IoIosArrowDropdown size={24} color="white" />
          <h1 className="text-lg font-semibold text-white">{user.name}</h1>
          <div className="ml-4">
            <button
              onClick={logoutHandler}
              className="bg-red-800 text-white px-4 py-2 cursor-pointer"
            >
              Logout
            </button>

            <button
              className="bg-red-800 text-white px-4 py-2 ml-2 cursor-pointer"
              onClick={toggleHandler}
            >
              {toggle ? "Home" : "Search Movie"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
