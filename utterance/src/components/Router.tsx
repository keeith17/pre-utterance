import { Navigate, Route, Routes } from "react-router-dom";
import SearchPage from "@/pages/search";
import LoginPage from "@/pages/login";
import CircumPage from "@/pages/circum";
import CollegePage from "@/pages/college";
import TribePage from "@/pages/tribe";
import ProfilePage from "@/pages/profile";
import AddIdPage from "@/pages/admin/addId";
import SearchDetailPage from "@/pages/search/detail";

interface RouterProps {
    isAuthenticated: boolean;
}

export default function Router({ isAuthenticated }: RouterProps) {
    return (
        <Routes>
            {isAuthenticated ? (
                <>
                    <Route path="/" element={<SearchPage />} />
                    <Route path="/:id" element={<SearchDetailPage />} />
                    <Route path="/CircumPage" element={<CircumPage />} />
                    <Route path="/CollegePage" element={<CollegePage />} />
                    <Route path="/TribePage" element={<TribePage />} />
                    <Route path="/ProfilePage" element={<ProfilePage />} />
                </>
            ) : (
                <>
                    <Route path="/LoginPage" element={<LoginPage />} />
                    <Route path="/admin" element={<AddIdPage />} />
                    <Route
                        path="*"
                        element={<Navigate replace to="/LoginPage" />}
                    />
                </>
            )}
        </Routes>
    );
}
