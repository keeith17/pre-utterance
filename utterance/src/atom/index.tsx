import { atom } from "recoil";

export interface authUserProps {
    uid: string | null;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
}

export interface AllCharProps {
    badge: string;
    badgeImg: string;
    gifUrl: string;
    grade: string;
    gradeImg: string;
    name: string;
    nick: string;
    id: string;
    height: string;
    weight: string;
    from: string;
    planet: string;
    secret1: string;
    secret2: string;
    secret3: string;
    rela1: string;
    desc1: string;
    rela2: string;
    desc2: string;
    rela3: string;
    desc3: string;
}

export const userState = atom<authUserProps>({
    key: "userState",
    default: { uid: null, email: null, displayName: null, photoURL: null },
});

export const selectUserState = atom<AllCharProps>({
    key: "selectUserState",
    default: {
        id: "",
        nick: "",
        gifUrl: "",
        badge: "",
        badgeImg: "",
        grade: "",
        gradeImg: "",
        name: "",
        height: "",
        weight: "",
        from: "",
        planet: "",
        secret1: "",
        secret2: "",
        secret3: "",
        rela1: "",
        desc1: "",
        rela2: "",
        desc2: "",
        rela3: "",
        desc3: "",
    },
});

export const bgmState = atom<number>({
    key: "bgmState",
    default: 0,
});

export const videoState = atom<boolean>({
    key: "videoState",
    default: false,
});
