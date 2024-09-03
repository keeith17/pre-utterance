import { useMutation, useQuery } from "react-query";
import { ShopWrap } from "./shopStyle";
import { useRecoilValue } from "recoil";
import { userState } from "@/atom";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseApp";
import ShopList from "@/components/shop/ShopList";
import { useState } from "react";
import ShopInfo from "@/components/shop/ShopInfo";
import Inventory from "@/components/shop/Inventory";

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
export interface defaultInfo2 {
    thingName: string;
    uploadUid: string;
    imageLink: string;
    imageDesc: string;
    justDesc: string;
    thingType: string;
    createdAt: string;
    soldout: boolean;
    howMuch: number;
    id: string;
}

export default function ShopPage() {
    const user = useRecoilValue(userState);
    const [select, setSelect] = useState<defaultInfo2>();

    // 물건 페치
    const fetchShopData = async () => {
        const shopRef = collection(db, "shop");
        const shopSnapshot = await getDocs(shopRef);
        const data: defaultInfo2[] = shopSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as defaultInfo2[];

        return data;
    };

    const { data: things } = useQuery<defaultInfo2[]>(
        "shopData",
        fetchShopData
    );

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
        },
        {
            onError: (error) => {
                console.error("POST 실패:", error);
            },
        }
    );

    //뮤테이션으로 변경해야 됨 - 했음!
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate({
            thingName: "제목4",
            uploadUid: user?.uid || "",
            imageLink: "/images/seederEdit.webp",
            imageDesc: "이미지 설명 예시입니다4",
            justDesc: "단순 정보라면 이곳입니다4",
            thingType: "etc",
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
        <ShopWrap>
            <ShopList things={things} setSelect={setSelect} />
            <div className="infos">
                <ShopInfo select={select} />
                <Inventory />
            </div>

            <form onSubmit={onSubmit}>
                <button type="submit">임시 등록 버튼</button>
            </form>
        </ShopWrap>
    );
}
