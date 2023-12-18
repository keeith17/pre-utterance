import { ButtonStyle, InputStyle } from "@/components/Style";
import { SearcWrap } from "./searchStyle";
import {
    DocumentSnapshot,
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
} from "firebase/firestore";
import { db } from "@/firebaseApp";
import { useQuery, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import { userState } from "@/atom";
import Loader from "@/components/loader/Loader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ResultButton from "@/components/resultButton/resultButton";

//버튼 부분 데이터 타입 설정
export interface GetButtonProps {
    id: string;
    link: string;
    name: string;
    subKey: string[];
}
// 버튼 부분 데이터 페칭 함수
const fetchButtonData = async () => {
    const querySnapshot = await getDocs(collection(db, "searchWord"));
    const data: GetButtonProps[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as GetButtonProps[];
    return data;
};

export default function SearchPage() {
    const user = useRecoilValue(userState);
    const userId = user?.uid;
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const [char, setChar] = useState<string>("");

    // 캐릭터가 존재하는지 여부 확인하는 부분
    const getChar = async (userId: string | null) => {
        if (!userId) {
            throw new Error("User ID is undefined");
        }
        const charRef = doc(db, "character", userId);
        const charSnap: DocumentSnapshot = await getDoc(charRef);

        return charSnap.exists();
    };
    const { data: haveCharacter, isLoading } = useQuery<boolean>(
        ["char", userId],
        () => getChar(userId),
        {
            enabled: !!userId, // 쿼리 활성화 여부를 유저 ID의 존재 여부에 따라 설정
        }
    );

    //캐릭터가 없는 초기 1회 캐릭터 생성하는 부분
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = e;
        setChar(value);
    };
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (user?.uid) {
                const charRef = doc(db, "character", user?.uid);
                await setDoc(charRef, {
                    name: char,
                });
                await queryClient.invalidateQueries(`char`);
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    };

    //버튼 정보 가지고 오는 부분
    const { data: buttons } = useQuery<GetButtonProps[]>(
        "buttonData",
        fetchButtonData
    );

    return (
        <SearcWrap>
            <div className="searchBox">
                {isLoading ? (
                    <Loader />
                ) : haveCharacter ? (
                    <div className="content">
                        <div className="pandora">Πανδώρα</div>
                        <InputStyle
                            type="text"
                            height="54px"
                            fontSize="18px"
                            placeholder="무엇이 궁금하신가요?"
                        />
                        <div className="linkButton">
                            {buttons?.map((button) => (
                                <ResultButton button={button} key={button.id} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="content">
                        <div className="pandora">기본 정보 조사</div>
                        <form onSubmit={onSubmit}>
                            <InputStyle
                                type="text"
                                height="54px"
                                fontSize="18px"
                                onChange={onChange}
                                placeholder="임시 캐릭터명 입력"
                            />
                            <div className="submit">
                                <ButtonStyle type="submit" fontSize="20px">
                                    캐릭터 생성
                                </ButtonStyle>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </SearcWrap>
    );
}
