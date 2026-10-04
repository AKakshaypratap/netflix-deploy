import { useEffect, useState } from "react";
import axios from "axios";
import { API_END_POINT } from "../../utils/constants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = useSelector((store) => store.user.isLoading);
  const user = useSelector((store) => store.user.user);
  const authChecked = useSelector((store) => store.user.authChecked);

  useEffect(() => {
    if (authChecked && user) {
      navigate("/browse");
    }
  }, [authChecked, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    // console.log(email, password)
    // console.log(e.target.elements.email.value)
    const user = { email, password };

    try {
      const result = await axios.post(`${API_END_POINT}/login`, user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (result.data.success) {
        toast.success(result.data.message);
      }

      dispatch(setUser(result.data.user));
      navigate("/browse");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Cannot reach server. Make sure the backend is running on port 8080."
      );
      console.log(error);
    } finally {
      dispatch(setLoading(false));
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Background Image */}
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src="https://cdn.mos.cms.futurecdn.net/rDJegQJaCyGaYysj2g5XWY.jpg"
        alt="Login"
      />

      {/* Login Container */}
      <main className="relative z-10 flex min-h-screen items-center justify-center px-5">
        <div className="w-full max-w-md rounded-md bg-black/75 px-6 py-10 sm:px-12 sm:py-12">
          <h2 className="mb-7 text-3xl font-bold">Sign In</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email" // this is used when you want to acces value in handlesubmit button
              placeholder="Email or mobile number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded bg-[#333] px-4 py-4 text-sm text-white placeholder:text-gray-400 outline-none focus:bg-[#454545]"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded bg-[#333] px-4 py-4 text-sm text-white placeholder:text-gray-400 outline-none focus:bg-[#454545]"
            />

            <button
              type="submit"
              className="mt-2 w-full rounded bg-red-600 py-3 font-semibold transition hover:bg-red-700"
            >
              {isLoading ? "Loading..." : "Login"}
            </button>

            <div className="flex items-center justify-between text-xs text-gray-400">
              <label className="flex cursor-pointer items-center gap-2">
                <input type="checkbox" className="accent-gray-500" />
                Remember me
              </label>

              <a href="#" className="hover:underline">
                Need help?
              </a>
            </div>
          </form>

          <div className="mt-8 text-gray-400">
            <p>
              New to Netflix?{" "}
              <a href="/signup" className="text-white hover:underline">
                Sign up now.
              </a>
            </p>

            <p className="mt-4 text-xs leading-5">
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot.
            </p>

            <a href="#" className="text-xs text-blue-500 hover:underline">
              Learn more.
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
