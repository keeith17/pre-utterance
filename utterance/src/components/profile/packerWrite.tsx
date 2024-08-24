import { RiCloseLine } from "react-icons/ri";
import { ButtonStyle, InputStyle, Out, TextAreaStyle } from "../Style";
import {
    DetailBodyBox,
    DetailTitleBox,
    PackerDetailModal,
    PackerWriteModal,
    RepackBox,
    SubmitBox,
    WriteBodyBox,
    WriteTitleBox,
} from "./pacekrStyle";
import { useRecoilValue } from "recoil";
import { AllCharProps, selectUserState, userState } from "@/atom";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    serverTimestamp,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { db } from "@/firebaseApp";

interface PackeWriteProps {
    setMode: React.Dispatch<React.SetStateAction<string>>;
    mode: string;
    packer: string;
    record: DataProps;
}

export interface DataProps {
    title: string;
    image: string;
    content: string;
    createdAt: string;
    id: string;
}

export const PackerWrite: React.FC<PackeWriteProps> = ({
    setMode,
    packer,
    mode,
    record,
}) => {
    const queryClient = useQueryClient();
    const selectChar = useRecoilValue(selectUserState);
    const user = useRecoilValue(userState);
    const [data, setData] = useState<DataProps>({
        title: record.title || "",
        image: record.image || "",
        content: record.content || "",
        createdAt: record.createdAt || "", //쓸모없는데 props 맞출라고
        id: record.id || "", //쓸모없는데 props 맞출라고
    });

    // 내 캐릭터 돈...
    const fetchCharData = async (userUid: string | null) => {
        if (userUid) {
            const charRef = doc(db, "money", userUid);
            const charSnap = await getDoc(charRef);
            const data = { ...(charSnap?.data() as AllCharProps), id: userUid };
            return data;
        } else {
            throw new Error("사용자 UID가 존재하지 않습니다.");
        }
    };
    // 내 캐릭터 정보
    const { data: myCharMoney } = useQuery<AllCharProps>(
        "myCharMoney",
        () => fetchCharData(user?.uid),
        {
            staleTime: 60000 * 60 * 3,
        }
    );

    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const {
            target: { name, value },
        } = e;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const packing = useMutation(
        async (data: DataProps) => {
            if (user?.uid) {
                if (mode === "rewrite") {
                    const charRef = doc(
                        db,
                        "database",
                        user?.uid,
                        packer,
                        data.id
                    );
                    await setDoc(charRef, {
                        title: data.title,
                        image: data.image,
                        content: data.content,
                        createdAt: data.createdAt,
                    });
                }
                if (mode === "write") {
                    const charRef = collection(
                        db,
                        "database",
                        user?.uid,
                        packer
                    );
                    const charMoneyRef = doc(db, "money", user.uid);
                    const charMoneyLogRef = collection(
                        db,
                        "money",
                        user.uid,
                        "log"
                    );
                    await addDoc(charRef, {
                        title: data.title,
                        image: data.image,
                        content: data.content,
                        createdAt: new Date()?.toLocaleDateString("ko", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: false,
                        }),
                    });
                    if (myCharMoney && data.content.length > 500) {
                        await updateDoc(charMoneyRef, {
                            credit: myCharMoney.credit + 200,
                        });
                        await addDoc(charMoneyLogRef, {
                            log: "로그 작성 200Q 입금되었습니다.",
                            timeStamp: serverTimestamp(),
                        });
                    } else if (myCharMoney) {
                        await updateDoc(charMoneyRef, {
                            credit: myCharMoney.credit + 100,
                        });
                        await addDoc(charMoneyLogRef, {
                            log: "로그 작성 100Q 입금되었습니다.",
                            timeStamp: serverTimestamp(),
                        });
                    }
                }
            }
            setMode("list");
            await queryClient.invalidateQueries([packer, selectChar.id]);
            await queryClient.invalidateQueries("myCharMoney");
        },
        {
            onError: (error) => {
                console.error("POST 실패:", error);
            },
        }
    );

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        packing.mutate({
            title: data.title,
            image: data.image,
            content: data.content,
            createdAt: data.createdAt,
            id: data.id,
        });
    };

    return mode === "write" ? (
        <PackerWriteModal>
            <Out onClick={() => setMode("list")}>
                <RiCloseLine size={25} color="black" />
            </Out>
            <form onSubmit={onSubmit}>
                <WriteTitleBox>
                    <InputStyle
                        fontSize={"1.6vw"}
                        fontFamily={"nexonGothic"}
                        height={"100%"}
                        border={"none"}
                        placeholder="제목을 입력해 주세요"
                        name="title"
                        onChange={handleChange}
                    >
                        {/* {mode === "rewrite" && "record.title"} */}
                    </InputStyle>
                </WriteTitleBox>
                <WriteBodyBox>
                    <InputStyle
                        fontSize={"0.8vw"}
                        fontFamily={"nexonGothic"}
                        height={"6%"}
                        border={"none"}
                        placeholder="이미지 url 입력 (필수가 아닙니다)"
                        name="image"
                        onChange={handleChange}
                    />
                    <TextAreaStyle
                        fontFamily={"nexonGothic"}
                        placeholder="내용 입력"
                        name="content"
                        onChange={handleChange}
                    />
                </WriteBodyBox>
                <SubmitBox>
                    <div className="buttonWrap">
                        {selectChar.id === user.uid && (
                            <ButtonStyle type="submit" fontSize={"0.8vw"} />
                        )}
                    </div>
                </SubmitBox>
            </form>
        </PackerWriteModal>
    ) : mode === "rewrite" ? (
        <PackerWriteModal>
            <Out onClick={() => setMode("list")}>
                <RiCloseLine size={25} color="black" />
            </Out>
            <form onSubmit={onSubmit}>
                <WriteTitleBox>
                    <InputStyle
                        fontSize={"1.6vw"}
                        fontFamily={"nexonGothic"}
                        height={"100%"}
                        border={"none"}
                        placeholder="제목을 입력해 주세요"
                        name="title"
                        value={data.title || ""}
                        onChange={handleChange}
                    />
                </WriteTitleBox>
                <WriteBodyBox>
                    <InputStyle
                        fontSize={"0.8vw"}
                        fontFamily={"nexonGothic"}
                        height={"6%"}
                        border={"none"}
                        placeholder="이미지 url 입력 (필수가 아닙니다)"
                        name="image"
                        value={data.image || ""}
                        onChange={handleChange}
                    />
                    <TextAreaStyle
                        fontFamily={"nexonGothic"}
                        placeholder="내용 입력"
                        name="content"
                        value={data.content || ""}
                        onChange={handleChange}
                    />
                </WriteBodyBox>
                <SubmitBox>
                    <div className="buttonWrap">
                        {selectChar.id === user.uid && (
                            <ButtonStyle type="submit" fontSize={"0.8vw"} />
                        )}
                    </div>
                </SubmitBox>
            </form>
        </PackerWriteModal>
    ) : (
        <PackerDetailModal>
            <Out onClick={() => setMode("list")}>
                <RiCloseLine size={25} color="black" />
            </Out>
            <DetailTitleBox>{record.title}</DetailTitleBox>
            <DetailBodyBox>
                {record.image && <img src={record.image} alt={record.image} />}
                <p>{record.content}</p>
            </DetailBodyBox>
            <RepackBox>
                <div className="buttonWrap">
                    {selectChar.id === user.uid && (
                        <ButtonStyle
                            onClick={() => {
                                setMode("rewrite");
                                setData({
                                    title: record.title,
                                    image: record.image,
                                    content: record.content,
                                    createdAt: record.createdAt,
                                    id: record.id,
                                });
                            }}
                            fontSize={"0.8vw"}
                        />
                    )}
                </div>
            </RepackBox>
        </PackerDetailModal>
    );
};
