import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Components/FarmLearnLanding';
import Signup from './Components/Signup';
import Login from './Components/Login';
import FarmLearnLanding from './Components/FarmLearnLanding';
import AdminLogin from './Components/AdminLogin';
import FarmerDashboard from './Components/FarmerDashboard';
import AdminDashboard from './Components/AdminDashboard';
import Farmers from "./Components/Farmers";
import MarketPlace from './Components/Marketplace.jsx';


import FarmConnectTasks from './Components/FarmConnectTasks.jsx';
import CropTasks from './Components/CropTasks.jsx';
import TaskApproval from './Components/TaskApproval.jsx';
import ApplicationsManagement from './Components/ApplicationsManagement.jsx';
import ApplicationsPage from './Components/ApplicationsPage.jsx';
import Leaderboard from './Components/Leaderboard.jsx';
import Learning from './Components/Learning.jsx';
import AdminMarketplace from './Components/AdminMarketplace.jsx';



const App = () => {
  return (
    <Router>
      <Routes>
        {/* Landing page as the default route */}
        <Route path="/" element={<FarmLearnLanding />} />
        
        {/* Main app route */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
    
        <Route path="/adminlogin" element={<AdminLogin />}/>
        <Route path="/applicationsmanagement" element={<ApplicationsManagement/>}/>
        <Route path="/alltasks" element={<FarmConnectTasks/>}/>
          <Route path="/category/:categoryId/tasks" element={<CropTasks />} />
        <Route path="/farmerdashboard" element={<FarmerDashboard />}/>
        <Route path="/learning" element={<Learning />}/>
        <Route path="/admindashboard" element={<AdminDashboard />}/>
         <Route path="/farmers" element={<Farmers />} />
            <Route path="/tasksapproval" element={<TaskApproval />} />
            <Route path="/marketplace" element={<MarketPlace/>} />
            <Route path="/adminmarketplace" element={<AdminMarketplace/>} />
            <Route path="/applications" element={<ApplicationsPage/>} />
            <Route path="/leaderboard" element={<Leaderboard/>} />
            <Route path="/marketplace" element={<MarketPlace/>} />
          
        
        {/* Redirect any unknown paths to landing */}
        <Route path="*" element={<FarmLearnLanding />} />
      </Routes>
    </Router>
  );
};

export default App;