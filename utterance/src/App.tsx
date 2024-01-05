import { Global } from "@emotion/react";
import { GlobalStyle } from "./GlobalStyle";
import Router from "./components/Router";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebaseApp";
import { useCallback, useEffect, useState } from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import { Layout } from "./components/Layout";
import Loader from "./components/loader/Loader";
import { useSetRecoilState } from "recoil";
import { videoState } from "./atom";

export default function App() {
    //전체 로그인 관리
    const auth = getAuth(app);
    const [init, setInit] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        !!auth?.currentUser
    );
    //상호작용 이후에 유튜브를 로드함....
    const setVideo = useSetRecoilState(videoState);
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
    const handleClick = useCallback(() => {
        setVideo(true);
    }, [setVideo]);
    useEffect(() => {
        // 컴포넌트가 마운트될 때 document에 클릭 이벤트 리스너 추가
        document.addEventListener("click", handleClick);
        return () => {
            // 컴포넌트가 언마운트될 때 클릭 이벤트 리스너 제거
            document.removeEventListener("click", handleClick);
        };
    }, [handleClick]);

    return (
        <>
            <Global styles={GlobalStyle} />
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
