import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { userState } from "../atom";
import { useSetRecoilState } from "recoil";
import { app } from "../firebaseApp";

const AuthManager = () => {
    const setUser = useSetRecoilState(userState);
    const auth = getAuth(app);

    useEffect(() => {
        const userInfo = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                const { uid, email, displayName, photoURL } = authUser;
                setUser({ uid, email, displayName, photoURL });
            } else {
                setUser({
                    uid: null,
                    email: null,
                    displayName: null,
                    photoURL: null,
                });
            }
        });
        return () => {
            userInfo();
        };
    }, [auth, setUser]);
    return null;
};

export default AuthManager;
