import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navigationbar from "./components/Navigationbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/dashboard/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/profile/Profile";
import HomeRent from "./pages/dashboard/HomeRent";
import D1 from "./pages/dashboard/D1";
import ElectricityBill from "./pages/dashboard/ElectricityBill";
import PayOnline from "./pages/dashboard/PayOnline";
import PaymentHistory from "./pages/dashboard/PaymentHistory";
import AdminDashboard from "./pages/admin/Dashboard.admin";
import AdminProfile from "./pages/admin/Profile.admin";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPanel from "./pages/admin/AdminPanel";
import AdminUsers from "./pages/admin/Users.admin";
import AdminUser from "./pages/admin/User.admin";
import { store } from "./app/store"; // Import the store
import AdminUserBill from "./pages/admin/ElectricityBill";
import AdminUserPayment from "./pages/admin/Payment.admin";
import AdminUserRent from "./pages/admin/Rent.admin";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navigationbar />
        <ToastContainer position="top-right" theme="colored" autoClose={2500} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/users/auth/register" element={<Register />} />
          <Route path="/users/auth/login" element={<Login />} />

          {/* User Routes */}
          <Route
            path="/users/:userId/profile"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/:userId/dashboard"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route path="" element={<D1 />} />
            <Route path="home-rent" element={<HomeRent />} />
            <Route path="electricity-bill" element={<ElectricityBill />} />
            <Route path="online-payment" element={<PayOnline />} />
            <Route path="payment-history" element={<PaymentHistory />} />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminPanel />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="users/:id" element={<AdminUser />} />
            <Route path="users/:id/rent" element={<AdminUserRent />} />
            <Route path="users/:id/electricity-bill" element={<AdminUserBill />} />
            <Route path="users/:id/payment" element={<AdminUserPayment />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
