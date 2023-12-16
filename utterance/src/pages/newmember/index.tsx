import { userState } from "@/atom";
import { InputStyle } from "@/components/Style";
import { db } from "@/firebaseApp";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useRecoilValue } from "recoil";

export default function NewMemberPage() {
    const user = useRecoilValue(userState);
    const [char, setChar] = useState<string>("");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = e;
        setChar(value);
        console.log(char);
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (user?.uid) {
                const charRef = doc(db, "character", user?.uid);
                await setDoc(charRef, {
                    name: char,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div>새로운 입학을 환영합니당!!!!</div>
            <form onSubmit={onSubmit}>
                <InputStyle
                    type="text"
                    height="54px"
                    fontSize="18px"
                    onChange={onChange}
                    placeholder="임시 캐릭터명 입력"
                />
                <button type="submit">임시 제출</button>
            </form>
        </div>
    );
}
