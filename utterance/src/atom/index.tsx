import { atom } from "recoil";

interface authUserProps {
    uid: string | null;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
}

export const userState = atom<authUserProps>({
    key: "userState",
    default: { uid: null, email: null, displayName: null, photoURL: null },
});
