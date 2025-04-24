import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from "./App";
import Navbar from "./components/navigation/Navbar";
import "./index.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import KidsPage from "./pages/categories/kids/KidsPage";
import MenPage from "./pages/categories/men/MenPage";
import WomenPage from "./pages/categories/women/WomenPage";
import Dashboard from "./pages/private/Dashboard";
import { PrivateRoute } from "./pages/PrivateRoute";
import ProductPage from "./pages/product/ProductPage";
// import PrivateRoute from "./pages/PrivateRoute";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/women" element={<WomenPage />} />
        <Route path="/men" element={<MenPage />} />
        <Route path="/kids" element={<KidsPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* <Route element={<PrivateRoute />}> */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* </Route> */}
      </Routes>
    </Router>
  </StrictMode>
);
