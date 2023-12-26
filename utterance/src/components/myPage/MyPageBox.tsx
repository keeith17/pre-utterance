import { userState } from "@/atom";
import { useRecoilValue } from "recoil";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app, db } from "@/firebaseApp";
import { doc, getDoc } from "firebase/firestore";
import { useQuery, useQueryClient } from "react-query";
import { ButtonStyle } from "../Style";
import { MyPageStyle } from "./MyPageBoxStyle";
import { BsPersonHearts } from "react-icons/bs";
import { TbPencilHeart } from "react-icons/tb";
import { BsEnvelopeOpenHeart } from "react-icons/bs";

interface CharProps {
    uid: string;
    name: string;
    nick: string;
    gifUrl: string;
    grade: string;
    badge: string;
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
    const queryClient = useQueryClient();
    const user = useRecoilValue(userState);
    const userUid = user.uid;
    const { data: myChar } = useQuery<CharProps>("charData", () =>
        fetchCharData(userUid)
    );
    return (
        <MyPageStyle>
            {myChar?.nick ? (
                <div className="myPageBox">
                    <div className="logoutArea">
                        <ButtonStyle
                            fontSize="12px"
                            type="button"
                            onClick={async () => {
                                const auth = getAuth(app);
                                await signOut(auth);
                                await queryClient.invalidateQueries(`charData`);
                                navigate("/LoginPage");
                            }}
                        >
                            Logout
                        </ButtonStyle>
                    </div>
                    <div className="myInfoArea">
                        <div className="badge">
                            <img src={myChar?.badge} alt="휘장" />
                        </div>
                        <div className="profilePhoto">
                            <img src={myChar?.gifUrl} alt="캐릭터 두상" />
                            <p className="myname">{myChar?.name}</p>
                        </div>
                        <div className="grade">
                            <img src={myChar?.grade} alt="계급장" />
                        </div>
                    </div>
                    <div className="shortCutArea">
                        <div className="shortCutIcon">
                            <BsPersonHearts
                                className="icons"
                                size={30}
                                onClick={() => navigate("/ProfilePage")}
                            />
                            <TbPencilHeart
                                className="icons"
                                size={30}
                                onClick={() => navigate("/ProfileEditPage")}
                            />
                            <BsEnvelopeOpenHeart className="icons" size={30} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="myPageBox">
                    <div className="logoutArea">
                        <ButtonStyle
                            fontSize="12px"
                            type="button"
                            onClick={async () => {
                                const auth = getAuth(app);
                                await signOut(auth);
                                await queryClient.invalidateQueries(`charData`);
                                navigate("/LoginPage");
                            }}
                        >
                            Logout
                        </ButtonStyle>
                    </div>
                    잠겨 있습니다
                </div>
            )}
        </MyPageStyle>
    );
}
