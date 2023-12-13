import { Route, Routes } from "react-router-dom";
import SearchPage from "../pages/search";
import LoginPage from "../pages/login";
import CircumPage from "../pages/circum";
import CollegePage from "../pages/college";
import TribePage from "../pages/tribe";
import ProfilePage from "../pages/profile";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/LoginPage" element={<LoginPage />} />
            <Route path="/CircumPage" element={<CircumPage />} />
            <Route path="/CollegePage" element={<CollegePage />} />
            <Route path="/TribePage" element={<TribePage />} />
            <Route path="/ProfilePage" element={<ProfilePage />} />
        </Routes>
    );
}
