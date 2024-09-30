import { userState } from "@/atom";
import { db, storage } from "@/firebaseApp";
import { AddShopWrap } from "@/pages/shop/shopStyle";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import { InputStyle, Out, TextAreaStyle } from "../Style";
import { RiCloseLine } from "react-icons/ri";
import { FiImage } from "react-icons/fi";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { MoneyProps } from "@/pages/admin/control";

interface defaultInfo {
    thingName: string;
    uploadUid: string;
    imageLink: string;
    imageDesc: string;
    justDesc: string;
    thingType: string;
    createdAt: string;
    soldout: boolean;
    howMuch: number;
}
interface AddShopProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function AddShop({ setOpen }: AddShopProps) {
    const user = useRecoilValue(userState);
    const queryClient = useQueryClient();
    const [category, setCategory] = useState<string>("");
    const [thingName, setThingName] = useState<string>("");
    const [imageLink, setImageLink] = useState<string>("");
    const [imageDesc, setImageDesc] = useState<string>("");
    const [justDesc, setJustDesc] = useState<string>("");
    const [howMuch, setHowMuch] = useState<number>(0);
    const [ing, setIng] = useState<boolean>(false);

    const categories = [
        { name: "배지", type: "charm" },
        { name: "정보", type: "info" },
        { name: "비밀 상점", type: "grade" },
        { name: "기타", type: "etc" },
    ];

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

    const onChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const {
            target: { name, value },
        } = e;
        if (name === "thingName") setThingName(value);
        if (name === "imageDesc") setImageDesc(value);
        if (name === "justDesc") setJustDesc(value);
        if (name === "howMuch") setHowMuch(Number(value));
    };
    useEffect(() => {
        console.log(category);
    }, [category]);
    //이미지 등록
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { files },
        } = e;

        // 파일이 선택되지 않았을 경우 예외 처리
        if (!files || files.length === 0) {
            console.error("No file selected");
            return;
        }

        const file = files[0];
        const fileReader = new FileReader();

        fileReader.onloadend = (e: ProgressEvent<FileReader>) => {
            const result = (e.target as FileReader).result;

            // result가 문자열인지 확인
            if (result && typeof result === "string") {
                setImageLink(result);
            } else {
                console.error("Invalid result type");
            }
        };

        // readAsDataURL 호출
        fileReader.readAsDataURL(file);
    };

    // 새 물건 제출
    const mutation = useMutation(
        // 첫 번째 매개변수: 비동기 함수, 서버에 요청을 보내는 역할}
        async (defaultInfo: defaultInfo) => {
            setIng(true);
            if (user?.uid && myQinfo) {
                const shopRef = collection(db, "shop");
                const moneyRef = doc(db, "money", user.uid);
                const moneyLogRef = collection(db, "money", user.uid, "log");
                const key = `${user?.uid}/${uuidv4()}`;
                const storageRef = ref(storage, key);
                let newImageUrl = "/images/null.webp";
                if (defaultInfo.imageLink) {
                    const data = await uploadString(
                        storageRef,
                        imageLink,
                        "data_url"
                    );
                    newImageUrl = await getDownloadURL(data?.ref);
                } else {
                    newImageUrl = "/images/seederEdit.webp";
                }

                await addDoc(shopRef, {
                    thingName: defaultInfo.thingName,
                    uploadUid: defaultInfo.uploadUid,
                    imageLink: newImageUrl,
                    imageDesc: defaultInfo.imageDesc,
                    justDesc: defaultInfo.justDesc,
                    thingType: defaultInfo.thingType,
                    createdAt: defaultInfo.createdAt,
                    soldout: defaultInfo.soldout,
                    howMuch: defaultInfo.howMuch,
                });
                await updateDoc(moneyRef, {
                    credit: myQinfo?.credit + 50,
                });
                //돈 로그 생성
                await addDoc(moneyLogRef, {
                    log: `아이템 등록하여 50Q 지급되었습니다.`,
                    timeStamp: serverTimestamp(),
                });
            }
            await queryClient.invalidateQueries("shopData");
            setThingName("");
            setImageLink("");
            setImageDesc("");
            setJustDesc("");
            setHowMuch(0);
            setIng(false);
            //등록 안내 메시지 우편처럼 표출해 줘야 하는 듯
            setOpen(false);
        },
        {
            onError: (error) => {
                console.error("POST 실패:", error);
            },
        }
    );

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (thingName && justDesc && category) {
            mutation.mutate({
                thingName: thingName,
                uploadUid: user?.uid || "",
                imageLink: imageLink,
                imageDesc: imageDesc,
                justDesc: justDesc,
                thingType: category,
                createdAt: new Date().toLocaleDateString("ko", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                }),
                soldout: false,
                howMuch: howMuch,
            });
        } else {
            if (Number(howMuch) < 50) {
                alert("가격은 50 큐 이상으로 책정해 주세요.");
            } else {
                alert("모든 정보를 작성해 주세요");
            }
        }
    };
    return (
        <AddShopWrap>
            <div className="modal">
                <Out onClick={() => setOpen(false)}>
                    <RiCloseLine size={25} color="white" />
                </Out>
                <div className="category">
                    {categories.map(
                        (cate) =>
                            (user.uid === "LlZ41QVfUkcj0yVVRSTWJrXhuYv2" ||
                                cate.type !== "grade") && (
                                <button
                                    key={cate.type}
                                    className={
                                        cate.type === category ? "selected" : ""
                                    }
                                    onClick={() => setCategory(cate.type)}
                                >
                                    {cate.name}
                                </button>
                            )
                    )}
                </div>
                <form onSubmit={onSubmit}>
                    <div className="topBox">
                        <div className="imgBox">
                            <div className="imageBox">
                                <label className="fileForm" htmlFor="fileInput">
                                    {imageLink ? (
                                        <img src={imageLink} />
                                    ) : (
                                        <FiImage
                                            className="fileIcon"
                                            size={40}
                                        />
                                    )}
                                </label>
                                <input
                                    type="file"
                                    name="fileInput"
                                    id="fileInput"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileUpload}
                                />
                            </div>
                        </div>
                        <div className="textBox">
                            <div className="inputBox">
                                <p className="inputTitle">아이템 이름</p>
                                <InputStyle
                                    fontSize={"0.8vw"}
                                    fontFamily={"nexonGothic"}
                                    height={"90%"}
                                    border={"1px solid #fff"}
                                    placeholder="아이템 이름을 작성하세요"
                                    name="thingName"
                                    value={thingName}
                                    onChange={onChange}
                                ></InputStyle>
                            </div>
                            <div className="inputBox">
                                <p className="inputTitle">가격</p>
                                <InputStyle
                                    fontSize={"0.8vw"}
                                    fontFamily={"nexonGothic"}
                                    height={"90%"}
                                    border={"1px solid #fff"}
                                    placeholder="가격을 책정해 주세요"
                                    value={howMuch}
                                    name="howMuch"
                                    onChange={onChange}
                                ></InputStyle>
                            </div>
                        </div>
                    </div>

                    {/* <div className="inputBox">
                        <p className="inputTitle">이미지</p>
                        <InputStyle
                            fontSize={"0.8vw"}
                            fontFamily={"nexonGothic"}
                            height={"90%"}
                            border={"1px solid #fff"}
                            placeholder="1:1 비율의 이미지 링크를 삽입해 주세요"
                            value={imageLink}
                            name="imageLink"
                            onChange={onChange}
                        ></InputStyle>
                    </div> */}
                    {/* <div className="inputBox">
                        <p className="inputTitle">이미지 설명</p>
                        <InputStyle
                            fontSize={"0.8vw"}
                            fontFamily={"nexonGothic"}
                            height={"90%"}
                            border={"1px solid #fff"}
                            placeholder="간단한 이미지 설명을 곁들여 주세요"
                            value={imageDesc}
                            name="imageDesc"
                            onChange={onChange}
                        ></InputStyle>
                    </div> */}

                    <div className="textBox">
                        <p className="textTitle">아이템 설명 / 내용</p>
                        <TextAreaStyle
                            fontFamily={"nexonGothic"}
                            placeholder="아이템의 설명이나 정보 내용을 기입하세요"
                            value={justDesc}
                            name="justDesc"
                            onChange={onChange}
                        ></TextAreaStyle>
                    </div>

                    <div className="buttonBox">
                        <button type="submit" disabled={ing}>
                            등록
                        </button>
                    </div>
                </form>
            </div>
        </AddShopWrap>
    );
}
