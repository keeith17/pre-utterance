import { userState } from "@/atom";
import { db } from "@/firebaseApp";
import { defaultInfo2 } from "@/pages/shop";
import { InventoryWrap } from "@/pages/shop/shopStyle";
import { doc, getDoc } from "firebase/firestore";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";

interface InventoryProps {
    setSelect: (thing: defaultInfo2) => void;
}

export interface InvenProps {
    charm: defaultInfo2[];
    info: defaultInfo2[];
    etc: defaultInfo2[];
    uid: string;
}

export default function Inventory({ setSelect }: InventoryProps) {
    const user = useRecoilValue(userState);
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
    return (
        <InventoryWrap>
            <div className="category">
                <div className="title">배지</div>
                {myInventory?.charm?.map((item) => (
                    <div
                        className="thing"
                        key={item.id}
                        onClick={() => setSelect(item)}
                    >
                        {item.checkOn && <div className="checkOn">장착 중</div>}
                        <div className="thingImg">
                            <img src={item.imageLink} alt={item.imageLink} />
                        </div>
                        <div className="thingName">{item.thingName}</div>
                    </div>
                ))}
            </div>
            <div className="category">
                <div className="title">정보</div>
                {myInventory?.info?.map((item) => (
                    <div
                        className="thing"
                        key={item.id}
                        onClick={() => setSelect(item)}
                    >
                        <div className="thingImg">
                            <img src={item.imageLink} alt={item.imageLink} />
                        </div>
                        <div className="thingName">{item.thingName}</div>
                    </div>
                ))}
            </div>
            <div className="category">
                <div className="title">기타</div>
                {myInventory?.etc?.map((item) => (
                    <div
                        className="thing"
                        key={item.id}
                        onClick={() => setSelect(item)}
                    >
                        <div className="thingImg">
                            <img src={item.imageLink} alt={item.imageLink} />
                        </div>
                        <div className="thingName">{item.thingName}</div>
                    </div>
                ))}
            </div>
        </InventoryWrap>
    );
}
