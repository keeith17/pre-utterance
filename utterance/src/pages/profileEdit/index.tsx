import {
    InputStyle,
    TextAreaStyle,
    DropdownStyle,
    Out,
    ButtonStyle,
} from "@/components/Style";
import { ProfileLayout, Save } from "./profileEditStyle";
import { RiCloseLine } from "react-icons/ri";
import { useNavigate } from "react-router";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    updateDoc,
} from "firebase/firestore";
import { db } from "@/firebaseApp";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AllCharProps, selectUserState, userState } from "@/atom";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

interface InputCharProps {
    gifUrl: string;
    name: string;
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
    rela4: string;
    desc4: string;
}

export default function ProfileEditPage() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const setSelectChar = useSetRecoilState(selectUserState);
    // 스타일링 통일
    const thisHeight: string = "1.5vw";
    const thisFont: string = "nexonGothic";
    // 현재 접속 유저 정보
    const user = useRecoilValue(userState);
    const userUid = user.uid;

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

    // 내 캐릭터 정보 세팅
    const fetchCharData = async (userUid: string | null) => {
        if (userUid) {
            const charRef = doc(db, "character", userUid);
            const charSnap = await getDoc(charRef);
            const data = {
                ...(charSnap?.data() as AllCharProps),
                id: userUid,
            };
            setInput({
                gifUrl: data.gifUrl,
                name: data.name,
                height: data.height,
                weight: data.weight,
                from: data.from,
                planet: data.planet,
                secret1: data.secret1,
                secret2: data.secret2,
                secret3: data.secret3,
                rela1: data.rela1,
                desc1: data.desc1,
                rela2: data.rela2,
                desc2: data.desc2,
                rela3: data.rela3,
                desc3: data.desc3,
                rela4: data.rela4,
                desc4: data.desc4,
            });
            return data;
        } else {
            throw new Error("사용자 UID가 존재하지 않습니다.");
        }
    };
    // 내 캐릭터 정보
    const { data: myChar } = useQuery<AllCharProps>(
        "charData",
        () => fetchCharData(userUid),
        {
            staleTime: 60000,
        }
    );

    // 전체 캐릭터 데이터 받아 오는 부분
    const fetchAllCharData = async () => {
        const charRef = collection(db, "character");
        const charQuery = query(charRef, orderBy("name", "asc"));
        const allCharSnapshot = await getDocs(charQuery);
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

    const [input, setInput] = useState<InputCharProps>({
        gifUrl: myChar?.gifUrl || "",
        name: myChar?.name || "",
        height: myChar?.height || "",
        weight: myChar?.weight || "",
        from: myChar?.from || "",
        planet: myChar?.planet || "",
        secret1: myChar?.secret1 || "",
        secret2: myChar?.secret2 || "",
        secret3: myChar?.secret3 || "",
        rela1: myChar?.rela1 || "",
        desc1: myChar?.desc1 || "",
        rela2: myChar?.rela2 || "",
        desc2: myChar?.desc2 || "",
        rela3: myChar?.rela3 || "",
        desc3: myChar?.desc3 || "",
        rela4: myChar?.rela4 || "",
        desc4: myChar?.desc4 || "",
    });

    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const {
            target: { name, value },
        } = e;
        if (name === "gifUrl") {
            setInput({ ...input, gifUrl: value });
        }
        if (name === "name") {
            setInput({ ...input, name: value });
        }
        if (name === "height") {
            setInput({ ...input, height: value });
        }
        if (name === "weight") {
            setInput({ ...input, weight: value });
        }
        if (name === "from") {
            setInput({ ...input, from: value });
        }
        if (name === "planet") {
            setInput({ ...input, planet: value });
        }
        if (name === "secret1") {
            setInput({ ...input, secret1: value });
        }
        if (name === "secret2") {
            setInput({ ...input, secret2: value });
        }
        if (name === "secret3") {
            setInput({ ...input, secret3: value });
        }
        if (name === "rela1") {
            setInput({ ...input, rela1: value });
        }
        if (name === "desc1") {
            setInput({ ...input, desc1: value });
        }
        if (name === "rela2") {
            setInput({ ...input, rela2: value });
        }
        if (name === "desc2") {
            setInput({ ...input, desc2: value });
        }
        if (name === "rela3") {
            setInput({ ...input, rela3: value });
        }
        if (name === "desc3") {
            setInput({ ...input, desc3: value });
        }
        if (name === "rela4") {
            setInput({ ...input, rela4: value });
        }
        if (name === "desc4") {
            setInput({ ...input, desc4: value });
        }
    };
    const mutation = useMutation(
        // 첫 번째 매개변수: 비동기 함수, 서버에 요청을 보내는 역할
        async (input: InputCharProps) => {
            if (user.uid) {
                const postRef = doc(db, "character", user?.uid);
                await updateDoc(postRef, {
                    gifUrl: input.gifUrl,
                    name: input.name,
                    height: input.height,
                    weight: input.weight,
                    from: input.from,
                    planet: input.planet,
                    secret1: input.secret1,
                    secret2: input.secret2,
                    secret3: input.secret3,
                    rela1: input.rela1,
                    desc1: input.desc1,
                    rela2: input.rela2,
                    desc2: input.desc2,
                    rela3: input.rela3,
                    desc3: input.desc3,
                    rela4: input.rela4,
                    desc4: input.desc4,
                });
                await queryClient.invalidateQueries("charData");
            }
        },
        {
            onSuccess: () => {
                setSelectChar({
                    id: myChar?.id || "",
                    nick: myChar?.nick || "",
                    gifUrl: input?.gifUrl || "",
                    badge: myChar?.badge || "",
                    badgeImg: myChar?.badgeImg || "",
                    grade: myChar?.grade || "",
                    gradeImg: myChar?.gradeImg || "",
                    credit: myChar?.credit || 0,
                    name: input.name || "",
                    height: input.height || "",
                    weight: input.weight || "",
                    from: input.from || "",
                    planet: input.planet || "",
                    secret1: input.secret1 || "",
                    secret2: input.secret2 || "",
                    secret3: input.secret3 || "",
                    rela1: input.rela1 || "",
                    desc1: input.desc1 || "",
                    rela2: input.rela2 || "",
                    desc2: input.desc2 || "",
                    rela3: input.rela3 || "",
                    desc3: input.desc3 || "",
                    rela4: input.rela4 || "",
                    desc4: input.desc4 || "",
                });
                if (myChar?.badge === "teacher") {
                    navigate("/TeacherProfilePage");
                } else {
                    navigate("/ProfilePage");
                }
            },
            onError: (error) => {
                console.error("POST 실패:", error);
            },
        }
    );
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate(input);
    };

    return (
        <ProfileLayout>
            <div className="profileLayout">
                {/* <img
                    src="/images/profile_write/mainframe/mainframe_968x1043.webp"
                    alt="mainframe_968x1043"
                    className="mainframe"
                /> */}
                <Out
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    <RiCloseLine size={35} />
                </Out>
                <div className="profTitle">
                    <div className="titleBox">
                        <img
                            src="/images/profile_write/title/title_465x17.webp"
                            className="title"
                            alt="title_465x17"
                        />
                    </div>
                </div>
                <form className="formWrap" onSubmit={handleSubmit}>
                    <div className="profGroup">
                        <div className="inputGroup">
                            <div className="profBox">두상</div>
                            <div className="inputBox">
                                <InputStyle
                                    placeholder="1:1 비율의 gif 링크를 삽입해 주세요"
                                    fontSize=" 0.65vw"
                                    border="none"
                                    height={thisHeight}
                                    fontFamily={thisFont}
                                    value={input.gifUrl}
                                    name="gifUrl"
                                    onChange={handleChange}
                                ></InputStyle>
                            </div>
                        </div>
                        <div className="inputGroup">
                            <div className="profBox">코드 네임</div>
                            <div className="inputBox">
                                <InputStyle
                                    placeholder="본명이 아닌 코드 네임을 입력해 주세요."
                                    fontSize=" 0.65vw"
                                    border="none"
                                    height={thisHeight}
                                    fontFamily={thisFont}
                                    value={input.name}
                                    name="name"
                                    onChange={handleChange}
                                ></InputStyle>
                            </div>
                        </div>
                        <div className="inputGroup">
                            <div className="profBox">키</div>
                            <div className="inputBox">
                                <InputStyle
                                    placeholder="숫자만 입력해 주세요"
                                    fontSize=" 0.65vw"
                                    border="none"
                                    height={thisHeight}
                                    fontFamily={thisFont}
                                    value={input.height}
                                    name="height"
                                    onChange={handleChange}
                                ></InputStyle>
                            </div>
                        </div>
                        <div className="inputGroup">
                            <div className="profBox">몸무게</div>
                            <div className="inputBox">
                                <InputStyle
                                    placeholder="숫자만 입력해 주세요"
                                    fontSize=" 0.65vw"
                                    border="none"
                                    height={thisHeight}
                                    fontFamily={thisFont}
                                    value={input.weight}
                                    name="weight"
                                    onChange={handleChange}
                                ></InputStyle>
                            </div>
                        </div>
                        <div className="inputGroup">
                            <div className="profBox">종족</div>
                            <div className="inputBox">
                                <DropdownStyle
                                    height={thisHeight}
                                    fontFamily={thisFont}
                                    value={input.from}
                                    name="from"
                                    onChange={handleChange}
                                >
                                    <option value="종족 없음">
                                        종족을 선택해주세요.
                                    </option>
                                    <option value="루흘">루흘</option>
                                    <option value="아스화리탈">
                                        아스화리탈
                                    </option>
                                    <option value="우고트">우고트</option>
                                    <option value="테라">테라</option>
                                    <option value="하라간">하라간</option>
                                </DropdownStyle>
                            </div>
                        </div>
                        <div className="inputGroup">
                            <div className="profBox">행성</div>
                            <div className="inputBox">
                                <InputStyle
                                    placeholder="출신 행성을 입력해 주세요."
                                    fontSize=" 0.65vw"
                                    border="none"
                                    height={thisHeight}
                                    fontFamily={thisFont}
                                    value={input.planet}
                                    name="planet"
                                    onChange={handleChange}
                                ></InputStyle>
                            </div>
                        </div>
                        <div className="inputGroup">
                            <div className="profBox">비밀</div>
                            <div className="inputBox">
                                <TextAreaStyle
                                    fontFamily={thisFont}
                                    placeholder="정보 권한 1등급에 해당되는 정보를 입력해 주세요."
                                    value={input.secret1}
                                    name="secret1"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="inputGroup">
                            <div className="profBox">기밀</div>
                            <div className="inputBox">
                                <TextAreaStyle
                                    fontFamily={thisFont}
                                    placeholder="정보 권한 2등급에 해당되는 정보를 입력해 주세요."
                                    value={input.secret2}
                                    name="secret2"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="inputGroup">
                            <div className="profBox">극비</div>
                            <div className="inputBox">
                                <TextAreaStyle
                                    fontFamily={thisFont}
                                    placeholder="정보 권한 3등급에 해당되는 정보를 입력해 주세요."
                                    value={input.secret3}
                                    name="secret3"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="inputGroup">
                            <div className="profBox">소셜 네트워크 A</div>
                            <div className="inputBox">
                                <DropdownStyle
                                    height={thisHeight}
                                    fontFamily={thisFont}
                                    value={input.rela1}
                                    name="rela1"
                                    onChange={handleChange}
                                >
                                    <option value="">
                                        상대 캐릭터를 선택해 주세요.
                                    </option>
                                    {allChar?.map((char, index) => (
                                        <option key={index} value={char.id}>
                                            {uidToName(char.id)}
                                        </option>
                                    ))}
                                </DropdownStyle>
                                <InputStyle
                                    fontSize=" 0.65vw"
                                    border="none"
                                    height={thisHeight}
                                    fontFamily={thisFont}
                                    placeholder="관계를 간단히 서술해 주세요"
                                    value={input.desc1}
                                    name="desc1"
                                    onChange={handleChange}
                                ></InputStyle>
                            </div>
                        </div>
                        <div className="inputGroup">
                            <div className="profBox">소셜 네트워크 B</div>
                            <div className="inputBox">
                                <DropdownStyle
                                    height={thisHeight}
                                    fontFamily={thisFont}
                                    value={input.rela2}
                                    name="rela2"
                                    onChange={handleChange}
                                >
                                    <option value="">
                                        상대 캐릭터를 선택해 주세요.
                                    </option>
                                    {allChar?.map((char, index) => (
                                        <option key={index} value={char.id}>
                                            {uidToName(char.id)}
                                        </option>
                                    ))}
                                </DropdownStyle>
                                <InputStyle
                                    fontSize=" 0.65vw"
                                    border="none"
                                    height={thisHeight}
                                    fontFamily={thisFont}
                                    placeholder="관계를 간단히 서술해 주세요"
                                    value={input.desc2}
                                    name="desc2"
                                    onChange={handleChange}
                                ></InputStyle>
                            </div>
                        </div>
                        <div className="inputGroup">
                            <div className="profBox">소셜 네트워크 C</div>
                            <div className="inputBox">
                                <DropdownStyle
                                    height={thisHeight}
                                    fontFamily={thisFont}
                                    value={input.rela3}
                                    name="rela3"
                                    onChange={handleChange}
                                >
                                    <option value="">
                                        상대 캐릭터를 선택해 주세요.
                                    </option>
                                    {allChar?.map((char, index) => (
                                        <option key={index} value={char.id}>
                                            {uidToName(char.id)}
                                        </option>
                                    ))}
                                </DropdownStyle>
                                <InputStyle
                                    fontSize="0.65vw"
                                    border="none"
                                    height={thisHeight}
                                    fontFamily={thisFont}
                                    placeholder="관계를 간단히 서술해 주세요"
                                    value={input.desc3}
                                    name="desc3"
                                    onChange={handleChange}
                                ></InputStyle>
                            </div>
                        </div>
                        <div className="inputGroup">
                            <div className="profBox">소셜 네트워크 D</div>
                            <div className="inputBox">
                                <DropdownStyle
                                    height={thisHeight}
                                    fontFamily={thisFont}
                                    value={input.rela4}
                                    name="rela4"
                                    onChange={handleChange}
                                >
                                    <option value="">
                                        상대 캐릭터를 선택해 주세요.
                                    </option>
                                    {allChar?.map((char, index) => (
                                        <option key={index} value={char.id}>
                                            {uidToName(char.id)}
                                        </option>
                                    ))}
                                </DropdownStyle>
                                <InputStyle
                                    fontSize="0.65vw"
                                    border="none"
                                    height={thisHeight}
                                    fontFamily={thisFont}
                                    placeholder="관계를 간단히 서술해 주세요"
                                    value={input.desc4}
                                    name="desc4"
                                    onChange={handleChange}
                                ></InputStyle>
                            </div>
                        </div>
                    </div>
                    <Save>
                        <ButtonStyle type="submit" fontSize="0.9vw">
                            저장
                        </ButtonStyle>
                    </Save>
                </form>
            </div>
        </ProfileLayout>
    );
}
