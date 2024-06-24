import "./App.scss";
import About from "./Components/About/About.component";
import Footer from "./Components/Footer/Footer.component";
import LandingPage from "./Components/LandingPage/LandingPage.component";
import Login from "./Components/Login/Login.component";
import Navbar from "./Components/Navbar/Navbar.component";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
