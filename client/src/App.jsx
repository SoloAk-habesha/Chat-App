import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AuthTabs from "./pages/AuthTabs";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthTabs />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/verify/:token" element={<VerifyEmail />} />
      </Routes>
    </Router>
  );
}

export default App;
