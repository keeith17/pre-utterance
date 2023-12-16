import { Navigate, Route, Routes } from "react-router-dom";
import SearchPage from "@/pages/search";
import LoginPage from "@/pages/login";
import CircumPage from "@/pages/circum";
import CollegePage from "@/pages/college";
import TribePage from "@/pages/tribe";
import ProfilePage from "@/pages/profile";
import AddIdPage from "@/pages/admin/addId";
import NewMemberPage from "@/pages/newmember";
import { useRecoilValue } from "recoil";
import { userState } from "@/atom";
import { db } from "@/firebaseApp";
import { DocumentSnapshot, doc, getDoc } from "firebase/firestore";
import { useQuery } from "react-query";

interface RouterProps {
    isAuthenticated: boolean;
}

export default function Router({ isAuthenticated }: RouterProps) {
    const user = useRecoilValue(userState);
    const userId = user?.uid;
    const getChar = async (userId: string | null) => {
        if (!userId) {
            throw new Error("User ID is undefined");
        }
        const charRef = doc(db, "character", userId);
        const charSnap: DocumentSnapshot = await getDoc(charRef);
        if (charSnap.exists()) {
            return charSnap.exists();
        } else {
            return charSnap.exists();
        }
    };

    const { data: haveCharacter } = useQuery<boolean>(
        ["char", userId],
        () => getChar(userId),
        {
            enabled: !!userId, // 쿼리 활성화 여부를 유저 ID의 존재 여부에 따라 설정
        }
    );
    return (
        <Routes>
            {isAuthenticated ? (
                haveCharacter ? (
                    <>
                        <Route path="/" element={<SearchPage />} />
                        <Route path="/CircumPage" element={<CircumPage />} />
                        <Route path="/CollegePage" element={<CollegePage />} />
                        <Route path="/TribePage" element={<TribePage />} />
                        <Route path="/ProfilePage" element={<ProfilePage />} />
                    </>
                ) : (
                    <>
                        <Route path="/NewMember" element={<NewMemberPage />} />
                        <Route
                            path="*"
                            element={<Navigate replace to="/NewMember" />}
                        />
                    </>
                )
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
