import { Global } from "@emotion/react";
import { GlobalStyle } from "./GlobalStyle";
import Router from "./components/Router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebaseApp";
import { useEffect, useState } from "react";

export default function App() {
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
            {init ? (
                <Router isAuthenticated={isAuthenticated} />
            ) : (
                <div>loadng............</div>
            )}
        </>
    );
}
