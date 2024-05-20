import { collection, getDocs, orderBy, query } from "firebase/firestore";
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
        selectChar.badge ? parseInt(selectChar.badge.slice(5, 6)) - 1 : 0
    );
    // 이것도 전역으로 빼야 할 것 같기도 함
    const [houseList, setHouseList] = useState<string[]>([
        "quasa1",
        "quasa2",
        "quasa3",
    ]);
    const [badgeList, setBadgeList] = useState<string[]>([
        "https://i.imgur.com/IrbjZek.png",
        "https://i.imgur.com/PRPLtc3.png",
        "https://i.imgur.com/JAj1OK7.png",
    ]);
    const handleRight = () => {
        if (selectHouse < houseList.length - 1) setSelectHouse(selectHouse + 1);
        else setSelectHouse(0);
    };
    const handleLeft = () => {
        if (selectHouse > 0) setSelectHouse(selectHouse - 1);
        else setSelectHouse(houseList.length - 1);
    };
    // 전체 캐릭터 데이터 받아 오는 부분
    const fetchAllCharData = async () => {
        const charRef = collection(db, "character");
        const charQuery = query(charRef, orderBy("name", "asc"));
        const allCharSnapshot = await getDocs(charQuery);
        const data: AllCharProps[] = allCharSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as AllCharProps[];
        for (const char of data) {
            if (char.badge) {
                if (!houseList.includes(char.badge)) {
                    setHouseList([...houseList, char.badge]);
                }
                if (!badgeList.includes(char.badgeImg)) {
                    setBadgeList([...badgeList, char.badgeImg]);
                }
            }
        }
        return data;
    };

    const { data: allChar } = useQuery<AllCharProps[]>(
        "allChar",
        fetchAllCharData,
        {
            staleTime: 30000, // 캐시된 데이터가 30초 후에 만료됨
        }
    );

    //관계 uid -> profileImage
    const uidToProfile = (uid: string) => {
        if (allChar) {
            for (const char of allChar) {
                if (char.id === uid) {
                    return char.gifUrl;
                }
            }
            return "none";
        }
    };
    // uid -> 이름
    const uidToName = (uid: string) => {
        if (allChar) {
            for (const char of allChar) {
                if (char.id === uid) {
                    return char.name;
                }
            }
            return "none";
        }
    };

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
                                <img
                                    src="/images/profile/doosang.webp"
                                    className="headGifFrame"
                                    alt="두상 프레임"
                                />
                                <img
                                    src={selectChar.gifUrl}
                                    className="head"
                                    alt="캐릭터두상"
                                />
                            </div>
                            <div className="charInfo">
                                <div className="charWrap">
                                    <div className="charDiv charName">
                                        {selectChar.name}
                                    </div>
                                    <div className="charDiv charKimom">
                                        {selectChar.height}cm /{" "}
                                        {selectChar.weight}
                                        kg
                                    </div>
                                    <div className="charDiv planet">
                                        <div className="charFrom">
                                            {selectChar.from}
                                        </div>
                                        <div className="charPlanet">
                                            {selectChar.planet}
                                        </div>
                                    </div>
                                </div>
                                <div className="imgBox">
                                    <img
                                        src={selectChar.gradeImg}
                                        alt=""
                                        className="gradeImg"
                                    />
                                </div>
                            </div>
                            <div className="charBadge">
                                <img
                                    src={selectChar.badgeImg}
                                    alt="기숙사휘장"
                                />
                            </div>
                        </div>
                        <div className="charSecretWrap">
                            <div className="charSecret">
                                <div className="secret secret1">
                                    <p>{selectChar.secret1}</p>
                                </div>
                                <div className="secret secret2">
                                    <p>{selectChar.secret2}</p>
                                </div>
                                <div className="secret secret3">
                                    <p>{selectChar.secret3}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="charRelation">
                        <div className="relations relation1">
                            <div className="relationInfo">
                                <div className="relaPhoto">
                                    <div className="imgBox">
                                        <img
                                            src={uidToProfile(selectChar.rela1)}
                                            className="headRela"
                                            alt="관계1두상"
                                        />
                                        <img
                                            src="/images/profile/gwangyedoosang.webp"
                                            className="headFrame"
                                            alt="headFrame"
                                        />
                                    </div>
                                </div>
                                <div className="relaContent">
                                    <div className="textBox">
                                        <p>{selectChar.desc1}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="relationName">
                                <div className="nameBox">
                                    {uidToName(selectChar.rela1)}
                                </div>
                            </div>
                        </div>
                        <div className="relations relation2">
                            <div className="relationInfo">
                                <div className="relaPhoto">
                                    <div className="imgBox">
                                        <img
                                            src={uidToProfile(selectChar.rela1)}
                                            className="headRela"
                                            alt="관계1두상"
                                        />
                                        <img
                                            src="/images/profile/gwangyedoosang.webp"
                                            className="headFrame"
                                            alt="headFrame"
                                        />
                                    </div>
                                </div>
                                <div className="relaContent">
                                    <div className="textBox">
                                        <p>{selectChar.desc1}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="relationName">
                                <div className="nameBox">
                                    {uidToName(selectChar.rela1)}
                                </div>
                            </div>
                        </div>
                        <div className="relations relation3">
                            <div className="relationInfo">
                                <div className="relaPhoto">
                                    <div className="imgBox">
                                        <img
                                            src={uidToProfile(selectChar.rela1)}
                                            className="headRela"
                                            alt="관계1두상"
                                        />
                                        <img
                                            src="/images/profile/gwangyedoosang.webp"
                                            className="headFrame"
                                            alt="headFrame"
                                        />
                                    </div>
                                </div>
                                <div className="relaContent">
                                    <div className="textBox">
                                        <p>{selectChar.desc1}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="relationName">
                                <div className="nameBox">
                                    {uidToName(selectChar.rela1)}
                                </div>
                            </div>
                        </div>
                        <div className="relations relation4">
                            <div className="relationInfo">
                                <div className="relaPhoto">
                                    <div className="imgBox">
                                        <img
                                            src={uidToProfile(selectChar.rela1)}
                                            className="headRela"
                                            alt="관계1두상"
                                        />
                                        <img
                                            src="/images/profile/gwangyedoosang.webp"
                                            className="headFrame"
                                            alt="headFrame"
                                        />
                                    </div>
                                </div>
                                <div className="relaContent">
                                    <div className="textBox">
                                        <p>{selectChar.desc1}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="relationName">
                                <div className="nameBox">
                                    {uidToName(selectChar.rela1)}
                                </div>
                            </div>
                        </div>
                    </div>
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
