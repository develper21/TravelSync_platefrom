import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signin from "./Pages/signin";
import Signup from "./Pages/signup";
import Homepage from "./Homepage/Homepage.jsx";
import TripPlanner1 from "./Trip-Planner/step1.jsx";
import TripPlanner2 from "./Trip-Planner/step2.jsx";
import About from "./About_us/about.jsx"
import ContactSection from "./Contact_us/contact.jsx";
import Blog from "./Blog/blog.jsx";
function App() {
  return (
  
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />       
        
        <Route path="/homepage" element={<Homepage />} />       
        <Route path="/Trip-planer1" element={<TripPlanner1 />} />
        <Route path="/trip-planer2" element={<TripPlanner2/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<ContactSection/>}/>
        <Route path="/blog" element={<Blog/>}/>      
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
