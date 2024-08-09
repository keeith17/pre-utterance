import { db } from "@/firebaseApp";
import { doc, getDoc } from "firebase/firestore";
import { useRef, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { SearcDetailWrap } from "./searchStyle";
import { Out } from "@/components/Style";
import { RiCloseLine } from "react-icons/ri";

export interface oneButtonProps {
    category: string;
    infoCard: string;
}

export default function SearchDetailPage() {
    const params = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [selectedData, setSelectedData] = useState<string>("");
    const [selectedImage, setSelectedImage] = useState<string>("");
    const divRef = useRef<HTMLDivElement>(null);

    // 각 페이지에 해당하는 데이터 불러오기
    const getSearch = async (paramsId: string | undefined) => {
        if (paramsId) {
            const docRef = doc(db, "searchWord", paramsId);
            const docSnap = await getDoc(docRef);
            const data = docSnap?.data();
            if (data) {
                return data;
            } else {
                throw new Error("전달된 데이터가 없습니다.");
            }
        } else {
            throw new Error("전달된 데이터가 없습니다.");
        }
    };
    const { data: searchData } = useQuery(["search", params.id], () =>
        getSearch(params.id)
    );

    //현재 보고 싶은 데이터 state에 등록
    const handleOnClick = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        const {
            currentTarget: { value },
        } = e;
        setSelectedData(searchData?.content[value]?.category);
        setSelectedImage(searchData?.content[value]?.infoCard);
        if (divRef.current) {
            divRef.current.scrollTop = 0;
        }
    };
    return (
        <SearcDetailWrap>
            <Out
                onClick={() => {
                    navigate("/");
                }}
            >
                <RiCloseLine size={35} />
            </Out>
            <div className="buttonArea">
                <div className="buttonBox">
                    {searchData &&
                        searchData?.content?.map(
                            (key: oneButtonProps, index: number) => (
                                <div
                                    className={
                                        selectedData === key.category
                                            ? "buttonWrap selected"
                                            : "buttonWrap"
                                    }
                                    key={key.category}
                                >
                                    <button
                                        type="button"
                                        value={index}
                                        onClick={handleOnClick}
                                    >
                                        <p>{key.category}</p>
                                    </button>
                                </div>
                            )
                        )}
                </div>
            </div>
            <div className="contentArea">
                {searchData &&
                    (selectedImage === "" ? (
                        <div className="guideWrap">
                            {/* 열람할 페이지를 선택해 주세요 */}
                        </div>
                    ) : (
                        <div className="imgWrap">
                            <div className="imgBox" ref={divRef}>
                                <img src={selectedImage} />
                            </div>
                        </div>
                    ))}
            </div>
        </SearcDetailWrap>
    );
}
