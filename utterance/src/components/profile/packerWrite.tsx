import { RiCloseLine } from "react-icons/ri";
import { ButtonStyle, InputStyle, Out, TextAreaStyle } from "../Style";
import {
    PackerWriteModal,
    SubmitBox,
    WriteBodyBox,
    WriteTitleBox,
} from "./pacekrStyle";
import { useRecoilValue } from "recoil";
import { selectUserState, userState } from "@/atom";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebaseApp";

interface PackeWriteProps {
    setWrite: React.Dispatch<React.SetStateAction<boolean>>;
    packer: string;
}

export interface DataProps {
    title: string;
    image: string | null;
    content: string;
    createdAt: string;
    id: string;
}

export const PackerWrite: React.FC<PackeWriteProps> = ({
    setWrite,
    packer,
}) => {
    const queryClient = useQueryClient();
    const selectChar = useRecoilValue(selectUserState);
    const user = useRecoilValue(userState);
    const [data, setData] = useState<DataProps>({
        title: "",
        image: null,
        content: "",
        createdAt: "", //쓸모없는데 props 맞출라고
        id: "", //쓸모없는데 props 맞출라고
    });

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
                const charRef = collection(db, "database", user?.uid, packer);
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
            }
            setWrite(false);
            await queryClient.invalidateQueries([packer, selectChar.id]);
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
            createdAt: new Date()?.toLocaleDateString("ko", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
            }),
            id: "",
        });
    };

    return (
        <PackerWriteModal>
            <Out onClick={() => setWrite(false)}>
                <RiCloseLine size={25} color="black" />
            </Out>
            <form onSubmit={onSubmit}>
                <WriteTitleBox>
                    <InputStyle
                        fontSize={"1.8vw"}
                        fontFamily={"nexonGothic"}
                        height={"100%"}
                        border={"none"}
                        placeholder="제목을 입력해 주세요"
                        name="title"
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
                            <ButtonStyle type="submit" fontSize={"0.8vw"}>
                                PACKING
                            </ButtonStyle>
                        )}
                    </div>
                </SubmitBox>
            </form>
        </PackerWriteModal>
    );
};
