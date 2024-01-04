import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
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
import agentLeads from "./Pages/Agents/agentLeads";
import Agentperformance from "./Pages/Agents/Agentperformance";
import Agentaccount from "./Pages/Agents/Agentaccount";
import AgentOrders from "./Pages/Agents/AgentOrders";
import Agentsfaq from "./Pages/Agents/Agentsfaq";
// import AgentProtectedR from "./Pages/Agents/AgentProtectedR";
import ZipCode from "./Pages/Admin/ZipCode";
import { AuthProvider } from "./AuthContext";
import PurchaseZip from "./Pages/Agents/PurchaseZip";
import Orders from "./Pages/Admin/Orders";
import Leads from "./Pages/Admin/Leads";
function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="singlepost" element={<Singlepost />} />
            <Route path="howitwork" element={<Howitwork />} />
            <Route path="agentslist" element={<Agentslist />} />
            <Route path="agentprofile/:id" element={<Agentprofile />} />
            <Route path="agentsignup" element={<Agentsignup />} />
            <Route path="agentsignupform" element={<Agentsignupform />} />
            <Route path="howagentswork" element={<Howagentswork />} />

            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />

            <Route
              path="admin/dashboard"
              element={<Protectedrout Component={Dashboard} />}
            />
            <Route
              path="admin/Orders"
              element={<Protectedrout Component={Orders} />}
            />
            <Route
              path="admin/leads"
              element={<Protectedrout Component={Leads} />}
            />
            <Route
              path="admin/agentsview"
              element={<Protectedrout Component={Agentsview} />}
            />
            <Route
              path="admin/zipcode"
              element={<Protectedrout Component={ZipCode} />}
            />

            <Route
              path="agentDashboard"
              element={<Protectedrout Component={Agentdashboard} />}
            />
            <Route
              path="myProposal"
              element={<Protectedrout Component={Myproposals} />}
            />
            <Route
              path="leads"
              element={<Protectedrout Component={agentLeads} />}
            />
            <Route
              path="agentPerformance"
              element={<Protectedrout Component={Agentperformance} />}
            />
            <Route
              path="myAgentProfile"
              element={<Protectedrout Component={Myprofile} />}
            />
            <Route
              path="agentsAccount"
              element={<Protectedrout Component={Agentaccount} />}
            />
            <Route
              path="agent/orders"
              element={<Protectedrout Component={AgentOrders} />}
            />
            <Route
              path="agentsFAQ"
              element={<Protectedrout Component={Agentsfaq} />}
            />

            <Route
              path="agent/purchase-zip"
              element={<Protectedrout Component={PurchaseZip} />}
            />

            <Route path="*" element={<Nopage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
