import {
    collection,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
} from "firebase/firestore";
import {
    CharList,
    Character,
    CharacterWrap,
    SynapsePacker,
} from "./profileStyle";
import { db } from "@/firebaseApp";
import { useQuery } from "react-query";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AllCharProps, selectUserState, userState } from "@/atom";
import { Out } from "@/components/Style";
import { RiCloseLine } from "react-icons/ri";
import { useNavigate } from "react-router";
import { PackerList } from "@/components/profile/packerList";
import { DataProps } from "@/components/profile/packerWrite";
import { InvenProps } from "@/components/shop/Inventory";
export default function TeacherProfilePage() {
    const navigate = useNavigate();
    const user = useRecoilValue(userState);
    const [selectChar, setSelectChar] = useRecoilState(selectUserState);
    const [modal, setModal] = useState<boolean>(false);
    const [packer, setPacker] = useState<string>("database1");

    // 인벤토리 소환
    const fetchInvenData = async (userUid: string | null) => {
        if (userUid) {
            const invenRef = doc(db, "inventory", userUid);
            const invenSanpshot = await getDoc(invenRef);
            const data = {
                ...invenSanpshot?.data(),
                uid: userUid,
            } as InvenProps;
            return data;
        } else {
            throw new Error("사용자 UID가 존재하지 않습니다.");
        }
    };
    // 내 캐릭터 정보
    const { data: myInventory } = useQuery(
        ["selectInventory", selectChar.id],
        () => fetchInvenData(selectChar.id)
    );

    // 내 캐릭터 정보 세팅 함수
    const fetchCharData = async (userUid: string | null) => {
        if (userUid) {
            const charRef = doc(db, "character", userUid);
            const charSnap = await getDoc(charRef);
            const data = { ...(charSnap?.data() as AllCharProps), id: userUid };
            return data;
        } else {
            throw new Error("사용자 UID가 존재하지 않습니다.");
        }
    };
    // 내 캐릭터 정보
    const { data: myChar } = useQuery<AllCharProps>(
        "charData",
        () => fetchCharData(user?.uid),
        {
            staleTime: 60000 * 60 * 3,
        }
    );

    // 전체 캐릭터 데이터 받아 오는 부분
    const fetchAllCharData = async () => {
        const charRef = collection(db, "character");
        const charQuery = query(charRef, orderBy("grade", "desc"));
        const allCharSnapshot = await getDocs(charQuery);
        const data: AllCharProps[] = allCharSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as AllCharProps[];

        return data;
    };

    const { data: allChar } = useQuery<AllCharProps[]>(
        "allCharTeacher",
        fetchAllCharData,
        {
            staleTime: 30000, // 캐시된 데이터가 30초 후에 만료됨
        }
    );

    // 선택된 시냅스 패커 가지고 오기.....
    const fetchData1 = async () => {
        if (selectChar.id) {
            try {
                const docRef = collection(
                    db,
                    "database",
                    selectChar.id,
                    "database1"
                );
                const docQuery = query(docRef, orderBy("createdAt", "desc"));
                const docSnapshot = await getDocs(docQuery);
                const data: DataProps[] = docSnapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                })) as DataProps[];
                return data;
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }
    };

    const { data: SynapsePacker1 } = useQuery(
        ["database1", selectChar.id],
        fetchData1,
        {
            staleTime: 60000,
        }
    );
    const fetchData2 = async () => {
        if (selectChar.id) {
            try {
                const docRef = collection(
                    db,
                    "database",
                    selectChar.id,
                    "database2"
                );
                const docQuery = query(docRef, orderBy("createdAt", "desc"));
                const docSnapshot = await getDocs(docQuery);
                const data: DataProps[] = docSnapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                })) as DataProps[];
                return data;
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }
    };

    const { data: SynapsePacker2 } = useQuery(
        ["database2", selectChar.id],
        fetchData2,
        {
            staleTime: 60000,
        }
    );
    const fetchData3 = async () => {
        if (selectChar.id) {
            try {
                const docRef = collection(
                    db,
                    "database",
                    selectChar.id,
                    "database3"
                );
                const docQuery = query(docRef, orderBy("createdAt", "desc"));
                const docSnapshot = await getDocs(docQuery);
                const data: DataProps[] = docSnapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                })) as DataProps[];
                return data;
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }
    };

    const { data: SynapsePacker3 } = useQuery(
        ["database3", selectChar.id],
        fetchData3,
        {
            staleTime: 60000,
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
            return "Loading...";
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
                        rela4: hereChar.rela4,
                        desc4: hereChar.desc4,
                    });
                }
            }
        }
    };

    const packerColor = (packerNum: number, index: number) => {
        if (packerNum === 1) {
            if (SynapsePacker1) {
                if (SynapsePacker1.length <= 15) {
                    return "count count1";
                } else if (SynapsePacker1.length <= 30) {
                    if (
                        SynapsePacker1.length % 15 > index ||
                        SynapsePacker1.length % 15 === 0
                    ) {
                        return "count count2";
                    } else {
                        return "count count1";
                    }
                } else if (SynapsePacker1.length <= 45) {
                    if (
                        SynapsePacker1.length % 15 > index ||
                        SynapsePacker1.length % 15 === 0
                    ) {
                        return "count count3";
                    } else {
                        return "count count2";
                    }
                }
            }
        }
        if (packerNum === 2) {
            if (SynapsePacker2) {
                if (SynapsePacker2.length <= 15) {
                    return "count count1";
                } else if (SynapsePacker2.length <= 30) {
                    if (SynapsePacker2.length % 15 > index) {
                        return "count count2";
                    } else {
                        return "count count1";
                    }
                } else if (SynapsePacker2.length <= 45) {
                    if (SynapsePacker2.length % 15 > index) {
                        return "count count3";
                    } else {
                        return "count count2";
                    }
                }
            }
        }
        if (packerNum === 3) {
            if (SynapsePacker3) {
                if (SynapsePacker3.length <= 15) {
                    return "count count1";
                } else if (SynapsePacker3.length <= 30) {
                    if (SynapsePacker3.length % 15 > index) {
                        return "count count2";
                    } else {
                        return "count count1";
                    }
                } else if (SynapsePacker3.length <= 45) {
                    if (SynapsePacker3.length % 15 > index) {
                        return "count count3";
                    } else {
                        return "count count2";
                    }
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
                    {modal && (
                        <PackerList setModal={setModal} packer={packer} />
                    )}
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
                                    {myInventory &&
                                        myInventory?.charm?.map(
                                            (item) =>
                                                item.checkOn && (
                                                    <div
                                                        className="imgContainer"
                                                        key={item.id}
                                                    >
                                                        <img
                                                            src={item.imageLink}
                                                            alt="itemImage"
                                                            className="gradeImg"
                                                        />
                                                        <span className="tooltip">
                                                            {item.thingName}
                                                            <br />
                                                            {item.justDesc}
                                                        </span>
                                                    </div>
                                                )
                                        )}
                                    <div className="imgContainer">
                                        <img
                                            src={selectChar.gradeImg}
                                            alt="gradeImg"
                                            className="gradeImg"
                                        />
                                        <span className="tooltip">
                                            정보 권한 <br />
                                            {selectChar.grade} 등급
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <SynapsePacker>
                                <div className="packerBack">
                                    {/* <div
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "0.9vw",
                                            color: "black",
                                            fontWeight: 700,
                                            paddingBottom: "0.5vw",
                                            paddingRight: "0.3vw",
                                        }}
                                    >
                                        ACCESS DENIED
                                    </div> */}
                                    <div className="database">
                                        <div
                                            className={
                                                Number(myChar?.grade) >= 0 || //등급 다른 부분
                                                user.uid === selectChar.id
                                                    ? "db db1"
                                                    : "db db2 disabled"
                                            }
                                            onClick={() => {
                                                if (
                                                    Number(myChar?.grade) >= //등급 다른 부분
                                                        0 ||
                                                    user.uid === selectChar.id
                                                ) {
                                                    setModal(true);
                                                    setPacker("database1");
                                                } else {
                                                    alert(
                                                        "접근 권한이 없습니다!"
                                                    );
                                                }
                                            }}
                                        >
                                            <p className="dbTitle">DB1</p>
                                            <div
                                                className={`gage ${selectChar.badge}`}
                                            >
                                                {SynapsePacker1?.slice(
                                                    0,
                                                    15
                                                ).map((record, index) => (
                                                    <div
                                                        key={record.id}
                                                        className={packerColor(
                                                            1,
                                                            index
                                                        )}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <div
                                            className={
                                                Number(myChar?.grade) > 1 ||
                                                user.uid === selectChar.id
                                                    ? "db db2"
                                                    : "db db2 disabled"
                                            }
                                            onClick={() => {
                                                if (
                                                    Number(myChar?.grade) > 1 ||
                                                    user.uid === selectChar.id
                                                ) {
                                                    setModal(true);
                                                    setPacker("database2");
                                                } else {
                                                    alert(
                                                        "접근 권한이 없습니다!"
                                                    );
                                                }
                                            }}
                                        >
                                            <p className="dbTitle">DB2</p>
                                            <div
                                                className={`gage ${selectChar.badge}`}
                                            >
                                                {SynapsePacker2?.slice(
                                                    0,
                                                    15
                                                ).map((record, index) => (
                                                    <div
                                                        key={record.id}
                                                        className={packerColor(
                                                            2,
                                                            index
                                                        )}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <div
                                            className={
                                                Number(myChar?.grade) > 2 ||
                                                user.uid === selectChar.id
                                                    ? "db db3"
                                                    : "db db3 disabled"
                                            }
                                            onClick={() => {
                                                if (
                                                    Number(myChar?.grade) > 2 ||
                                                    user.uid === selectChar.id
                                                ) {
                                                    setModal(true);
                                                    setPacker("database3");
                                                } else {
                                                    alert(
                                                        "접근 권한이 없습니다!"
                                                    );
                                                }
                                            }}
                                        >
                                            <p className="dbTitle">DB3</p>
                                            <div
                                                className={`gage ${selectChar.badge}`}
                                            >
                                                {SynapsePacker3?.slice(
                                                    0,
                                                    15
                                                ).map((record, index) => (
                                                    <div
                                                        key={record.id}
                                                        className={packerColor(
                                                            3,
                                                            index
                                                        )}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SynapsePacker>
                            {/* <div className="charBadge">
                                <img
                                    src={selectChar.badgeImg}
                                    alt="기숙사휘장"
                                />
                            </div> */}
                        </div>
                        <div className="charSecretWrap">
                            <div className="charSecret">
                                {Number(myChar?.grade) >= 0 || //등급 다른 부분
                                user.uid === selectChar.id ? (
                                    <div className="secret secret1">
                                        <p>{selectChar.secret1}</p>
                                    </div>
                                ) : (
                                    <div className="locked"></div>
                                )}

                                {Number(myChar?.grade) >= 2 ||
                                user.uid === selectChar.id ? (
                                    <div className="secret secret2">
                                        <p>{selectChar.secret2}</p>
                                    </div>
                                ) : (
                                    <div className="locked"></div>
                                )}

                                {Number(myChar?.grade) >= 3 ||
                                user.uid === selectChar.id ? (
                                    <div className="secret secret3">
                                        <p>{selectChar.secret3}</p>
                                    </div>
                                ) : (
                                    <div className="locked"></div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="charRelation">
                        <div className="relations relation1">
                            <div className="relationInfo">
                                <div className="relaPhoto">
                                    <div className="imgBox">
                                        <img
                                            src={
                                                selectChar.rela1
                                                    ? uidToProfile(
                                                          selectChar.rela1
                                                      )
                                                    : "/images/etc/locker.webp"
                                            }
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
                                        {selectChar.desc1 ? (
                                            <p>{selectChar.desc1}</p>
                                        ) : (
                                            <p
                                                style={{
                                                    width: "100%",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                데이터 수집 중입니다.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="relationName">
                                <div className="nameBox">
                                    <p>{uidToName(selectChar.rela1)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="relations relation2">
                            <div className="relationInfo">
                                <div className="relaPhoto">
                                    <div className="imgBox">
                                        <img
                                            src={
                                                selectChar.rela2
                                                    ? uidToProfile(
                                                          selectChar.rela2
                                                      )
                                                    : "/images/etc/locker.webp"
                                            }
                                            className="headRela"
                                            alt="관계2두상"
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
                                        {selectChar.desc2 ? (
                                            <p>{selectChar.desc2}</p>
                                        ) : (
                                            <p
                                                style={{
                                                    width: "100%",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                데이터 수집 중입니다.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="relationName">
                                <div className="nameBox">
                                    <p>{uidToName(selectChar.rela2)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="relations relation3">
                            <div className="relationInfo">
                                <div className="relaPhoto">
                                    <div className="imgBox">
                                        <img
                                            src={
                                                selectChar.rela3
                                                    ? uidToProfile(
                                                          selectChar.rela3
                                                      )
                                                    : "/images/etc/locker.webp"
                                            }
                                            className="headRela"
                                            alt="관계3두상"
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
                                        {selectChar.desc3 ? (
                                            <p>{selectChar.desc3}</p>
                                        ) : (
                                            <p
                                                style={{
                                                    width: "100%",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                데이터 수집 중입니다.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="relationName">
                                <div className="nameBox">
                                    <p>{uidToName(selectChar.rela3)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="relations relation4">
                            <div className="relationInfo">
                                <div className="relaPhoto">
                                    <div className="imgBox">
                                        <img
                                            src={
                                                selectChar.rela4
                                                    ? uidToProfile(
                                                          selectChar.rela4
                                                      )
                                                    : "/images/etc/locker.webp"
                                            }
                                            className="headRela"
                                            alt="관계4두상"
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
                                        {selectChar.desc4 ? (
                                            <p>{selectChar.desc4}</p>
                                        ) : (
                                            <p
                                                style={{
                                                    width: "100%",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                데이터 수집 중입니다.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="relationName">
                                <div className="nameBox">
                                    <p>{uidToName(selectChar.rela4)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Character>
            ) : (
                <Character>
                    <div className="selectDoc">Select Document...</div>
                </Character>
            )}

            <CharList>
                <div className="badgeWrap">
                    <img src="/images/etc/teacher_badge.png" alt="휘장" />
                </div>
                <div className="gifWrap teacher">
                    {allChar?.map(
                        (char, index) =>
                            char.badge === "teacher" && (
                                <button
                                    className={`charGif ${
                                        char.id === selectChar.id && "selected"
                                    }`}
                                    key={index}
                                    value={char.id}
                                    onClick={handleCharSet}
                                >
                                    <img src={char.gifUrl} alt={char.gifUrl} />
                                    <div className="hover">
                                        {char.name.replace(/\s/g, "\n")}
                                    </div>
                                </button>
                            )
                    )}
                </div>
            </CharList>
        </CharacterWrap>
    );
}
