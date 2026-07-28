import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from "./Pages/LandingPage";
import { SignUp } from "./Pages/SignUp";
import { LogIn } from "./Pages/LogIn";
import { Dashboard } from "./Pages/Dashboard";
import { ViewContent } from "./Pages/ViewContent";

// Decides what to show at the root path based on whether the user is logged in
function RootRoute() {
    const token = localStorage.getItem("token");
    if (token) {
        return <Dashboard />;
    }
    return <LandingPage />;
}

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<RootRoute />} />
                    <Route path="/LandingPage" element={<LandingPage />} />
                    <Route path="/Scriptify/User/SignUp" element={<SignUp />} />
                    <Route path="/Scriptify/User/Login" element={<LogIn />} />
                    <Route path="/Scriptify/User/Dashboard" element={<Dashboard />} />
                    <Route path="/Scriptify/User/View/Content" element={<ViewContent />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
