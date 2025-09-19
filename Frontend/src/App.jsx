import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signin from "./Pages/signin";
import Signup from "./Pages/signup";
import Homepage from "./Homepage/Homepage.jsx";
import TripPlanner1 from "./Trip-Planner/step1.jsx";
import TripPlanner2 from "./Trip-Planner/step2.jsx";
import About from "./About_us/about.jsx";
import ContactSection from "./Contact_us/contact.jsx";
import Blog from "./Blog/blog.jsx";
import Dashboard from "./Dashboard/dashboard.jsx";
import TripPlanner3 from "./Trip-Planner/step3.jsx";
import TripPlanner4 from "./Trip-Planner/step4.jsx";
import TripPlanner5 from "./Trip-Planner/step5.jsx";
import Explore from "./Explore/explore.jsx";
import Bookingexplore from "./Explore/bookingsdetail.jsx";
import Payment from "./Payment/payment.jsx";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";



function App() {
  return (
 
    <BrowserRouter>

      <Navbar />
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />    
        <Route path="/homepage" element={<Homepage />} />       
        <Route path="/Trip-planer1" element={<TripPlanner1 />} />
        <Route path="/trip-planer2" element={<TripPlanner2/>}/>
        <Route path="/trip-planer3" element={<TripPlanner3/>}/>
        <Route path="/trip-planer4" element={<TripPlanner4/>}/>
        <Route path="/trip-planer5" element={<TripPlanner5/>}/>
        <Route path="/explore" element={<Explore/>}/>
        <Route path="/bookingexplore" element={<Bookingexplore/>}/>
        <Route path="/payment" element={<Payment/>}/>
        <Route path="/" element={<Navigate to="/homepage" />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<ContactSection/>}/>
        <Route path="/blog" element={<Blog/>}/>  
        <Route path="/profile" element={<Dashboard/>}/>  
        
         
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

 <Footer />

    </BrowserRouter>
  

  );
}

export default App;
