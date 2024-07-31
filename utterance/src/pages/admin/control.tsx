import {
    collection,
    doc,
    getDocs,
    orderBy,
    query,
    writeBatch,
} from "firebase/firestore";
import { ControlStyle } from "./adminStyle";
import { db } from "@/firebaseApp";
import { AllCharProps } from "@/atom";
import { useQuery, useQueryClient } from "react-query";
import { ButtonStyle, DropdownStyle, InputStyle } from "@/components/Style";
import { useState } from "react";

interface MoneyUpdatesProps {
    id: string;
    data: {
        [credit: string]: number;
    };
}
interface GradeUpdatesProps {
    id: string;
    data: {
        [grade: string]: string;
    };
}
interface BadgeUpdatesProps {
    id: string;
    data: {
        [badge: string]: string;
    };
}
interface ControlProps {
    id: string;
    control: {
        mail: boolean;
        profileread: boolean;
        profilewrite: boolean;
    };
}
export default function Control() {
    const queryClient = useQueryClient();
    const [updates, setUpdates] = useState<MoneyUpdatesProps[]>([]);
    const [gradeUpdates, setGradeUpdates] = useState<GradeUpdatesProps[]>([]);
    const [badegUpdates, setBadgeUpdates] = useState<BadgeUpdatesProps[]>([]);
    const [mode, setMode] = useState<string>("moneyadd");

    // 전체 캐릭터 데이터 받아 오는 부분
    const fetchControlData = async () => {
        const controlRef = collection(db, "control");
        const controlSnapshot = await getDocs(controlRef);
        const data: ControlProps[] = controlSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as ControlProps[];

        return data;
    };

    const { data: control } = useQuery<ControlProps[]>(
        "control",
        fetchControlData,
        {
            staleTime: 600000, // 캐시된 데이터가 10분 후에 만료됨
        }
    );

    console.log(control);

    const fetchAllCharData = async () => {
        try {
            const charRef = collection(db, "character");
            const charQuery = query(charRef, orderBy("name", "asc"));
            const allCharSnapshot = await getDocs(charQuery);
            const data: AllCharProps[] = allCharSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as AllCharProps[];
            return data;
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };
    const { data: allChar } = useQuery("allChar", fetchAllCharData, {
        staleTime: 20000,
    });

    const searchCredit = (myId: string) => {
        if (allChar) {
            for (const char of allChar) {
                if (char.id === myId) {
                    return char.credit;
                }
            }
        }
    };

    const searchLeftCredit = (myId: string) => {
        if (updates) {
            for (const update of updates) {
                if (update.id === myId) {
                    return update.data.credit;
                }
            }
        }
    };

    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>
    ) => {
        const {
            target: { name, value },
        } = e;
        // const tempArr = updates.filter((update) => update.id !== name);
        const myCredit = searchCredit(name);
        if (myCredit) {
            if (mode === "moneyadd") {
                setUpdates([
                    ...updates.filter((update) => update.id !== name),
                    { id: name, data: { credit: myCredit + Number(value) } },
                ]);
            }
            if (mode === "moneysub") {
                setUpdates([
                    ...updates.filter((update) => update.id !== name),
                    { id: name, data: { credit: myCredit - Number(value) } },
                ]);
            }
        }
        if (mode === "grade") {
            setGradeUpdates([
                ...gradeUpdates.filter(
                    (gradeUpdates) => gradeUpdates.id !== name
                ),
                {
                    id: name,
                    data: {
                        grade: value,
                        gradeImg: `/images/etc/lv${value}.webp`,
                    },
                },
            ]);
        }
        if (mode === "badge") {
            setBadgeUpdates([
                ...badegUpdates.filter(
                    (badegUpdates) => badegUpdates.id !== name
                ),
                {
                    id: name,
                    data: {
                        badge: value,
                    },
                },
            ]);
        }
        // setUpdates([...updates, { id: name, data: { credit: value } }]);
    };

    const handleSubmit = async () => {
        const batch = writeBatch(db);

        if (mode === "moneyadd" || mode === "moneysub") {
            updates.forEach((update) => {
                const docRef = doc(db, "character", update.id);
                batch.update(docRef, update.data);
            });

            try {
                await batch.commit();
                await queryClient.invalidateQueries("allChar");
                console.log("Batch write successfully committed!");
            } catch (error) {
                console.error("Error writing batch: ", error);
            }
        }
        if (mode === "grade") {
            gradeUpdates.forEach((update) => {
                const docRef = doc(db, "character", update.id);
                batch.update(docRef, update.data);
            });

            try {
                await batch.commit();
                await queryClient.invalidateQueries("allChar");
                console.log("Batch write successfully committed!");
            } catch (error) {
                console.error("Error writing batch: ", error);
            }
        }
        if (mode === "badge") {
            badegUpdates.forEach((update) => {
                const docRef = doc(db, "character", update.id);
                batch.update(docRef, update.data);
            });

            try {
                await batch.commit();
                await queryClient.invalidateQueries("allChar");
                console.log("Batch write successfully committed!");
            } catch (error) {
                console.error("Error writing batch: ", error);
            }
        }
    };

    return (
        <ControlStyle>
            <div className="controlBox"></div>
            <div className="buttonWrap">
                <ButtonStyle
                    fontSize="15px"
                    className={mode === "moneyadd" ? "on" : ""}
                    onClick={() => {
                        setMode("moneyadd");
                        setUpdates([]);
                    }}
                >
                    재화 추가
                </ButtonStyle>
                <ButtonStyle
                    fontSize="15px"
                    className={mode === "moneysub" ? "on" : ""}
                    onClick={() => {
                        setMode("moneysub");
                        setUpdates([]);
                    }}
                >
                    재화 차감
                </ButtonStyle>
                <ButtonStyle
                    fontSize="15px"
                    className={mode === "grade" ? "on" : ""}
                    onClick={() => {
                        setMode("grade");
                        setUpdates([]);
                    }}
                >
                    등급
                </ButtonStyle>
                <ButtonStyle
                    fontSize="15px"
                    className={mode === "badge" ? "on" : ""}
                    onClick={() => {
                        setMode("badge");
                        setUpdates([]);
                    }}
                >
                    소대 배치
                </ButtonStyle>
            </div>
            <ul className="centerWrap">
                {allChar &&
                    mode === "moneyadd" &&
                    allChar?.map((character, index) => (
                        <li className="eachlow" key={index}>
                            <div className="charname">{character?.name}</div>
                            <div className="money">
                                {(character?.credit || 0) + " Q"}
                            </div>
                            <div className="makeMoney">
                                <InputStyle
                                    fontSize="13px"
                                    fontFamily="nexonGothic"
                                    height="30px"
                                    border="1px solid #fff"
                                    name={character.id}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="leftMoney">
                                {(searchLeftCredit(character.id) ||
                                    character.credit) + " Q"}
                            </div>
                        </li>
                    ))}
                {allChar &&
                    mode === "moneysub" &&
                    allChar?.map((character, index) => (
                        <li className="eachlow" key={index}>
                            <div className="charname">{character?.name}</div>
                            <div className="money">
                                {(character?.credit || 0) + " Q"}
                            </div>
                            <div className="makeMoney">
                                <InputStyle
                                    fontSize="13px"
                                    fontFamily="nexonGothic"
                                    height="30px"
                                    border="1px solid #fff"
                                    name={character.id}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="leftMoney">
                                {(searchLeftCredit(character.id) ||
                                    character.credit) + " Q"}
                            </div>
                        </li>
                    ))}
                {allChar &&
                    mode === "grade" &&
                    allChar?.map((character, index) => (
                        <li className="eachlow" key={index}>
                            <div className="charname">{character?.name}</div>
                            <div className="grade">
                                <DropdownStyle
                                    height="30px"
                                    fontFamily="nexonGothic"
                                    name={character.id}
                                    defaultValue={character?.grade}
                                    onChange={handleChange}
                                >
                                    <option value="0">0 등급</option>
                                    <option value="1">1 등급</option>
                                    <option value="2">2 등급</option>
                                    <option value="3">3 등급</option>
                                    {/* <option>
                                      {(character?.grade || 0) + "등급"}
                                  </option> */}
                                </DropdownStyle>
                            </div>
                        </li>
                    ))}
                {allChar &&
                    mode === "badge" &&
                    allChar?.map((character, index) => (
                        <li className="eachlow" key={index}>
                            <div className="charname">{character?.name}</div>
                            <div className="badge">
                                <DropdownStyle
                                    height="30px"
                                    fontFamily="nexonGothic"
                                    name={character.id}
                                    defaultValue={character?.badge}
                                    onChange={handleChange}
                                >
                                    <option value="quasa1">quasa1</option>
                                    <option value="quasa2">quasa2</option>
                                    <option value="quasa3">quasa3</option>
                                    <option value="quasa4">quasa4</option>
                                    {/* <option>
                                      {(character?.grade || 0) + "등급"}
                                  </option> */}
                                </DropdownStyle>
                            </div>
                        </li>
                    ))}
            </ul>
            <div className="buttonWrap">
                <ButtonStyle fontSize="15px" onClick={handleSubmit}>
                    저장!
                </ButtonStyle>
            </div>
        </ControlStyle>
    );
}
