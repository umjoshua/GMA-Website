import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import DetailsPage from "./components/DetailsPage/DetailsPage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { createContext } from "react";
import events from "./data/EventData/EventData";
import MemRegistrationPage from "./pages/MemRegistrationPage/MemRegistrationPage";

export const AppContext = createContext();

function App() {
  return (
    <AppContext.Provider value={events}>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:title" element={<DetailsPage />} />
            <Route path="/membership" element={<MemRegistrationPage/>}/>
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;