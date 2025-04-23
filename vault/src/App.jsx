import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Page/Home";
import LoginForm from "./Page/LoginForm";
import SignupForm from "./Page/SignupForm";
import ForgotPassword from "./Page/ForgotPassword";
import NewCars from "./Page/NewCars";
import ViewDetails from "./Page/ViewDetails";
import AdminLogin from "./Admin/AdminLogin";
import Footer from "./Components/Footer";
import UsedCars from "./Page/UsedCars";
import VerifyOTP from "./Page/VerifyOTP";
import NewPassword from "./Page/NewPassword";
import CompareModel from "./Page/CompareModel";
import Wishlist from "./Page/Wishlist";
import Accessory from "./Page/Accessory";
import AdminDashboard from "./Admin/AdminDashboard"; 
import AdminSidebar from "./Admin/AdminSidebar";
import Compare from "./Page/Compare";
import PrivateRoute from "./Components/PrivateRoute";
import Dashboard from "./Components/Dashboard";

const Layout = () => {
  const location = useLocation();
  const hideNavbar = ["/login", "/signup", "/forgotpassword", "/admin/login", "/reset-password", "/verify-otp", "/admin"].includes(location.pathname);
  const hideFooter = hideNavbar || location.pathname === "/compare";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Outlet />
      {!hideFooter && <Footer />}
    </>
  );
};

const AdminLayout = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> {/* Public home page */}
          <Route path="login" element={<LoginForm />} />
          <Route path="signup" element={<SignupForm />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
          <Route path="verify-otp" element={<VerifyOTP />} />
          <Route path="reset-password" element={<NewPassword />} />
          <Route path="newcars" element={<PrivateRoute><NewCars /></PrivateRoute>} />
          <Route path="usedcars" element={<PrivateRoute><UsedCars /></PrivateRoute>} />
          <Route path="compare" element={<PrivateRoute><Compare /></PrivateRoute>} />
          <Route path="cars/:id" element={<PrivateRoute><ViewDetails /></PrivateRoute>} />
          <Route path="favorites" element={<PrivateRoute><Wishlist /></PrivateRoute>} />
          <Route path="accessory" element={<PrivateRoute><Accessory /></PrivateRoute>} />
          <Route path="comparemodel" element={<PrivateRoute><CompareModel /></PrivateRoute>} />
          <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        </Route>
        <Route path="admin">
          <Route path="login" element={<AdminLogin />} />
          <Route element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="vehicles" element={<AdminDashboard />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;