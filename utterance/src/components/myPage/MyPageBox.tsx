import { AllCharProps, selectUserState, userState, videoState } from "@/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app, db } from "@/firebaseApp";
import { doc, getDoc } from "firebase/firestore";
import { useQuery, useQueryClient } from "react-query";
import { ButtonStyle } from "../Style";
import { MyPageStyle } from "./MyPageBoxStyle";
import { IoPersonCircleSharp, IoCreateSharp, IoMail } from "react-icons/io5";
import { MdOutlineMusicNote, MdOutlineMusicOff } from "react-icons/md";
import { useRef, useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";

export default function MyPageBox() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const user = useRecoilValue(userState);
    const userUid = user.uid;

    const video = useRecoilValue(videoState);
    const [bgm, setBgm] = useState<boolean>(true);
    const setSelectChar = useSetRecoilState(selectUserState);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const playerRef = useRef<any>(null);

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
            staleTime: 60000,
        }
    );

    // 프로필 열람 페이지로 이동
    const handleProfileClick = () => {
        if (myChar) {
            setSelectChar(myChar);
        }
        navigate("/ProfilePage");
    };

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
            playlist: "jcEw1Bsbnq0,Cp5y1hvtKPQ,NaLuuHmnb0Y",
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
            {myChar?.nick ? (
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
                            {bgm ? (
                                <button
                                    className="icons"
                                    name="pause"
                                    onClick={imsiOnClick}
                                >
                                    <MdOutlineMusicNote size={30} />
                                </button>
                            ) : (
                                <button
                                    className="icons"
                                    name="restart"
                                    onClick={imsiOnClick}
                                >
                                    <MdOutlineMusicOff size={30} />
                                </button>
                            )}
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
                    잠겨 있습니다
                </div>
            )}
        </MyPageStyle>
    );
}
