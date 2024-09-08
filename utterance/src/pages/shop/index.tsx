import { useQuery } from "react-query";
import { ShopWrap } from "./shopStyle";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseApp";
import ShopList from "@/components/shop/ShopList";
import { useState } from "react";
import ShopInfo from "@/components/shop/ShopInfo";
import Inventory from "@/components/shop/Inventory";
import AddShop from "@/components/shop/AddShop";
import { Out } from "@/components/Style";
import { RiCloseLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

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
    checkOn: boolean;
    id: string;
}

export default function ShopPage() {
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false);
    const [select, setSelect] = useState<defaultInfo2 | null>(null);

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

    return (
        <ShopWrap>
            <Out onClick={() => navigate("/")}>
                <RiCloseLine size={25} color="white" />
            </Out>
            {open && <AddShop setOpen={setOpen} />}
            <div className="shopList">
                <ShopList
                    things={things}
                    setSelect={setSelect}
                    setOpen={setOpen}
                />
            </div>
            <div className="infos">
                <ShopInfo setSelect={setSelect} select={select} />
                <Inventory setSelect={setSelect} />
            </div>
        </ShopWrap>
    );
}
