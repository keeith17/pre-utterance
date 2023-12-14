import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from "../../firebaseApp";

export default function SearchPage() {
    const navigate = useNavigate();
    return (
        <div>
            검색 페이지
            <button
                type="button"
                onClick={async () => {
                    const auth = getAuth(app);
                    await signOut(auth);
                    navigate("/LoginPage");
                }}
            >
                임시 로그아웃
            </button>
        </div>
    );
}
