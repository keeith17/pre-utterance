import { userState } from "@/atom";
import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from "@/firebaseApp";

const myStyle: React.CSSProperties = {
    position: "absolute",
    top: 25,
    right: 0,
    zIndex: 10,
};

const MyPageStyle = styled.div`
    width: 100%;
    height: 25%;
    .myPageBox {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.2);
    }
`;

export default function MyPageBox() {
    const user = useRecoilValue(userState);
    const navigate = useNavigate();
    return (
        <MyPageStyle>
            <button
                type="button"
                onClick={async () => {
                    const auth = getAuth(app);
                    await signOut(auth);
                    navigate("/LoginPage");
                }}
                style={myStyle}
            >
                임시 로그아웃
            </button>
            <div className="myPageBox">
                내 정보 별명: {user.displayName} <br />
                이메일: {user.email}
                <br />
                유알엘: {user.photoURL}
                <br />
                유아이디: {user.uid}
                <br />
            </div>
        </MyPageStyle>
    );
}
