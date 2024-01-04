import { collection, getDocs } from "firebase/firestore";
import { CharList, Character, CharacterWrap } from "./profileStyle";
import { db } from "@/firebaseApp";
import { useQuery } from "react-query";
import { useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useRecoilState } from "recoil";
import { AllCharProps, selectUserState } from "@/atom";
import { Out } from "@/components/Style";
import { RiCloseLine } from "react-icons/ri";
import { useNavigate } from "react-router";

export default function ProfilePage() {
    const navigate = useNavigate();
    const [selectChar, setSelectChar] = useRecoilState(selectUserState);
    const [selectHouse, setSelectHouse] = useState<number>(
        parseInt(selectChar.badge.slice(5, 6)) - 1 || 0
    );
    // 이것도 전역으로 빼야 할 것 같기도 함
    console.log(selectHouse);
    const houseList: string[] = ["quasa1", "quasa2", "quasa3"];
    const badgeList: string[] = [
        "https://i.imgur.com/KEchdrQ.png",
        "https://i.imgur.com/PRPLtc3.png",
        "https://i.imgur.com/JAj1OK7.png",
    ];
    const handleRight = () => {
        if (selectHouse < 2) setSelectHouse(selectHouse + 1);
        else setSelectHouse(0);
    };
    const handleLeft = () => {
        if (selectHouse > 0) setSelectHouse(selectHouse - 1);
        else setSelectHouse(2);
    };
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
            staleTime: 30000, // 캐시된 데이터가 30초 후에 만료됨
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
                        badgeImg: hereChar.badgeImg,
                        gifUrl: hereChar.gifUrl,
                        grade: hereChar.grade,
                        gradeImg: hereChar.gradeImg,
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
                        rela1: hereChar.rela1,
                        desc1: hereChar.desc1,
                        rela2: hereChar.rela2,
                        desc2: hereChar.desc2,
                        rela3: hereChar.rela3,
                        desc3: hereChar.desc3,
                    });
                }
            }
        }
    };
    return (
        <CharacterWrap>
            <Out
                onClick={() => {
                    navigate("/");
                }}
            >
                <RiCloseLine size={35} />
            </Out>
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
                                    {selectChar.from} / {selectChar.planet}
                                </div>
                            </div>
                            <div className="charBadge">
                                <img
                                    src={selectChar.badgeImg}
                                    alt="기숙사휘장"
                                />
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
                <div className="leftArrow arrow" onClick={handleLeft}>
                    <IoChevronBack size={60} />
                </div>
                <div className="badgeWrap">
                    <img src={badgeList[selectHouse]} alt="휘장" />
                </div>
                <div className="gifWrap">
                    {allChar?.map(
                        (char, index) =>
                            char.badge === houseList[selectHouse] && (
                                <button
                                    className={`charGif ${
                                        char.id === selectChar.id && "selected"
                                    }`}
                                    key={index}
                                    value={char.id}
                                    onClick={handleCharSet}
                                >
                                    <img src={char.gifUrl} alt="캐릭터 두상" />
                                </button>
                            )
                    )}
                </div>
                <div className="rightArrow arrow" onClick={handleRight}>
                    <IoChevronForward size={60} />
                </div>
            </CharList>
        </CharacterWrap>
    );
}
