import { defaultInfo2 } from "@/pages/shop";
import { ShopListWrap } from "@/pages/shop/shopStyle";
import { useState } from "react";
interface ShopListProps {
    things: defaultInfo2[] | undefined; // 배열 타입으로 지정
    setSelect: (thing: defaultInfo2) => void;
    setOpen: (arg0: boolean) => void;
}

export default function ShopList({
    things,
    setSelect,
    setOpen,
}: ShopListProps) {
    const categories = [
        { name: "배지", type: "charm" },
        { name: "정보", type: "info" },
        { name: "기타", type: "etc" },
    ];
    const [cate, setCate] = useState("charm");
    return (
        <ShopListWrap>
            <div className="thingBox">
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
                <div className="things">
                    {things?.map(
                        (thing) =>
                            !thing.soldout &&
                            cate === thing.thingType && (
                                <div
                                    className="thing"
                                    key={thing.id}
                                    onClick={() => setSelect(thing)}
                                >
                                    <div className="thingImg">
                                        <img
                                            src={thing.imageLink}
                                            alt={thing.imageLink}
                                        />
                                    </div>
                                    <div className="thingName">
                                        {thing.thingName}
                                    </div>
                                </div>
                            )
                    )}
                </div>
            </div>
            <div className="buttonBox">
                <button onClick={() => setOpen(true)}>임시 등록 열기</button>
            </div>
        </ShopListWrap>
    );
}
