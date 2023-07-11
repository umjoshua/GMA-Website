import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import DetailsPage from "./components/DetailsPage/DetailsPage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { createContext, useState } from "react";
import events from "./data/EventData/EventData";
import MemRegistrationPage from "./pages/MemRegistrationPage/MemRegistrationPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ScrollToTop from "./ScrollToTop";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminHome from "./pages/Admin/AdminHome";
import Adminnavbar from "./components/AdminNavbar/Adminnavbar";

export const AppContext = createContext();

function App() {
  const [adminPage, setAdminPage] = useState(0);
  const location = useLocation();
  const user = localStorage.getItem("token")
  return (
    <AppContext.Provider value={events}>
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
          <ScrollToTop />
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/details/:title" element={<DetailsPage />} />
              <Route path="/membership" element={<MemRegistrationPage />} />
              <Route path="/registerpage" element={<RegisterPage />} />
            </Routes>
          </div>
          <Footer className="footer" />
        </div>}
    </AppContext.Provider >
  );
}

export default App;