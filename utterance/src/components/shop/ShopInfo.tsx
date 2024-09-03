import { userState } from "@/atom";
import { db } from "@/firebaseApp";
import { MoneyProps } from "@/pages/admin/control";
import { defaultInfo2 } from "@/pages/shop";
import { ShopInfoWrap } from "@/pages/shop/shopStyle";
import {
    addDoc,
    arrayUnion,
    collection,
    doc,
    getDoc,
    serverTimestamp,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";

interface ShopInfoProps {
    select: defaultInfo2 | undefined;
}

export default function ShopInfo({ select }: ShopInfoProps) {
    const user = useRecoilValue(userState);
    const queryClient = useQueryClient();

    // 일단 내 돈 얼마 있는지 정보 받기
    const fetchmoneyData = async (userUid: string | null) => {
        if (userUid) {
            const charRef = doc(db, "money", userUid);
            const charSnap = await getDoc(charRef);
            const data = { ...charSnap?.data(), uid: userUid } as MoneyProps;
            return data;
        } else {
            throw new Error("사용자 UID가 존재하지 않습니다.");
        }
    };
    // 내 캐릭터 정보
    const { data: myQinfo } = useQuery("myQinfo", () =>
        fetchmoneyData(user.uid)
    );
    // 새 물건 제출
    const mutation = useMutation(
        // 첫 번째 매개변수: 비동기 함수, 서버에 요청을 보내는 역할
        async () => {
            if (user?.uid && select?.thingType && myQinfo?.credit) {
                if (myQinfo?.credit - select.howMuch < 0) {
                    alert("남은 Q가 부족합니다.");
                } else {
                    const thingRef = doc(db, "shop", select.id);
                    const invenRef = doc(db, "inventory", user.uid);
                    const moneyRef = doc(db, "money", user.uid);
                    const moneyLogRef = collection(
                        db,
                        "money",
                        user.uid,
                        "log"
                    );
                    const invenSnapshot = await getDoc(invenRef);
                    if (invenSnapshot.exists()) {
                        //인벤토리에 넣어 주기
                        await updateDoc(invenRef, {
                            uid: user.uid,
                            [select?.thingType]: arrayUnion(select),
                        });
                        //샵 솔드아웃 표시하기
                        await updateDoc(thingRef, {
                            soldout: true,
                        });
                        //돈 차감
                        await updateDoc(moneyRef, {
                            credit: myQinfo?.credit - select.howMuch,
                        });
                        //돈 로그 생성
                        await addDoc(moneyLogRef, {
                            log: `[${select.thingType}] ${select.thingName} 구매하여 ${select.howMuch}Q 차감되었습니다.`,
                            timeStamp: serverTimestamp(),
                        });
                    } else {
                        //인벤토리에 넣어 주기
                        await setDoc(invenRef, {
                            uid: user.uid,
                            [select?.thingType]: arrayUnion(select),
                        });
                        //샵 솔드아웃 표시하기
                        await updateDoc(thingRef, {
                            soldout: true,
                        });
                        //돈 차감
                        await updateDoc(moneyRef, {
                            credit: myQinfo?.credit - select.howMuch,
                        });
                        //돈 로그 생성
                        await addDoc(moneyLogRef, {
                            log: `[${select.thingType}] ${select.thingName} 구매하여 ${select.howMuch}Q 차감되었습니다.`,
                            timeStamp: serverTimestamp(),
                        });
                    }
                }
                await queryClient.invalidateQueries("myQinfo");
                await queryClient.invalidateQueries("shopData");
            }
        },
        {
            onError: (error) => {
                console.error("POST 실패:", error);
            },
        }
    );

    //뮤테이션으로 변경해야 됨 - 했음!
    const makePurchase = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        mutation.mutate();
    };
    return (
        <ShopInfoWrap>
            설명: {select?.thingName} {select?.howMuch}
            <button onClick={makePurchase}>임시 구매</button>
        </ShopInfoWrap>
    );
}
