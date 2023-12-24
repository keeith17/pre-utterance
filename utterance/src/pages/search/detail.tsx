import { ButtonStyle } from "@/components/Style";
import { db } from "@/firebaseApp";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { SearcDetailWrap } from "./searchStyle";

export default function SearchDetailPage() {
    const params = useParams<{ id: string }>();
    const [selectedData, setSelectedData] = useState<string>("");
    // 데이터
    const getSearch = async (paramsId: string | undefined) => {
        if (paramsId) {
            const docRef = doc(db, "searchWord", paramsId);
            const docSnap = await getDoc(docRef);
            const data = docSnap?.data();
            if (data) {
                if (selectedData === "") {
                    setSelectedData(data.default);
                }
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
    const handleOnClick = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        const {
            currentTarget: { value },
        } = e;
        setSelectedData(value);
    };
    return (
        <SearcDetailWrap>
            <div className="buttonArea">
                {searchData &&
                    Object.keys(searchData.content)?.map((key: string) => (
                        <div className="buttonWrap" key={key}>
                            <ButtonStyle
                                className={
                                    selectedData === key ? "selected" : ""
                                }
                                fontSize="15px"
                                type="button"
                                value={key}
                                onClick={handleOnClick}
                            >
                                <span>{key}</span>
                            </ButtonStyle>
                        </div>
                    ))}
            </div>
            <div className="contentArea">
                {searchData && (
                    <div className="imgWrap">
                        <img src={searchData.content[`${selectedData}`]}></img>
                    </div>
                )}
            </div>
        </SearcDetailWrap>
    );
}
