import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signin from "./Pages/signin";
import Signup from "./Pages/signup";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";
import Homepage from "./Homepage/Homepage.jsx";
import TripPlanner1 from "./Trip-Planner/step1.jsx";
import TripPlanner2 from "./Trip-Planner/step2.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Navbar />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/Trip-planer1" element={<TripPlanner1 />} />
        <Route path="/trip-planer2" element={<TripPlanner2/>}/>
        {/* default redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
