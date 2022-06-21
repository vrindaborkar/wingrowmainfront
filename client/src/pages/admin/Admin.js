import React from 'react'
import { Route, Routes } from "react-router-dom";
import Adminpage from './Adminpage';
//import OverallData from './OverallData';
import StallsData from './StallsData';
import VendorsData from './VendorsData';
import Dashboard from '../../pages1/Dashboard';
import MainLayout from '../../layout1/MainLayout';

const Admin = () => {
  return (
      <Routes>
          <Route path="/" exact element={<Adminpage/>}/>
          <Route path="/overalldata" element={<MainLayout />}>
          <Route index element={<Dashboard />} />         
          </Route>
          <Route path="/stalls" element={<StallsData/>}/>
          <Route path="/vendorsdata" element={<VendorsData/>}/>
        </Routes>
  )
}

export default Admin