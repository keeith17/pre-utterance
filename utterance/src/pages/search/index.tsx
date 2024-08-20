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
import { app, db } from "@/firebaseApp";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import { userState } from "@/atom";
import Loader from "@/components/loader/Loader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ResultButton from "@/components/resultButton/resultButton";
import { defaultColor } from "@/GlobalStyle";
import { oneButtonProps } from "./detail";
import { getAuth, updatePassword } from "firebase/auth";

//버튼 부분 데이터 타입 설정
export interface GetButtonProps {
    id: string;
    content: oneButtonProps[];
    default: string;
    defaultImage: string;
    link: string;
    name: string;
    subKey: string[];
}
interface defaultInfo {
    name: string;
    nick: string;
    badge: string;
    badgeImg: string;
    grade: string;
    gradeImg: string;
    credit: number;
    gifUrl: string;
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
    const [nick, setNick] = useState<string>("");
    const [newpw, setNewpw] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const [exist, setExist] = useState<boolean>(true);

    // 캐릭터가 존재하는지 여부 확인하는 부분
    const getChar = async (userId: string | null) => {
        if (!userId) {
            throw new Error("User ID is undefined");
        }
        const charRef = doc(db, "character", userId);
        const charSnap: DocumentSnapshot = await getDoc(charRef);
        setExist(charSnap.exists());
        return charSnap.exists();
    };

    const { isLoading } = useQuery<boolean>(
        ["char", userId],
        () => getChar(userId),
        {
            staleTime: 60000 * 60,
            enabled: !!userId, // 쿼리 활성화 여부를 유저 ID의 존재 여부에 따라 설정
        }
    );

    //캐릭터가 없는 초기 1회 캐릭터 생성하는 부분
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { name, value },
        } = e;
        if (name === "name") setChar(value);
        if (name === "nick") setNick(value);
        if (name === "password") setNewpw(value);
    };
    const mutation = useMutation(
        // 첫 번째 매개변수: 비동기 함수, 서버에 요청을 보내는 역할
        async (defaultInfo: defaultInfo) => {
            const auth = getAuth(app);
            const userRef = auth.currentUser;
            if (user?.uid && userRef) {
                const charRef = doc(db, "character", user?.uid);
                await setDoc(charRef, {
                    name: defaultInfo.name,
                    nick: defaultInfo.nick,
                    badge: defaultInfo.badge,
                    badgeImg: defaultInfo.badgeImg,
                    grade: defaultInfo.grade,
                    gradeImg: defaultInfo.gradeImg,
                    credit: defaultInfo.credit,
                    gifUrl: defaultInfo.gifUrl,
                });
                await updatePassword(userRef, newpw);
                await queryClient.invalidateQueries(`char`);
                await queryClient.invalidateQueries(`charData`);
                navigate("/");
            }
        },
        {
            onError: (error) => {
                console.error("POST 실패:", error);
            },
        }
    );

    //뮤테이션으로 변경해야 됨 - 했음!
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate({
            name: char,
            nick: nick,
            badge: "quasa4",
            badgeImg: "/images/seederEdit.webp",
            grade: "0",
            gradeImg: "/images/etc/lv0.webp",
            credit: 300,
            gifUrl: "/images/default_head.webp",
        });
    };

    //검색 창 상태
    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = e;
        setSearch(value);
    };

    //버튼 정보 가지고 오는 부분
    const { data: buttons } = useQuery<GetButtonProps[]>(
        "buttonData",
        fetchButtonData,
        {
            staleTime: 60000,
        }
    );

    return (
        <SearcWrap>
            <div className="searchBox">
                {isLoading ? (
                    <Loader />
                ) : exist ? (
                    <div className="content">
                        <div className="pandora">
                            <img
                                src="/images/main/main/pandora_510x76.webp"
                                alt="pandora_510x76"
                            />
                        </div>
                        <div className="inputBox">
                            <InputStyle
                                type="text"
                                height="1.9vw"
                                fontSize="0.75vw"
                                border={`1px solid ${defaultColor}`}
                                fontFamily="nexonGothic"
                                onChange={onChangeSearch}
                                placeholder="SEARCH"
                            />
                        </div>

                        <div className="linkButton">
                            {buttons?.map(
                                (button) =>
                                    button.subKey.includes(search) && (
                                        <ResultButton
                                            button={button}
                                            key={button.id}
                                        />
                                    )
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="defaultContent">
                        <div className="oneMorebox">
                            <div className="pandora">ACCESS DENIED</div>
                            <form onSubmit={onSubmit}>
                                <div className="inputBox">
                                    <InputStyle
                                        type="text"
                                        height="54px"
                                        fontSize="18px"
                                        name="name"
                                        border="1px solid #fff"
                                        fontFamily="neurimboGothic"
                                        onChange={onChange}
                                        placeholder="임시 캐릭터명 입력 (추후 수정 가능)"
                                    />
                                    <InputStyle
                                        type="text"
                                        height="54px"
                                        fontSize="18px"
                                        name="nick"
                                        border="1px solid #fff"
                                        fontFamily="neurimboGothic"
                                        onChange={onChange}
                                        placeholder="익명 밴드 닉네임 입력"
                                    />
                                    <InputStyle
                                        type="text"
                                        height="54px"
                                        fontSize="18px"
                                        name="password"
                                        border="1px solid #fff"
                                        fontFamily="neurimboGothic"
                                        onChange={onChange}
                                        placeholder="새로운 비밀번호"
                                    />
                                </div>
                                <div className="submitBox">
                                    <ButtonStyle type="submit" fontSize="20px">
                                        ACCESS
                                    </ButtonStyle>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            <div className="underBar">
                <img
                    src="/images/main/main/bottombar.svg"
                    alt="underbar_1476x76"
                />
            </div>
        </SearcWrap>
    );
}
