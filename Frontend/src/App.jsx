import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/public/Home';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import Blog from './pages/public/Blog';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Profile from './pages/dashboard/Profile';
import Payment from './pages/dashboard/Payment';
import TripStep1 from './pages/trips/step1';
import TripStep2 from './pages/trips/step2';
import TripStep3 from './pages/trips/step3';
import TripStep4 from './pages/trips/step4';
import TripStep5 from './pages/trips/step5';
import TripStep6 from './pages/trips/step6';
import Explore from './pages/bookings/Explore';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
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
            <Route
              path="/explore"
              element={
                <ProtectedRoute>
                  <Explore />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
