import { defaultInfo2 } from "@/pages/shop";
import { ShopWrap } from "@/pages/shop/shopStyle";

interface ShopListProps {
    things: defaultInfo2[] | undefined; // 배열 타입으로 지정
    setSelect: (thing: defaultInfo2) => void;
}

export default function ShopList({ things, setSelect }: ShopListProps) {
    return (
        <ShopWrap>
            {things?.map(
                (thing) =>
                    !thing.soldout && (
                        <div
                            className="thing"
                            key={thing.id}
                            onClick={() => setSelect(thing)}
                        >
                            {thing.thingName}
                        </div>
                    )
            )}
        </ShopWrap>
    );
}
