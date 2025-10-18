<<<<<<< HEAD
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
  

=======
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Context Providers
import { AuthProvider } from './contexts/AuthContext';

// Page Components
import Home from './pages/public/Home';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import Blog from './pages/public/Blog';

// Auth Pages
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';

// Dashboard Pages
import Profile from './pages/dashboard/Profile';
import Payment from './pages/dashboard/Payment';

// Trip Planning Pages
import TripStep1 from './pages/trips/step1';
import TripStep2 from './pages/trips/step2';
import TripStep3 from './pages/trips/step3';
import TripStep4 from './pages/trips/step4';
import TripStep5 from './pages/trips/step5';
import TripStep6 from './pages/trips/step6';

// Booking Pages
import Explore from './pages/bookings/Explore';

// Common Components
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />

            {/* Authentication Routes */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Protected Routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              }
            />

            {/* Trip Planning Routes */}
            <Route
              path="/trip-planner-1"
              element={
                <ProtectedRoute>
                  <TripStep1 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/trip-planner-2"
              element={
                <ProtectedRoute>
                  <TripStep2 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/trip-planner-3"
              element={
                <ProtectedRoute>
                  <TripStep3 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/trip-planner-4"
              element={
                <ProtectedRoute>
                  <TripStep4 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/trip-planner-5"
              element={
                <ProtectedRoute>
                  <TripStep5 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/trip-planner-6"
              element={
                <ProtectedRoute>
                  <TripStep6 />
                </ProtectedRoute>
              }
            />

            {/* Booking Routes */}
            <Route
              path="/explore"
              element={
                <ProtectedRoute>
                  <Explore />
                </ProtectedRoute>
              }
            />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
>>>>>>> 5843ee64e9cfb9ff294e0addad2775d7df39d52c
  );
}

export default App;
