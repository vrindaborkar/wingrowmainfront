import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import AOS from 'aos'
import 'aos/dist/aos.css';
import CartPage from "./pages/Customer/Cart";
import GlobalState from "./context/GlobalState";
import ProductDetails from "./pages/Customer/ProductDetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Farmer from "./pages/Farmers/Farmer";
import Admin from "./pages/admin/Admin";
import Bookings from "./pages/bookings/Bookings";
import Customer from "./pages/Customer/Customer";



function App() {
  AOS.init({duration : 3000})
  return (
    <>
    <GlobalState>
      <BrowserRouter>
        <Navbar />
        <div className="content">
        <Routes>
          <Route path="/" exact element={<Dashboard/>}/>
          <Route path="/admin/*" element={<Admin/>}/>
          <Route path="/bookings/*" element={<Bookings/>}/>
          <Route path="/customers" element={<Customer/>}/>
          <Route path="/cart" element={<CartPage/>}/>        
          <Route path="/customers/productdetails/:item" element={<ProductDetails/>}/>
          <Route path="/farmers/*" element={<Farmer/>}/>
          </Routes>
        </div>
      </BrowserRouter>
      </GlobalState>
    </>
  );
}

export default App;
