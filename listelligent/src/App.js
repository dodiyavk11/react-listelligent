import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Nopage from "./Pages/Nopage";
import Singlepost from "./Pages/Singlepost";
import Howitwork from "./Pages/Howitwork";
import Agentslist from "./Pages/Agentslist";
import Agentprofile from "./Pages/Agentprofile";
import Agentsignup from "./Pages/Agents/Agentsignup";
import Howagentswork from "./Pages/Agents/Howagentswork";
import Myprofile from "./Pages/Agents/Myprofile";
import Dashboard from "./Pages/Admin/Dashboard";
import Icons from "./Pages/Admin/Icons";
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import Agentsignupform from "./Pages/Agents/Agentsignupform";
import Protectedrout from "./Pages/Admin/Protectedrout";
import Agentsview from "./Pages/Admin/Agentsview";
import Agentdashboard from "./Pages/Agents/Agentdashboard";
import Myproposals from "./Pages/Agents/Myproposals";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="singlepost" element={<Singlepost />} />
          <Route path="howitwork" element={<Howitwork />} />
          <Route path="agentslist" element={<Agentslist />} />
          <Route path="agentprofile" element={<Agentprofile />} />
          <Route path="agentsignup" element={<Agentsignup />} />
          <Route path="agentsignupform" element={<Agentsignupform />} />
          <Route path="howagentswork" element={<Howagentswork />} />
          <Route path="myprofile" element={<Myprofile />} />

          <Route path="login" element={<Protectedrout Component={Login} />} />
          <Route path="signup" element={<Signup />} />

          <Route path="admin/dashboard" element={<Protectedrout Component={Dashboard} />} />
          <Route path="admin/icons" element={<Protectedrout Component={Icons} />} />
          <Route path="admin/agentsview" element={<Protectedrout Component={Agentsview} />} />

          <Route path="agentDashboard" element={<Agentdashboard />} />
          <Route path="myProposal" element={<Myproposals />} />

          <Route path="*" element={<Nopage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
