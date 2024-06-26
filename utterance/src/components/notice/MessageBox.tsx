import { AllCharProps, userState } from "@/atom";
import { db } from "@/firebaseApp";
import {
    addDoc,
    collection,
    getDocs,
    orderBy,
    query,
} from "firebase/firestore";
import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { useMutation, useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { DropdownStyle, Out } from "../Style";
import { RiCloseLine } from "react-icons/ri";

// interface ModalStateProps {
//     setMake: React.Dispatch<React.SetStateAction<boolean>>;
//     setRec: React.Dispatch<React.SetStateAction<boolean>>;
// }
interface MailProps {
    id: string;
    content: string;
    createdAt: string;
    rec: string;
    send: string;
}

export default function MessageBox() {
    const [box, setBox] = useState<string>("receive"); // 보낸 메시지, 받은 메시지 모드 설정 (css적 요소)
    const [make, setMake] = useState<boolean>(false); // 메시지 작성하기 모달 오픈 여부
    const [rec, setRec] = useState<boolean>(false); // 받은 메시지 내용 확인 모달 오픈 여부
    const [sendTo, setSendTo] = useState<string>(""); // 메시지 작성 시 받는 사람 입력
    const [content, setContent] = useState<string>(""); // 메시지 작성 시 작성 내용 입력
    const [viewmsg, setViewmsg] = useState<string>(""); // 모달에 세팅하는 받은 메시지 내용
    const [viewUrl, setViewUrl] = useState<string>(""); // 모달에 세팅하는 받은 메시지 내용
    const [showSuccess, setShowSuccess] = useState<boolean>(false); // 메시지 전송 완료 안내
    const user = useRecoilValue(userState);

    // change
    const handleChange = (
        e:
            | React.ChangeEvent<HTMLTextAreaElement>
            | React.ChangeEvent<HTMLSelectElement>
    ) => {
        const {
            target: { name, value },
        } = e;
        if (name === "sendTo") {
            setSendTo(value);
        }
        if (name === "content") {
            setContent(value);
        }
    };

    // 전체 캐릭터 페치
    const fetchAllCharData = async () => {
        try {
            const charRef = collection(db, "character");
            const charQuery = query(charRef, orderBy("name", "asc"));
            const allCharSnapshot = await getDocs(charQuery);
            const data: AllCharProps[] = allCharSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as AllCharProps[];
            return data;
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };
    const { data: allChar } = useQuery("allChar", fetchAllCharData, {
        staleTime: 20000,
    });
    // 받은 메시지 페치
    const fetchRecMail = async () => {
        try {
            if (user.uid) {
                const mailRef = collection(db, "homeMail", user.uid, "rec");
                const mailQuery = query(mailRef, orderBy("createdAt", "desc"));
                const MailSnapshot = await getDocs(mailQuery);
                const data = MailSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as MailProps[];
                return data;
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };
    const { data: recMails } = useQuery("recMail", fetchRecMail, {
        staleTime: 20000,
    });

    // 받은 메시지 페치
    const fetchSendMail = async () => {
        try {
            if (user.uid) {
                const mailRef = collection(db, "homeMail", user.uid, "send");
                const mailQuery = query(mailRef, orderBy("createdAt", "desc"));
                const MailSnapshot = await getDocs(mailQuery);
                const data = MailSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as MailProps[];
                return data;
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };
    const { data: sendMails } = useQuery("sendMail", fetchSendMail, {
        staleTime: 20000,
    });

    //우편 보내기
    const sendMail = useMutation(
        async () => {
            if (user?.uid) {
                const sendRef = collection(db, "homeMail", user?.uid, "send");
                const recRef = collection(db, "homeMail", sendTo, "rec");
                await addDoc(sendRef, {
                    send: user.uid,
                    rec: sendTo,
                    content: content,
                    createdAt: new Date()?.toLocaleDateString("ko", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false,
                    }),
                });
                await addDoc(recRef, {
                    send: user.uid,
                    rec: sendTo,
                    content: content,
                    createdAt: new Date()?.toLocaleDateString("ko", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false,
                    }),
                });
            }
            setContent("");
            setSendTo("");
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
            }, 1000);
            // await queryClient.invalidateQueries([packer, selectChar.id]);
        },
        {
            onError: (error) => {
                console.error("POST 실패:", error);
            },
        }
    );

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendMail.mutate();
    };

    const uidToName = (uid: string) => {
        if (allChar) {
            for (const char of allChar) {
                if (char.id === uid) {
                    return char.name;
                }
            }
            return "none";
        } else {
            return "none";
        }
    };

    const uidToUrl = (uid: string) => {
        if (allChar) {
            for (const char of allChar) {
                if (char.id === uid) {
                    return char.gifUrl;
                }
            }
            return "none";
        } else {
            return "none";
        }
    };

    return (
        <div className="messageBox">
            <div className="msgBox">
                <div className="messages">
                    <div className="buttonBox">
                        <button
                            className={box === "receive" ? "on" : ""}
                            onClick={() => {
                                setBox("receive");
                            }}
                        >
                            RECEIVE
                        </button>
                        <button
                            className={box === "send" ? "on" : ""}
                            onClick={() => {
                                setBox("send");
                            }}
                        >
                            SEND
                        </button>
                    </div>
                    <div className="letters">
                        {box === "receive" &&
                            recMails?.map((mail) => (
                                <div
                                    key={mail.id}
                                    className="letter"
                                    onClick={() => {
                                        setRec(true);
                                        setViewmsg(mail.content);
                                        setViewUrl(uidToUrl(mail.send));
                                    }}
                                >
                                    <div className="name">
                                        {uidToName(mail.send)}
                                    </div>
                                    <div className="preview">
                                        {mail.content}
                                    </div>
                                </div>
                            ))}
                        {box === "send" &&
                            sendMails?.map((mail) => (
                                <div
                                    key={mail.id}
                                    className="letter"
                                    onClick={() => {
                                        setRec(true);
                                        setViewmsg(mail.content);
                                        setViewUrl(uidToUrl(mail.rec));
                                    }}
                                >
                                    <div className="name">
                                        {uidToName(mail.rec)}
                                    </div>
                                    <div className="preview">
                                        {mail.content}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
                <div className="makeBtnBox" onClick={() => setMake(true)}>
                    <button className="makeBtn">
                        <IoMdSend size={25} />
                    </button>
                </div>
            </div>
            {make && (
                <div className="makeMsg">
                    <Out onClick={() => setMake(false)}>
                        <RiCloseLine size={25} color="white" />
                    </Out>
                    {showSuccess ? (
                        <div className="success">메일을 전송하였습니다.</div>
                    ) : (
                        <form onSubmit={onSubmit}>
                            <div className="selectBox">
                                <DropdownStyle
                                    height={"100%"}
                                    fontFamily={"nexonGothic"}
                                    defaultValue={"선택"}
                                    onChange={handleChange}
                                    name="sendTo"
                                >
                                    <option value="선택">
                                        상대방을 선택해 주세요
                                    </option>
                                    {allChar &&
                                        allChar.map(
                                            (char) =>
                                                char.id !== user.uid && (
                                                    <option
                                                        value={char.id}
                                                        key={char.id}
                                                    />
                                                )
                                        )}
                                </DropdownStyle>
                            </div>
                            <div className="writeBox">
                                <textarea
                                    name="content"
                                    placeholder="메시지를 입력해 주세요"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="submitBox">
                                <button>SEND</button>
                            </div>
                        </form>
                    )}
                </div>
            )}

            {rec && (
                <div className="recMsg">
                    <Out onClick={() => setRec(false)}>
                        <RiCloseLine size={25} color="white" />
                    </Out>
                    <img src={viewUrl} alt={viewUrl} />
                    <p>{viewmsg}</p>
                </div>
            )}
        </div>
    );
}
