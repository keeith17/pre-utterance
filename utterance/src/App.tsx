import { Global } from "@emotion/react";
import { GlobalStyle } from "./GlobalStyle";
import Router from "./components/Router";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebaseApp";
import { useEffect, useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { ReactQueryDevtools } from "react-query/devtools";
import { Layout } from "./components/Layout";
import Loader from "./components/loader/Loader";

export default function App() {
    //전체 로그인 관리
    const auth = getAuth(app);
    const [init, setInit] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        !!auth?.currentUser
    );
    useEffect(() => {
        onAuthStateChanged(auth, (user: User | null) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
            setInit(true);
        });
    }, [auth]);

    //상호작용 이후에 유튜브를 로드함....
    const [video, setVideo] = useState<boolean>(false);
    const handleClick = () => {
        setVideo(true);
    };
    useEffect(() => {
        // 컴포넌트가 마운트될 때 document에 클릭 이벤트 리스너 추가
        document.addEventListener("click", handleClick);

        return () => {
            // 컴포넌트가 언마운트될 때 클릭 이벤트 리스너 제거
            document.removeEventListener("click", handleClick);
        };
    }, []);

    //유튜브 로드 옵션
    const style: YouTubeProps["style"] = {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0,
        display: "none",
    };
    const [muted, setMuted] = useState<number>(0);
    const muteChange = () => {
        if (muted === 0) {
            setMuted(1);
        } else {
            setMuted(0);
        }
    };
    const options: YouTubeProps["opts"] = {
        width: "150",
        height: "150",
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
            mute: muted,
        },
    };

    //임시 뮤트 버튼
    const myStyle: React.CSSProperties = {
        position: "absolute",
        top: 300,
        right: 0,
        zIndex: 10,
    };
    return (
        <>
            <Global styles={GlobalStyle} />
            <button onClick={muteChange} style={myStyle}>
                배경음악
            </button>
            {video && (
                <YouTube videoId="jcEw1Bsbnq0" opts={options} style={style} />
            )}
            {
                //로그인 이후에 Layout 적용되도록
                isAuthenticated ? (
                    <Layout>
                        {init ? (
                            <Router isAuthenticated={isAuthenticated} />
                        ) : (
                            <Loader />
                        )}
                    </Layout>
                ) : (
                    //로그인 화면에서는(auth 없을 때) Layout 적용되지 않도록
                    <>
                        {init ? (
                            <Router isAuthenticated={isAuthenticated} />
                        ) : (
                            <Loader />
                        )}
                    </>
                )
            }
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </>
    );
}
