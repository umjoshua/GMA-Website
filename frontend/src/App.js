import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import DetailsPage from "./components/DetailsPage/DetailsPage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { createContext } from "react";
import events from "./data/EventData/EventData";
import MemRegistrationPage from "./pages/MemRegistrationPage/MemRegistrationPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ScrollToTop from "./ScrollToTop";

export const AppContext = createContext();

function App() {
  return (
    <AppContext.Provider value={events}>
      <BrowserRouter>
        <div className="App">
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:title" element={<DetailsPage />} />
            <Route path="/membership" element={<MemRegistrationPage />} />
            <Route path="/registerpage" element={<RegisterPage />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </AppContext.Provider >
  );
}

export default App;