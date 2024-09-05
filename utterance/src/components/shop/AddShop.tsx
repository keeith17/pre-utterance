import { userState } from "@/atom";
import { db } from "@/firebaseApp";
import { AddShopWrap } from "@/pages/shop/shopStyle";
import { addDoc, collection } from "firebase/firestore";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import { InputStyle, Out } from "../Style";
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
    const [cate, setCate] = useState("charm");

    const categories = [
        { name: "배지", type: "charm" },
        { name: "정보", type: "info" },
        { name: "기타", type: "etc" },
    ];

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
            thingName: "제목7",
            uploadUid: user?.uid || "",
            imageLink: "/images/seederEdit.webp",
            imageDesc: "이미지 설명 예시입니다7",
            justDesc: "단순 정보라면 이곳입니다7",
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
            howMuch: 700,
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
                        ></InputStyle>
                    </div>
                    <div className="inputBox">
                        <p className="inputTitle">이미지 주소</p>
                        <InputStyle
                            fontSize={"1vw"}
                            fontFamily={"nexonGothic"}
                            height={"90%"}
                            border={"1px solid #fff"}
                            placeholder="1:1 비율의 이미지 링크를 삽입해 주세요"
                        ></InputStyle>
                    </div>
                    <div className="inputBox">
                        <p className="inputTitle">이미지 설명</p>
                        <InputStyle
                            fontSize={"1vw"}
                            fontFamily={"nexonGothic"}
                            height={"90%"}
                            border={"1px solid #fff"}
                            placeholder="디테일한 이미지 설명을 곁들여 주세요"
                        ></InputStyle>
                    </div>
                    <div className="inputBox">
                        <p className="inputTitle">아이템 설명 / 내용</p>
                        <InputStyle
                            fontSize={"1vw"}
                            fontFamily={"nexonGothic"}
                            height={"90%"}
                            border={"1px solid #fff"}
                            placeholder="아이템의 설명이나 정보 내용을 기입하세요"
                        ></InputStyle>
                    </div>
                    <div className="buttonBox">
                        <button type="submit">등록</button>
                    </div>
                </form>
            </div>
        </AddShopWrap>
    );
}
