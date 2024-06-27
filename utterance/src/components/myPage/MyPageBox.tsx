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
import { doc, getDoc } from "firebase/firestore";
import { useQuery, useQueryClient } from "react-query";
import { ButtonStyle } from "../Style";
import { MyPageStyle } from "./MyPageBoxStyle";
import { useRef, useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";

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
                                </div>
                                <div className="icons">
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
                                    </button>
                                    <button
                                        onClick={() =>
                                            navigate("/ProfileEditPage")
                                        }
                                    >
                                        <img
                                            src="/images/main/icon/icon_modify_26x26.webp"
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
                    잠겨 있습니다
                </div>
            )}
        </MyPageStyle>
    );
}
