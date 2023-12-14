import { Global } from "@emotion/react";
import { GlobalStyle } from "./GlobalStyle";
import Router from "./components/Router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebaseApp";
import { useEffect, useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";

export default function App() {
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

    const auth = getAuth(app);
    const [init, setInit] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        !!auth?.currentUser
    );
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
            setInit(true);
        });
    }, [auth]);

    return (
        <>
            <Global styles={GlobalStyle} />
            {video && (
                <YouTube videoId="jcEw1Bsbnq0" opts={options} style={style} />
            )}
            {init ? (
                <Router isAuthenticated={isAuthenticated} />
            ) : (
                <div>loadng............</div>
            )}
        </>
    );
}
