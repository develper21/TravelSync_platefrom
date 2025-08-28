import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signin from "./Pages/signin";
import Signup from "./Pages/signup";


function App() {
return (
<BrowserRouter>
<Routes>
<Route path="/signin" element={<Signin />} />
<Route path="/signup" element={<Signup />} />


{/* default redirect */}
<Route path="*" element={<Navigate to="/signin" />} />
</Routes>
</BrowserRouter>
);
}


export default App;