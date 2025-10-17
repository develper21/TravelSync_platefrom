import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signin from "./Pages/signin";
import Signup from "./Pages/signup";
import Homepage from "./Homepage/Homepage.jsx";
import ProfilePage from "./profile/profilePage.jsx";
import PaymentPage from "./payment/PaymentPage.jsx"
import TripPlanner1 from "./Trip-Planner/step1.jsx";
import TripPlanner2 from "./Trip-Planner/step2.jsx";
import TripPlanner3 from "./Trip-Planner/step3.jsx";
import TripPlanner5 from "./Trip-Planner/step5.jsx";
import TripPlanner6 from "./Trip-Planner/step6.jsx";

import About from "./About/about.jsx";
import ContactSection from "./Contact_us/contact.jsx";
import Blog from "./Blog/blog.jsx";
function App() {
  return (
  
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/about" element={<About/>}/>
        <Route path="/homepage" element={<Homepage />} />

        <Route path="/tripPlanner1" element={<TripPlanner1 />} />
        <Route path="/tripPlanner2" element={<TripPlanner2/>}/>
        <Route path="/tripPlanner3" element={<TripPlanner3/>}/>
        <Route path="/tripPlanner5" element={<TripPlanner5/>}/>
        <Route path="/tripPlanner6" element={<TripPlanner6/>}/>

        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/Payment" element={<PaymentPage/>}/>
        
        <Route path="/contact" element={<ContactSection/>}/>
        <Route path="/blog" element={<Blog/>}/>      
        <Route path="*" element={<Navigate to="/about" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
