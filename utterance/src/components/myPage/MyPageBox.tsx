import {
    AllCharProps,
    mailState,
    selectUserState,
    userState,
    videoState,
} from "@/atom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app, db } from "@/firebaseApp";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    limit,
    query,
    where,
} from "firebase/firestore";
import { useQuery, useQueryClient } from "react-query";
import { ButtonStyle } from "../Style";
import { MyPageStyle } from "./MyPageBoxStyle";
import { useRef, useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { ControlProps } from "@/pages/admin/control";

export default function MyPageBox() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const user = useRecoilValue(userState);
    const userUid = user.uid;
    const [mail, setMail] = useRecoilState(mailState);

    const video = useRecoilValue(videoState);
    const [bgm, setBgm] = useState<boolean>(true);
    const setSelectChar = useSetRecoilState(selectUserState);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const playerRef = useRef<any>(null);

    //새 메시지 있나 확인
    const checkUnreadMessages = async () => {
        try {
            const userUid = user?.uid; // user 객체가 존재하는지 확인
            if (userUid) {
                const mailRef = collection(db, "homeMail", userUid, "rec");

                const unreadQuery = query(
                    mailRef,
                    where("isRead", "==", false),
                    limit(1)
                );

                const mailSnapshot = await getDocs(unreadQuery);

                return !mailSnapshot.empty; // 문서가 있으면 true, 없으면 false
            }
        } catch (error) {
            console.error("Error checking unread messages:", error);
            throw error;
        }
    };

    const { data: recMailAlarm } = useQuery(
        ["recMailAlarm"],
        checkUnreadMessages,
        {
            staleTime: 10000,
        }
    );

    // 내 캐릭터 정보 세팅 함수
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
    // 내 캐릭터 정보
    const { data: myChar } = useQuery<AllCharProps>(
        "charData",
        () => fetchCharData(userUid),
        {
            staleTime: 60000 * 60 * 3,
        }
    );

    // 프로필 열람 페이지로 이동
    const handleProfileClick = () => {
        if (myChar) {
            setSelectChar(myChar);
        }
        if (myChar?.badge === "teacher") {
            navigate("/TeacherProfilePage");
        } else {
            navigate("/ProfilePage");
        }
    };

    //control되고 있는 상황 fetch
    const fetchControlData = async () => {
        const controlRef = collection(db, "control");
        const controlSnapshot = await getDocs(controlRef);
        const data: ControlProps[] = controlSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as ControlProps[];

        return data;
    };

    const { data: control } = useQuery<ControlProps[]>(
        "control",
        fetchControlData,
        {
            staleTime: 600000, // 캐시된 데이터가 10분 후에 만료됨
        }
    );

    //유튜브 로드 옵션
    const options: YouTubeProps["opts"] = {
        width: "150",
        height: "150",
        volume: 1,
        playerVars: {
            autoplay: 1,
            modestbranding: 1,
            rel: 0,
            loop: 1,
            fs: 0,
            controls: 1,
            disablekb: 1,
            playlist: "5YLJwhyczHc,KF8DE343-mw",
            playsinline: 1,
            enablejsapi: 1,
            mute: 0,
        },
    };
    //유튜브 로드 옵션
    const style: YouTubeProps["style"] = {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0,
        display: "none",
    };
    const handleReady: YouTubeProps["onReady"] = (e) => {
        playerRef.current = e.target;
        e.target.setVolume(50);
    };

    const imsiOnClick = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        const {
            currentTarget: { name },
        } = e;
        if (playerRef.current) {
            if (name === "prev") {
                playerRef.current.previousVideo();
            }
            if (name === "next") {
                playerRef.current.nextVideo();
            }
            if (name === "pause") {
                playerRef.current.pauseVideo();
                setBgm(false);
            }
            if (name === "restart") {
                playerRef.current.playVideo();
                setBgm(true);
            }
        }
    };

    /////// 여기부터
    // const [imsipw, setimsipw] = useState<string>("");
    // const imsipwchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     e.preventDefault();
    //     const {
    //         target: { value },
    //     } = e;
    //     setimsipw(value);
    // };
    // const imsipwchangesubmit = async () => {
    //     const auth = getAuth(app);
    //     const userRef = auth.currentUser;
    //     if (userRef) {
    //         try {
    //             await updatePassword(userRef, imsipw);
    //             alert("변경되었습니다");
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // };
    ///////// 여기까지
    return (
        <MyPageStyle>
            {video && (
                <YouTube
                    videoId="jcEw1Bsbnq0"
                    opts={options}
                    style={style}
                    onReady={handleReady}
                />
            )}
            {/* 여기부터 */}
            {/* <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "500px",
                    height: "200px",
                    background: "rgba(0,0,0,.8)",
                    display: "flex",
                    flexDirection: "column",
                    padding: "0 30px",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        height: "50%",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <InputStyle
                        fontSize={"1vw"}
                        fontFamily={"nexonGothic"}
                        height={"50px"}
                        border={"1px solid white"}
                        onChange={imsipwchange}
                    ></InputStyle>
                </div>
                <div
                    style={{
                        width: "100%",
                        height: "50%",
                        padding: "1vw 0",
                    }}
                >
                    <ButtonStyle fontSize={"1vw"} onClick={imsipwchangesubmit}>
                        임시 변경
                    </ButtonStyle>
                </div>
            </div> */}
            {/* 여기까지 */}
            {myChar?.nick ? (
                <div className="myPageBox">
                    <div className="contentArea">
                        <div className="myInfoArea">
                            <div
                                className="profilePhoto"
                                onClick={handleProfileClick}
                            >
                                <img
                                    src={
                                        myChar.gifUrl
                                            ? myChar.gifUrl
                                            : "/images/default_head.webp"
                                    }
                                    alt="캐릭터 두상"
                                />
                            </div>
                            <div className="shortCutArea">
                                <div className="texts">
                                    <div className="grade">
                                        <img
                                            src={myChar?.gradeImg}
                                            alt="계급장"
                                        />
                                    </div>
                                    <div className="gradeName">
                                        {myChar?.grade} 등급
                                    </div>
                                    <div className="myName">{myChar?.name}</div>
                                    <div className="myNumber">
                                        {user?.email?.split("@")[0]}
                                    </div>
                                </div>
                                <div className="icons">
                                    {Number(myChar?.grade) >= 4 && (
                                        <button
                                            onClick={() =>
                                                navigate("/admin/control")
                                            }
                                        >
                                            어드민
                                        </button>
                                    )}
                                    {bgm ? (
                                        <button
                                            name="pause"
                                            onClick={imsiOnClick}
                                        >
                                            <img
                                                src="/images/main/icon/icon_music_on_26x26.webp"
                                                alt="musicOn"
                                            />
                                        </button>
                                    ) : (
                                        <button
                                            name="restart"
                                            onClick={imsiOnClick}
                                        >
                                            <img
                                                src="/images/main/icon/icon_music_26x26.webp"
                                                alt="musicOn"
                                            />
                                        </button>
                                    )}
                                    <button
                                        onClick={() =>
                                            //여기용
                                            setMail(!mail)
                                        }
                                    >
                                        <img
                                            src="/images/main/icon/messenger.webp"
                                            alt="messenger"
                                        />
                                        {recMailAlarm && (
                                            <div className="new"></div>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (
                                                control &&
                                                (control[0].control
                                                    .profilewrite ||
                                                    Number(myChar?.grade) >= 4)
                                            ) {
                                                navigate("/ProfileEditPage");
                                            } else {
                                                alert(
                                                    "프로필 작성 기간이 아닙니다"
                                                );
                                            }
                                        }}
                                    >
                                        <img
                                            src="/images/main/icon/icon_modify_26x26.webp"
                                            alt="icon_modify_26x26"
                                        />
                                    </button>
                                    <button
                                        onClick={() => navigate("/ShopPage")}
                                    >
                                        <img
                                            src="/images/main/icon/shop.webp"
                                            alt="icon_modify_26x26"
                                        />
                                    </button>
                                    <button
                                        onClick={async () => {
                                            const auth = getAuth(app);
                                            await queryClient.invalidateQueries(
                                                "charData"
                                            );
                                            await signOut(auth);
                                            navigate("/LoginPage");
                                        }}
                                    >
                                        <img
                                            src="/images/main/icon/icon_logout_26x26.webp"
                                            alt="icon_logout_26x26"
                                        />
                                    </button>
                                </div>
                            </div>
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
                                await queryClient.invalidateQueries("charData");
                                await signOut(auth);
                                navigate("/LoginPage");
                            }}
                        >
                            Logout
                        </ButtonStyle>
                    </div>
                    접근 권한이 없습니다
                </div>
            )}
        </MyPageStyle>
    );
}
