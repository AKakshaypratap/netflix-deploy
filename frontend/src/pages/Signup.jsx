import { useState } from "react";
import axios from "axios";
import { API_END_POINT } from "../../utils/constants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/userSlice";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const isLoading = useSelector((store) => store.user.isLoading);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    
    const user = { name, email, password };
    try {
      const result = await axios.post(`${API_END_POINT}/register`, user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (result.data.success) {
        toast.success(result.data.message);
      }
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Cannot reach server. Make sure the backend is running on port 8080."
      );
      console.log(error);
    } finally {
      dispatch(setLoading(false));
      setName("");
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
        alt="Signup"
      />

      {/* Login Container */}
      <main className="relative z-10 flex min-h-screen items-center justify-center px-5">
        <div className="w-full max-w-md rounded-md bg-black/75 px-6 py-10 sm:px-12 sm:py-12">
          <h2 className="mb-7 text-3xl font-bold">Sign Up</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name */}
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded bg-[#333] px-4 py-4 text-sm text-white placeholder:text-gray-400 outline-none focus:bg-[#454545]"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email or mobile number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded bg-[#333] px-4 py-4 text-sm text-white placeholder:text-gray-400 outline-none focus:bg-[#454545]"
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded bg-[#333] px-4 py-4 text-sm text-white placeholder:text-gray-400 outline-none focus:bg-[#454545]"
            />

            {/* Sign Up */}
            <button
              type="submit"
              className="mt-2 w-full rounded bg-red-600 py-3 font-semibold transition hover:bg-red-700"
            >
              {isLoading ? 'Loading...' : 'Sign Up'}
            </button>
          </form>

          {/* Login */}
          <div className="mt-8 text-gray-400">
            <p>
              Already have an account?{" "}
              <a href="/" className="text-white hover:underline">
                Sign in now.
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

export default Signup;
