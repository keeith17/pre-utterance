import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from "../../firebaseApp";
import { userState } from "../../atom";
import { useRecoilValue } from "recoil";

export default function SearchPage() {
    const navigate = useNavigate();
    const user = useRecoilValue(userState);
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
            <br />
            별명: {user.displayName} <br />
            이메일: {user.email}
            <br />
            유알엘: {user.photoURL}
            <br />
            유아이디: {user.uid}
            <br />
        </div>
    );
}
