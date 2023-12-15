import { Global } from "@emotion/react";
import { GlobalStyle } from "./GlobalStyle";
import Router from "./components/Router";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebaseApp";
import { useEffect, useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { ReactQueryDevtools } from "react-query/devtools";
import { Layout } from "./components/Layout";

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

    //상호작용 이후에 유튜브를 로드함...
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
    const options: YouTubeProps["opts"] = {
        width: "100",
        height: "100",
        style: {
            position: "absolute",
            top: 0,
            right: 0,
        },
        playerVars: {
            autoplay: 1,
            modestbranding: 1,
            rel: 0,
            loop: 1,
            fs: 0,
            controls: 0,
            disablekb: 1,
            playlist: "jcEw1Bsbnq0,_AAdae7diOU,XX2gPs44fxg",
            playsinline: 1,
        },
    };

    return (
        <>
            <Global styles={GlobalStyle} />
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
                            <div>loadng............</div>
                        )}
                    </Layout>
                ) : (
                    //로그인 화면에서는(auth 없을 때) Layout 적용되지 않도록
                    <>
                        {init ? (
                            <Router isAuthenticated={isAuthenticated} />
                        ) : (
                            <div>loadng............</div>
                        )}
                    </>
                )
            }
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </>
    );
}
