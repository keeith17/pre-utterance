import { AllCharProps, selectUserState, userState } from "@/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app, db } from "@/firebaseApp";
import { doc, getDoc } from "firebase/firestore";
import { useQuery, useQueryClient } from "react-query";
import { ButtonStyle } from "../Style";
import { MyPageStyle } from "./MyPageBoxStyle";
import { IoPersonCircleSharp, IoCreateSharp, IoMail } from "react-icons/io5";

// 버튼 부분 데이터 페칭 함수
const fetchCharData = async (userUid: string | null) => {
    if (userUid) {
        const charRef = doc(db, "character", userUid);
        const charSnap = await getDoc(charRef);
        const data = { ...(charSnap?.data() as AllCharProps), id: userUid };
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
    const setSelectChar = useSetRecoilState(selectUserState);

    //내 캐릭터 정보
    const { data: myChar } = useQuery<AllCharProps>("charData", () =>
        fetchCharData(userUid)
    );

    const handleProfileClick = () => {
        if (myChar) {
            setSelectChar(myChar);
        }
        navigate("/ProfilePage");
    };
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
                            <img src={myChar?.badgeImg} alt="휘장" />
                        </div>
                        <div className="profilePhoto">
                            <img src={myChar?.gifUrl} alt="캐릭터 두상" />
                            <p className="myname">{myChar?.name}</p>
                        </div>
                        <div className="grade">
                            <img src={myChar?.gradeImg} alt="계급장" />
                        </div>
                    </div>
                    <div className="shortCutArea">
                        <div className="shortCutIcon">
                            <IoPersonCircleSharp
                                className="icons"
                                size={30}
                                onClick={handleProfileClick}
                            />
                            <IoCreateSharp
                                className="icons"
                                size={30}
                                onClick={() => navigate("/ProfileEditPage")}
                            />
                            <IoMail className="icons" size={30} />
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
