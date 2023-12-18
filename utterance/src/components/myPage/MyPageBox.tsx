import { userState } from "@/atom";
import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app, db } from "@/firebaseApp";
import { doc, getDoc } from "firebase/firestore";
import { useQuery } from "react-query";

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
interface CharProps {
    uid: string;
    name: string;
    nick: string;
    gifUrl: string;
}
// 버튼 부분 데이터 페칭 함수
const fetchCharData = async (userUid: string | null) => {
    if (userUid) {
        const charRef = doc(db, "character", userUid);
        const charSnap = await getDoc(charRef);
        const data = { ...(charSnap?.data() as CharProps), uid: userUid };
        return data;
    } else {
        throw new Error("사용자 UID가 존재하지 않습니다.");
    }
};
export default function MyPageBox() {
    const navigate = useNavigate();
    const user = useRecoilValue(userState);
    const userUid = user.uid;
    const { data: myChar } = useQuery<CharProps>("charData", () =>
        fetchCharData(userUid)
    );
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
            {myChar?.nick ? (
                <div className="myPageBox">{myChar?.name}</div>
            ) : (
                <div className="myPageBox"> 잠겨 있습니다</div>
            )}
        </MyPageStyle>
    );
}
