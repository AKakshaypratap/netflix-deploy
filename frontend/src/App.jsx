import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Browse from "./pages/Browse";
import Signup from "./pages/Signup";
import MovieDialog from "./components/MovieDialog";
import { API_END_POINT } from "../utils/constants";
import { setAuthChecked, setUser } from "../redux/userSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await axios.get(`${API_END_POINT}/me`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setUser(res.data.user));
        }
      } catch {
        dispatch(setUser(null));
      } finally {
        dispatch(setAuthChecked(true));
      }
    };

    restoreSession();
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Toaster />
        <Header />
        <MovieDialog/>
      </div>
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/browse" element={<Browse />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
