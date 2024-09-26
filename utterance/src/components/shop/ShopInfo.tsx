import { AllCharProps, userState } from "@/atom";
import { db } from "@/firebaseApp";
import { MoneyProps } from "@/pages/admin/control";
import { defaultInfo2 } from "@/pages/shop";
import { ShopInfoWrap } from "@/pages/shop/shopStyle";
import {
    addDoc,
    arrayRemove,
    arrayUnion,
    collection,
    doc,
    getDoc,
    serverTimestamp,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import { InvenProps } from "./Inventory";

interface ShopInfoProps {
    select: defaultInfo2 | null;
    setSelect: (thing: defaultInfo2 | null) => void;
}

export default function ShopInfo({ select, setSelect }: ShopInfoProps) {
    const user = useRecoilValue(userState);
    const [charmCount, setCharmCount] = useState<number>(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const queryClient = useQueryClient();

    // 내 캐릭터 정보 세팅 함수
    const fetchCharData = async (userUid: string | null) => {
        if (userUid) {
            const charRef = doc(db, "character", userUid);
            const charSnap = await getDoc(charRef);
            const data = { ...(charSnap?.data() as AllCharProps), id: userUid };
            return data;
        } else {
            throw new Error("사용자 UID가 존재하지 않습니다.");
        }
    };
    // 내 캐릭터 정보
    const { data: myChar } = useQuery<AllCharProps>(
        "charData",
        () => fetchCharData(user.uid),
        {
            staleTime: 60000 * 60 * 3,
        }
    );

    // 인벤토리 소환
    const fetchInvenData = async (userUid: string | null) => {
        if (userUid) {
            const invenRef = doc(db, "inventory", userUid);
            const invenSanpshot = await getDoc(invenRef);
            const data = {
                ...invenSanpshot?.data(),
                uid: userUid,
            } as InvenProps;
            return data;
        } else {
            throw new Error("사용자 UID가 존재하지 않습니다.");
        }
    };
    // 내 캐릭터 정보
    const { data: myInventory } = useQuery("myInventory", () =>
        fetchInvenData(user.uid)
    );

    useEffect(() => {
        let count = 0;
        if (myInventory?.charm) {
            for (const charm of myInventory.charm) {
                if (charm.checkOn === true) {
                    count = count + 1;
                }
            }
            setCharmCount(count);
        }
    }, [myInventory?.charm]);

    const checkingHave = (selectId: string) => {
        //true일 경우 구매 버튼 표시/ fasle면 안 하기
        if (myInventory) {
            if (myInventory.charm) {
                for (const item of myInventory.charm) {
                    if (item.id === selectId) {
                        return false;
                    }
                }
            }
            if (myInventory.info) {
                for (const item of myInventory.info) {
                    if (item.id === selectId) {
                        return false;
                    }
                }
            }
            if (myInventory.etc) {
                for (const item of myInventory.etc) {
                    if (item.id === selectId) {
                        return false;
                    }
                }
            }
            return true;
        }
        return true;
    };

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
    // 내 캐릭터 큐 정보
    const { data: myQinfo } = useQuery("myQinfo", () =>
        fetchmoneyData(user.uid)
    );
    // 새 물건 제출
    const mutation = useMutation(
        // 첫 번째 매개변수: 비동기 함수, 서버에 요청을 보내는 역할
        async () => {
            if (
                user?.uid &&
                select?.thingType &&
                myQinfo?.credit &&
                myChar?.grade
            ) {
                if (select.thingType === "grade") {
                    if (select.thingName === "권한 2 등급") {
                        if (Number(myChar?.grade) !== 1) {
                            alert("구매 가능한 등급이 아닙니다.");
                            return;
                        }
                    } else if (select.thingName === "권한 3 등급") {
                        if (Number(myChar?.grade) !== 2) {
                            alert("구매 가능한 등급이 아닙니다.");
                            return;
                        }
                    }
                }
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

                    //일단 판매자한텐 돈을 넣어 주기
                    const charMoneyRef = doc(db, "money", select.uploadUid);
                    const charMoneyLogRef = collection(
                        db,
                        "money",
                        select.uploadUid,
                        "log"
                    );
                    const charSnap = await getDoc(charMoneyRef);
                    const charMoney = charSnap?.data()?.credit;
                    if (select.uploadUid !== user.uid) {
                        //판매자 판매대금 입금
                        await updateDoc(charMoneyRef, {
                            credit: charMoney + select.howMuch,
                        });
                        //판매자 판매대금 입금 로그
                        await addDoc(charMoneyLogRef, {
                            log: `[${select.thingType}] ${select.thingName} 판매되어 ${select.howMuch}Q 입금되었습니다.`,
                            timeStamp: serverTimestamp(),
                        });
                    }
                    if (invenSnapshot.exists()) {
                        //인벤토리에 넣어 주기
                        await updateDoc(invenRef, {
                            uid: user.uid,
                            [select?.thingType]: arrayUnion({
                                ...select,
                                checkOn: false,
                            }),
                        });
                        //샵 솔드아웃 표시하기
                        if (
                            select.uploadUid !== "LlZ41QVfUkcj0yVVRSTWJrXhuYv2"
                        ) {
                            await updateDoc(thingRef, {
                                soldout: true,
                            });
                        }
                        //돈 차감
                        await updateDoc(moneyRef, {
                            credit: myQinfo?.credit - select.howMuch,
                        });
                        //돈 차감 로그 생성
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
                        if (
                            select.uploadUid !== "LlZ41QVfUkcj0yVVRSTWJrXhuYv2"
                        ) {
                            await updateDoc(thingRef, {
                                soldout: true,
                            });
                        }
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
                    if (select.thingType === "grade") {
                        const myCharRef = doc(db, "character", user.uid);
                        if (select.thingName === "권한 2 등급") {
                            if (Number(myChar?.grade) === 1) {
                                //등업 로직
                                updateDoc(myCharRef, {
                                    grade: "2",
                                    gradeImg: "/images/etc/lv2.webp",
                                });
                            }
                        } else if (select.thingName === "권한 3 등급") {
                            if (Number(myChar?.grade) === 2) {
                                // 등업 로직
                                updateDoc(myCharRef, {
                                    grade: "3",
                                    gradeImg: "/images/etc/lv3.webp",
                                });
                            }
                        }
                    }
                }
                await queryClient.invalidateQueries("myQinfo");
                await queryClient.invalidateQueries("shopData");
                await queryClient.invalidateQueries("myInventory");
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                }, 1000);
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

    // 장착!!
    const updateArrayItem = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (charmCount < 5) {
            if (user.uid) {
                const docRef = doc(db, "inventory", user.uid);
                await updateDoc(docRef, {
                    charm: arrayRemove(select),
                });
                await updateDoc(docRef, {
                    charm: arrayUnion({ ...select, checkOn: true }),
                });
                await queryClient.invalidateQueries("myInventory");
            }
            setSelect(null);
            await queryClient.invalidateQueries(["selectInventory", user.uid]);
        } else {
            alert("배지는 5 개까지 장착 가능합니다!");
        }
    };
    //해제!!!

    const removeArrayItem = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (user.uid) {
            const docRef = doc(db, "inventory", user.uid);
            await updateDoc(docRef, {
                charm: arrayRemove(select),
            });
            await updateDoc(docRef, {
                charm: arrayUnion({ ...select, checkOn: false }),
            });
            await queryClient.invalidateQueries("myInventory");
        }
        setSelect(null);
    };

    return (
        <ShopInfoWrap>
            {showSuccess ? (
                <div className="success">구매가 완료되었습니다.</div>
            ) : select ? (
                <>
                    <div className="left">
                        <img src={select?.imageLink} alt="image" />
                        <p>{select?.thingName}</p>
                    </div>
                    <div className="right">
                        {select?.thingType === "info" &&
                        checkingHave(select?.id) ? (
                            <p>?</p>
                        ) : select?.thingType === "info" ? (
                            <p className="infoP">{select?.justDesc}</p>
                        ) : (
                            <p>{select?.justDesc}</p>
                        )}

                        {select && checkingHave(select?.id) && (
                            <div className="buttonBox">
                                <span>소지 금액: {myQinfo?.credit} Q </span>
                                <span>아이템 가격: {select?.howMuch} Q</span>
                                <button onClick={makePurchase}>구매</button>
                            </div>
                        )}
                        {select &&
                            !checkingHave(select?.id) &&
                            select.thingType === "charm" && (
                                <div className="buttonBox">
                                    {select.checkOn ? (
                                        <button onClick={removeArrayItem}>
                                            해제
                                        </button>
                                    ) : (
                                        <button onClick={updateArrayItem}>
                                            장착
                                        </button>
                                    )}
                                </div>
                            )}
                    </div>
                </>
            ) : (
                <div className="success">아이템을 선택해 주세요</div>
            )}

            {/* <button onClick={makePurchase}>임시 구매</button> */}
        </ShopInfoWrap>
    );
}
