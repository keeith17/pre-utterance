import { userState } from "@/atom";
import { db } from "@/firebaseApp";
import { addDoc, collection } from "firebase/firestore";
import { useMutation } from "react-query";
import { useRecoilValue } from "recoil";

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

export default function AddShop() {
    const user = useRecoilValue(userState);
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
        <form onSubmit={onSubmit}>
            <button type="submit">임시 등록 버튼</button>
        </form>
    );
}
