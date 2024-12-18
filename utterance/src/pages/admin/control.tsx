import {
    collection,
    doc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    Timestamp,
    updateDoc,
    writeBatch,
} from "firebase/firestore";
import { ControlStyle } from "./adminStyle";
import { db } from "@/firebaseApp";
import { AllCharProps } from "@/atom";
import { useQuery, useQueryClient } from "react-query";
import {
    ButtonStyle,
    DropdownStyle,
    InputStyle,
    Out,
} from "@/components/Style";
import { useEffect, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export interface MoneyProps {
    uid: string;
    credit: number;
    name: string;
}
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
interface LogUpdatesProps {
    id: string;
    data: {
        log: string; // log는 string 타입
        timeStamp: Timestamp | null; // timeStamp는 Timestamp | null 타입
    };
}
export interface ControlProps {
    id: string;
    control: {
        mail: boolean;
        profileread: boolean;
        profilewrite: boolean;
    };
}
export default function Control() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [updates, setUpdates] = useState<MoneyUpdatesProps[]>([]);
    const [gradeUpdates, setGradeUpdates] = useState<GradeUpdatesProps[]>([]);
    const [badegUpdates, setBadgeUpdates] = useState<BadgeUpdatesProps[]>([]);
    const [logUpdates, setLogUpdates] = useState<LogUpdatesProps[]>([]);
    const [reason, setReason] = useState<string>("");
    const [mode, setMode] = useState<string>("moneyadd");

    const [sendmail, setSendmail] = useState<boolean>(false);
    const [readprofile, setReadprofile] = useState<boolean>(false);
    const [writeprofile, setWriteprofile] = useState<boolean>(false);

    // 기존 기본 설정(우편 / 프로필 컨트롤) 받아 오는 부분
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

    useEffect(() => {
        if (control) {
            setSendmail(control[0].control.mail);
            setReadprofile(control[0].control.profileread);
            setWriteprofile(control[0].control.profilewrite);
        }
    }, [control]);

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
    const fetchMoneyData = async () => {
        try {
            const charRef = collection(db, "money");
            const charQuery = query(charRef, orderBy("name", "asc"));
            const allCharSnapshot = await getDocs(charQuery);
            const data: MoneyProps[] = allCharSnapshot.docs.map((doc) => ({
                ...doc.data(),
            })) as MoneyProps[];
            return data;
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };
    const { data: moneyData } = useQuery("moneyData", fetchMoneyData, {
        staleTime: 20000,
    });

    const searchCredit = (myId: string) => {
        if (moneyData) {
            for (const char of moneyData) {
                if (char.uid === myId) {
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

    //전체 컨트롤 설정 change
    const handleControlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { name, value },
        } = e;
        if (name === "sendMailData") {
            if (value === "true") setSendmail(true);
            if (value === "false") setSendmail(false);
        }
        if (name === "profileReadData") {
            if (value === "true") setReadprofile(true);
            if (value === "false") setReadprofile(false);
        }
        if (name === "profileWriteData") {
            if (value === "true") setWriteprofile(true);
            if (value === "false") setWriteprofile(false);
        }
    };

    useEffect(() => {
        console.log(reason);
    }, [reason]);
    //플레이어 개인 설정 change
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
        if (name === "reason") {
            setReason(value);
        }
        if (myCredit || myCredit === 0) {
            if (mode === "moneyadd") {
                setUpdates([
                    ...updates.filter((update) => update.id !== name),
                    {
                        id: name,
                        data: {
                            credit: myCredit + Number(value),
                        },
                    },
                ]);
                setLogUpdates([
                    ...logUpdates.filter((update) => update.id !== name),
                    {
                        id: name,
                        data: {
                            log: `${reason} ${value}Q 입금되었습니다.`,
                            timeStamp: serverTimestamp() as Timestamp | null,
                        },
                    },
                ]);
            }
            if (mode === "moneysub") {
                setUpdates([
                    ...updates.filter((update) => update.id !== name),
                    { id: name, data: { credit: myCredit - Number(value) } },
                ]);
                setLogUpdates([
                    ...logUpdates.filter((update) => update.id !== name),
                    {
                        id: name,
                        data: {
                            log: `${reason} ${value}Q 차감되었습니다.`,
                            timeStamp: serverTimestamp() as Timestamp | null,
                        },
                    },
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
                        gradeImg:
                            Number(value) < 4
                                ? `/images/etc/lv${value}.webp`
                                : `/images/etc/lv4.webp`,
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

    //컨트롤제출
    const submitControl = async () => {
        if (control) {
            const controlRef = doc(db, "control", control[0].id);
            try {
                await updateDoc(controlRef, {
                    control: {
                        mail: sendmail,
                        profileread: readprofile,
                        profilewrite: writeprofile,
                    },
                });
                alert("저장됨");
            } catch (error) {
                console.error("Error writing batch: ", error);
            }
        }
    };

    //플레이어 개개 설정 제출
    const handleSubmit = async () => {
        const batch = writeBatch(db);

        if (mode === "moneyadd" || mode === "moneysub") {
            updates.forEach((update) => {
                const docRef = doc(db, "money", update.id);
                batch.update(docRef, update.data);
            });
            logUpdates.forEach((update) => {
                const LogRef = doc(collection(db, "money", update.id, "log"));
                batch.set(LogRef, update.data);
            });

            try {
                await batch.commit();
                await queryClient.invalidateQueries("moneyData");
                setReason("");
                alert("저장 성공");
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
                setReason("");
                alert("저장 성공");
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
                alert("저장 성공");
                console.log("Batch write successfully committed!");
            } catch (error) {
                console.error("Error writing batch: ", error);
            }
        }
    };

    return (
        <ControlStyle>
            <Out onClick={() => navigate("/")}>
                <RiCloseLine size={25} color="white" />
            </Out>
            {control && (
                <div className="controlBox">
                    <div className="boxWrap">
                        <div className="eachBox">
                            <p>우편</p>
                            <div>
                                <input
                                    type="radio"
                                    name="sendMailData"
                                    id="sendMailTrue"
                                    value="true"
                                    checked={sendmail === true}
                                    onChange={handleControlChange}
                                />
                                <label htmlFor="sendMailTrue">허용</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    name="sendMailData"
                                    id="sendMailFalse"
                                    value="false"
                                    checked={sendmail === false}
                                    onChange={handleControlChange}
                                />
                                <label htmlFor="sendMailFalse">차단</label>
                            </div>
                        </div>
                        <div className="eachBox">
                            <p>프로필열람</p>
                            <div>
                                <input
                                    type="radio"
                                    name="profileReadData"
                                    id="profileReadTrue"
                                    value="true"
                                    checked={readprofile === true}
                                    onChange={handleControlChange}
                                />
                                <label htmlFor="profileReadTrue">허용</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    name="profileReadData"
                                    id="profileReadFalse"
                                    value="false"
                                    checked={readprofile === false}
                                    onChange={handleControlChange}
                                />
                                <label htmlFor="profileReadFalse">차단</label>
                            </div>
                        </div>
                        <div className="eachBox">
                            <p>프로필작성</p>
                            <div>
                                <input
                                    type="radio"
                                    name="profileWriteData"
                                    id="profileWriteTrue"
                                    value="true"
                                    checked={writeprofile === true}
                                    onChange={handleControlChange}
                                />
                                <label htmlFor="profileWriteTrue">허용</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    name="profileWriteData"
                                    id="profileWriteFalse"
                                    value="false"
                                    checked={writeprofile === false}
                                    onChange={handleControlChange}
                                />
                                <label htmlFor="profileWriteFalse">차단</label>
                            </div>
                        </div>
                        <button onClick={submitControl}>저장</button>
                    </div>
                </div>
            )}
            <div className="buttonWrap">
                <ButtonStyle
                    fontSize="15px"
                    className={mode === "moneyadd" ? "on" : ""}
                    onClick={() => {
                        setMode("moneyadd");
                        setUpdates([]);
                        setLogUpdates([]);
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
                        setLogUpdates([]);
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
                        setLogUpdates([]);
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
                        setLogUpdates([]);
                    }}
                >
                    소대 배치
                </ButtonStyle>
            </div>
            <ul className="centerWrap">
                <li className="eachlow">
                    <div className="charname">사유</div>
                    <InputStyle
                        fontSize="13px"
                        fontFamily="nexonGothic"
                        height="30px"
                        border="1px solid #fff"
                        name="reason"
                        onChange={handleChange}
                    />
                </li>
                {moneyData &&
                    mode === "moneyadd" &&
                    moneyData?.map((character, index) => (
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
                                    name={character.uid}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="leftMoney">
                                {(searchLeftCredit(character.uid) ||
                                    character.credit) + " Q"}
                            </div>
                        </li>
                    ))}
                {moneyData &&
                    mode === "moneysub" &&
                    moneyData?.map((character, index) => (
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
                                    name={character.uid}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="leftMoney">
                                {(searchLeftCredit(character.uid) ||
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
                                    <option value="4">4 등급</option>
                                    <option value="5">5 등급</option>
                                    <option value="6">6 등급</option>
                                    <option value="7">7 등급</option>
                                    <option value="8">8 등급</option>
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
                                    <option value="quasa4">훈련생1</option>
                                    <option value="quasa5">훈련생2</option>
                                    <option value="quasa6">훈련생3</option>
                                    <option value="teacher">teacher</option>
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
