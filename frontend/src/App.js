import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import DetailsPage from "./components/DetailsPage/DetailsPage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { createContext, useState, useEffect } from "react";
import MemRegistrationPage from "./pages/MemRegistrationPage/MemRegistrationPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ScrollToTop from "./ScrollToTop";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminHome from "./pages/Admin/AdminHome";
import Adminnavbar from "./components/Admin/AdminNavbar/Adminnavbar";
import CommitteePage from "./pages/CommitteePage/CommitteePage";
import EventsPage from "./pages/Events/EventsPage";
import Gallery from "./pages/Gallery/Gallery";
import * as api from './api'

export const AppContext = createContext();

function App() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.fetchEvents();
      setEvents(response?.data);
    };
    fetchData();
  }, [])

  const [adminPage, setAdminPage] = useState(0);
  const location = useLocation();
  const user = localStorage.getItem("token")
  return (
    <AppContext.Provider value={events}>
      <ScrollToTop />
      {location.pathname === "/admin" ?
        <div className="admin">
          <Routes>
            <Route path="/admin"
              element={!user ? <AdminLogin /> : <>
                <Adminnavbar setAdminPage={setAdminPage} />
                <AdminHome adminPage={adminPage} />
              </>}
            />
          </Routes>
        </div>
        :
        <div className="App">
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/event/:id" element={<DetailsPage />} />
              <Route path="/membership" element={<MemRegistrationPage />} />
              <Route path="/register/:id" element={<RegisterPage />} />
              <Route path="/committee" element={<CommitteePage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/gallery" element={<Gallery />} />
            </Routes>
          </div>
          <Footer className="footer" />
        </div>}
    </AppContext.Provider >
  );
}

export default App;