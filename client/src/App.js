import "./App.scss";
import About from "./Components/About/About.component";
import Footer from "./Components/Footer/Footer.component";
import LandingPage from "./Components/LandingPage/LandingPage.component";
import Login from "./Components/Login/Login.component";
import Navbar from "./Components/Navbar/Navbar.component";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.component";
import Dashboard from "./Components/Dashboard/Dashboard.component";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
