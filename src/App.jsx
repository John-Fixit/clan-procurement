import { Route, Routes, useNavigate } from "react-router-dom";
import Signin from "./pages/Signin";
import HomeLayout from "./layout/home-layout/HomeLayout";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import OKRDashboard from "./pages/OKRDashboard";
import Vendor from "./pages/Vendor";
import Projects from "./pages/Projects";
import Taxes from "./pages/Taxes";
import Report from "./pages/Report";
import Setting from "./pages/Setting";
import DocumentSetting from "./pages/DocumentSetting";
import Approval from "./pages/Approval";
import RolePermissionSetting from "./pages/RolePermissionSetting";
import ProtectedRoute from "./components/protected-route";
import AllProcurement from "./pages/AllProcurement";

function App() {
  const RedirectToHome = () => {
    const navigate = useNavigate();

    useEffect(() => {
      navigate("/dashboard", { replace: true });
    }, [navigate]);

    return null;
  };

  return (
    <>
      <Routes>
        <Route path="/login" element={<Signin />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomeLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<RedirectToHome />} />

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="okrs" element={<OKRDashboard />} />
          <Route path="vendor" element={<Vendor />} />
          <Route path="project" element={<Projects />} />
          <Route path="project/procurement" element={<AllProcurement />} />
          <Route path="project/request" element={<Projects />} />
          <Route path="approval" element={<Approval />} />
          <Route path="report" element={<Report />} />
          <Route path="setting" element={<Setting />} />
          <Route path="setting/tax" element={<Taxes />} />
          <Route path="setting/document" element={<DocumentSetting />} />
          <Route
            path="setting/permission"
            element={<RolePermissionSetting />}
          />
        </Route>
        <Route path="*" element={<></>} />
      </Routes>
    </>
  );
}

export default App;
