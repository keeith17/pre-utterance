import { userState } from "@/atom";
import { db } from "@/firebaseApp";
import { AddShopWrap } from "@/pages/shop/shopStyle";
import { addDoc, collection } from "firebase/firestore";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import { InputStyle, Out, TextAreaStyle } from "../Style";
import { RiCloseLine } from "react-icons/ri";
import { useState } from "react";

interface defaultInfo {
    thingName: string;
    uploadUid: string;
    imageLink: string;
    imageDesc: string;
    justDesc: string;
    thingType: string;
    createdAt: string;
    soldout: boolean;
    howMuch: number;
}
interface AddShopProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function AddShop({ setOpen }: AddShopProps) {
    const user = useRecoilValue(userState);
    const queryClient = useQueryClient();
    const [cate, setCate] = useState<string>("charm");
    const [thingName, setThingName] = useState<string>("");
    const [imageLink, setImageLink] = useState<string>("");
    const [imageDesc, setImageDesc] = useState<string>("");
    const [justDesc, setJustDesc] = useState<string>("");
    const [howMuch, setHowMuch] = useState<number>(0);

    const categories = [
        { name: "배지", type: "charm" },
        { name: "정보", type: "info" },
        { name: "기타", type: "etc" },
    ];

    const onChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const {
            target: { name, value },
        } = e;
        if (name === "thingName") setThingName(value);
        if (name === "imageLink") setImageLink(value);
        if (name === "imageDesc") setImageDesc(value);
        if (name === "justDesc") setJustDesc(value);
        if (name === "howMuch") setHowMuch(Number(value));
    };

    // 새 물건 제출
    const mutation = useMutation(
        // 첫 번째 매개변수: 비동기 함수, 서버에 요청을 보내는 역할
        async (defaultInfo: defaultInfo) => {
            if (user?.uid) {
                const shopRef = collection(db, "shop");
                await addDoc(shopRef, {
                    thingName: defaultInfo.thingName,
                    uploadUid: defaultInfo.uploadUid,
                    imageLink: defaultInfo.imageLink,
                    imageDesc: defaultInfo.imageDesc,
                    justDesc: defaultInfo.justDesc,
                    thingType: defaultInfo.thingType,
                    createdAt: defaultInfo.createdAt,
                    soldout: defaultInfo.soldout,
                    howMuch: defaultInfo.howMuch,
                });
            }
            await queryClient.invalidateQueries("shopData");
            setThingName("");
            setImageLink("");
            setImageDesc("");
            setJustDesc("");
            setHowMuch(0);
            //등록 안내 메시지 우편처럼 표출해 줘야 하는 듯
            setOpen(false);
        },
        {
            onError: (error) => {
                console.error("POST 실패:", error);
            },
        }
    );

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate({
            thingName: thingName,
            uploadUid: user?.uid || "",
            imageLink: imageLink || "/images/seederEdit.webp",
            imageDesc: imageDesc,
            justDesc: justDesc,
            thingType: cate,
            createdAt: new Date().toLocaleDateString("ko", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
            }),
            soldout: false,
            howMuch: howMuch,
        });
    };
    return (
        <AddShopWrap>
            <div className="modal">
                <Out onClick={() => setOpen(false)}>
                    <RiCloseLine size={25} color="white" />
                </Out>
                <form onSubmit={onSubmit}>
                    <div className="category">
                        {categories.map((cate) => (
                            <button
                                key={cate.type}
                                onClick={() => setCate(cate.type)}
                            >
                                {cate.name}
                            </button>
                        ))}
                    </div>
                    <div className="inputBox">
                        <p className="inputTitle">아이템 이름</p>
                        <InputStyle
                            fontSize={"1vw"}
                            fontFamily={"nexonGothic"}
                            height={"90%"}
                            border={"1px solid #fff"}
                            placeholder="아이템 이름을 작성하세요"
                            name="thingName"
                            value={thingName}
                            onChange={onChange}
                        ></InputStyle>
                    </div>
                    {}
                    <div className="inputBox">
                        <p className="inputTitle">이미지 주소</p>
                        <InputStyle
                            fontSize={"1vw"}
                            fontFamily={"nexonGothic"}
                            height={"90%"}
                            border={"1px solid #fff"}
                            placeholder="1:1 비율의 이미지 링크를 삽입해 주세요"
                            value={imageLink}
                            name="imageLink"
                            onChange={onChange}
                        ></InputStyle>
                    </div>
                    <div className="inputBox">
                        <p className="inputTitle">이미지 설명</p>
                        <InputStyle
                            fontSize={"1vw"}
                            fontFamily={"nexonGothic"}
                            height={"90%"}
                            border={"1px solid #fff"}
                            placeholder="간단한 이미지 설명을 곁들여 주세요"
                            value={imageDesc}
                            name="imageDesc"
                            onChange={onChange}
                        ></InputStyle>
                    </div>
                    <div className="inputBox">
                        <p className="inputTitle">가격</p>
                        <InputStyle
                            fontSize={"1vw"}
                            fontFamily={"nexonGothic"}
                            height={"90%"}
                            border={"1px solid #fff"}
                            placeholder="가격을 책정해 주세요"
                            value={howMuch}
                            name="howMuch"
                            onChange={onChange}
                        ></InputStyle>
                    </div>
                    <div className="textBox">
                        <p className="textTitle">아이템 설명 / 내용</p>
                        <TextAreaStyle
                            fontFamily={"nexonGothic"}
                            placeholder="아이템의 설명이나 정보 내용을 기입하세요"
                            value={justDesc}
                            name="justDesc"
                            onChange={onChange}
                        ></TextAreaStyle>
                    </div>

                    <div className="buttonBox">
                        <button type="submit">등록</button>
                    </div>
                </form>
            </div>
        </AddShopWrap>
    );
}
