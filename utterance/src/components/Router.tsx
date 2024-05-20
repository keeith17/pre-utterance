import { Navigate, Route, Routes } from "react-router-dom";
import SearchPage from "@/pages/search";
import LoginPage from "@/pages/login";
import ProfilePage from "@/pages/profile";
import AddIdPage from "@/pages/admin/addId";
import SearchDetailPage from "@/pages/search/detail";
import ProfileEditPage from "@/pages/profileEdit";
import Control from "@/pages/admin/control";

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
                    <Route path="/ProfilePage" element={<ProfilePage />} />
                    <Route
                        path="/ProfileEditPage"
                        element={<ProfileEditPage />}
                    />
                    <Route path="/admin/control" element={<Control />} />
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
