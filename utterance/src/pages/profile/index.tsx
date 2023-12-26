import { collection, getDocs } from "firebase/firestore";
import { CharList, Character, CharacterWrap } from "./profileStyle";
import { db } from "@/firebaseApp";
import { useQuery } from "react-query";
import { useState } from "react";
export interface AllCharProps {
    badge: string;
    gifUrl: string;
    grade: string;
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
}
export default function ProfilePage() {
    const [selectChar, setSelectChar] = useState<AllCharProps>({
        badge: "",
        gifUrl: "",
        grade: "",
        name: "",
        nick: "",
        id: "",
        height: "",
        weight: "",
        from: "",
        planet: "",
        secret1: "",
        secret2: "",
        secret3: "",
    });
    // 전체 캐릭터 데이터 받아 오는 부분
    const fetchAllCharData = async () => {
        const allCharSnapshot = await getDocs(collection(db, "character"));
        const data: AllCharProps[] = allCharSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as AllCharProps[];
        return data;
    };
    const { data: allChar } = useQuery<AllCharProps[]>(
        "allChar",
        fetchAllCharData,
        {
            cacheTime: 60000, // 캐시를 60초(1분) 동안 유지
            staleTime: 50000, // 캐시된 데이터가 50초 후에 만료됨
        }
    );
    // 선택된 캐릭터 세팅
    const handleCharSet = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        const {
            currentTarget: { value },
        } = e;
        if (allChar) {
            for (const hereChar of allChar) {
                if (hereChar.id === value) {
                    setSelectChar({
                        ...selectChar,
                        badge: hereChar.badge,
                        gifUrl: hereChar.gifUrl,
                        grade: hereChar.grade,
                        id: hereChar.id,
                        name: hereChar.name,
                        nick: hereChar.nick,
                        height: hereChar.height,
                        weight: hereChar.weight,
                        from: hereChar.from,
                        planet: hereChar.planet,
                        secret1: hereChar.secret1,
                        secret2: hereChar.secret2,
                        secret3: hereChar.secret3,
                    });
                }
            }
        }
    };
    return (
        <CharacterWrap>
            {selectChar.id ? (
                <Character>
                    <div className="charContent">
                        <div className="charDefault">
                            <div className="headGif">
                                <img src={selectChar.gifUrl} alt="캐릭터두상" />
                            </div>
                            <div className="charInfo">
                                <div className="charName">
                                    <img src={selectChar.grade} alt="" />
                                    {selectChar.name}
                                </div>
                                <div className="charName">
                                    {selectChar.height}cm / {selectChar.weight}
                                    kg
                                </div>
                                <div className="charName">
                                    {selectChar.from} &nbsp;
                                    {selectChar.planet}
                                </div>
                            </div>
                            <div className="charBadge">
                                <img src={selectChar.badge} alt="기숙사휘장" />
                            </div>
                        </div>
                        <div className="charSecret">
                            <div className="secret secret1">
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: selectChar.secret1,
                                    }}
                                ></p>
                            </div>
                            <div className="secret secret2">
                                <p>{selectChar.secret2}</p>
                            </div>
                            <div className="secret secret3">
                                <p>{selectChar.secret3}</p>
                            </div>
                        </div>
                    </div>
                    <div className="charRelation"></div>
                </Character>
            ) : (
                <Character>캐릭터를 선택해 주세용</Character>
            )}
            <CharList>
                {allChar?.map((char, index) => (
                    <button
                        className="charGif"
                        key={index}
                        value={char.id}
                        onClick={handleCharSet}
                    >
                        <img src={char.gifUrl} alt="캐릭터 두상" />
                    </button>
                ))}
            </CharList>
        </CharacterWrap>
    );
}
