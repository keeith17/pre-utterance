import { AllCharProps, userState } from "@/atom";
import { db } from "@/firebaseApp";
import {
    QueryDocumentSnapshot,
    addDoc,
    collection,
    getCountFromServer,
    getDocs,
    limit,
    orderBy,
    query,
    startAfter,
} from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { useMutation, useQuery, useQueryClient } from "react-query";
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
    const queryClient = useQueryClient();
    const [box, setBox] = useState<string>("receive"); // 보낸 메시지, 받은 메시지 모드 설정 (css적 요소)
    const [make, setMake] = useState<boolean>(false); // 메시지 작성하기 모달 오픈 여부
    const [rec, setRec] = useState<boolean>(false); // 받은 메시지 내용 확인 모달 오픈 여부
    const [sendTo, setSendTo] = useState<string>(""); // 메시지 작성 시 받는 사람 입력
    const [content, setContent] = useState<string>(""); // 메시지 작성 시 작성 내용 입력
    const [viewmsg, setViewmsg] = useState<string>(""); // 모달에 세팅하는 받은 메시지 내용
    const [viewUrl, setViewUrl] = useState<string>(""); // 모달에 세팅하는 받은 메시지 두상
    const [viewName, setViewName] = useState<string>(""); // 모달에 세팅하는 받은 메시지 uid
    const [viewMode, setViewMode] = useState<string>(""); // 모달에 띄운 것이 받은 메시지인지 보낸 메시지인지
    const [showSuccess, setShowSuccess] = useState<boolean>(false); // 메시지 전송 완료 안내
    const user = useRecoilValue(userState);

    const [page, setPage] = useState(0); //받은 메시지의 현재 페이지
    const [sendPage, setSendPage] = useState(0); //보낸 메시지의 현재 페이지
    const [lastDocs, setLastDocs] = useState<(QueryDocumentSnapshot | null)[]>( //받은 메시지 지난 페이지
        []
    );
    const [sendLastDocs, setSendLastDocs] = useState<
        (QueryDocumentSnapshot | null)[]
    >([]); //보낸 메시지 지난 페이지
    const pageSize = 15; //한 페이지 표시 개수
    const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수를 임의로 10으로 설정 (데이터에 맞게 조정 필요)
    const [sendTotalPages, setSendTotalPages] = useState(0); // 전체 페이지 수를 임의로 10으로 설정 (데이터에 맞게 조정 필요)

    const fetchTotalDocs = useCallback(
        async (userUid: string) => {
            let mailRef;
            if (box === "receive") {
                mailRef = collection(db, "homeMail", userUid, "rec");
            } else {
                mailRef = collection(db, "homeMail", userUid, "send");
            }
            const snapshot = await getCountFromServer(mailRef);
            return snapshot.data().count;
        },
        [box]
    );

    useEffect(() => {
        const userUid = user.uid;
        if (userUid) {
            const fetchTotalPages = async () => {
                const totalDocs = await fetchTotalDocs(userUid);
                if (box === "receive") {
                    setTotalPages(Math.ceil(totalDocs / pageSize));
                } else {
                    setSendTotalPages(Math.ceil(totalDocs / pageSize));
                }
            };
            fetchTotalPages();
        }
    }, [box, fetchTotalDocs, user.uid, pageSize]);
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
    const fetchRecMail = async (
        pageSize: number,
        lastDoc: QueryDocumentSnapshot | null
    ) => {
        try {
            const userUid = user.uid;
            if (userUid) {
                const mailRef = collection(db, "homeMail", userUid, "rec");
                let mailQuery;

                if (lastDoc) {
                    mailQuery = query(
                        mailRef,
                        orderBy("createdAt", "desc"),
                        startAfter(lastDoc),
                        limit(pageSize)
                    );
                } else {
                    mailQuery = query(
                        mailRef,
                        orderBy("createdAt", "desc"),
                        limit(pageSize)
                    );
                }

                const mailSnapshot = await getDocs(mailQuery);
                const lastVisibleDoc =
                    mailSnapshot.docs[mailSnapshot.docs.length - 1];
                const data = mailSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as MailProps[];

                return { data, lastVisibleDoc };
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
            throw error;
        }
    };

    const { data: recMails } = useQuery(
        ["recMail", page],
        () => fetchRecMail(pageSize, lastDocs[page - 1] || null),
        {
            keepPreviousData: true,
            onSuccess: (recMails) => {
                if (recMails) {
                    setLastDocs((prevLastDocs) => {
                        const newLastDocs = [...prevLastDocs];
                        newLastDocs[page] = recMails.lastVisibleDoc;
                        return newLastDocs;
                    });
                }
            },
        }
    );
    // 보낸 메시지 페치
    const fetchSendMail = async (
        pageSize: number,
        lastDoc: QueryDocumentSnapshot | null
    ) => {
        try {
            const userUid = user.uid;
            if (userUid) {
                const mailRef = collection(db, "homeMail", userUid, "send");
                let mailQuery;

                if (lastDoc) {
                    mailQuery = query(
                        mailRef,
                        orderBy("createdAt", "desc"),
                        startAfter(lastDoc),
                        limit(pageSize)
                    );
                } else {
                    mailQuery = query(
                        mailRef,
                        orderBy("createdAt", "desc"),
                        limit(pageSize)
                    );
                }

                const mailSnapshot = await getDocs(mailQuery);
                const lastVisibleDoc =
                    mailSnapshot.docs[mailSnapshot.docs.length - 1];
                const data = mailSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as MailProps[];

                return { data, lastVisibleDoc };
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
            throw error;
        }
    };

    const { data: sendMails } = useQuery(
        ["sendMail", sendPage],
        () => fetchSendMail(pageSize, sendLastDocs[sendPage - 1] || null),
        {
            keepPreviousData: true,
            onSuccess: (sendMails) => {
                if (sendMails) {
                    setSendLastDocs((prevLastDocs) => {
                        const newLastDocs = [...prevLastDocs];
                        newLastDocs[sendPage] = sendMails.lastVisibleDoc;
                        return newLastDocs;
                    });
                }
            },
        }
    );

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
            await queryClient.invalidateQueries(["sendMail", 0]);
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

    const handlePageClick = (pageNumber: number) => {
        if (box === "receive") {
            setPage(pageNumber);
        } else {
            setSendPage(pageNumber);
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

                    {box === "receive" && (
                        <div className="letters">
                            <div className="letterBox">
                                {recMails?.data.map((mail) => (
                                    <div
                                        key={mail.id}
                                        className="letter"
                                        onClick={() => {
                                            setRec(true);
                                            setViewmsg(mail.content);
                                            setViewUrl(uidToUrl(mail.send));
                                            setViewName(mail.send);
                                            setViewMode("receive");
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
                            </div>
                            <div className="pageButton">
                                {Array.from(
                                    { length: totalPages },
                                    (_, index) => (
                                        <button
                                            key={index}
                                            className={
                                                index === page ? "selected" : ""
                                            }
                                            onClick={() =>
                                                handlePageClick(index)
                                            }
                                            disabled={index === page}
                                        >
                                            {index + 1}
                                        </button>
                                    )
                                )}
                            </div>
                        </div>
                    )}

                    {box === "send" && (
                        <div className="letters">
                            <div className="letterBox">
                                {sendMails?.data.map((mail) => (
                                    <div
                                        key={mail.id}
                                        className="letter"
                                        onClick={() => {
                                            setRec(true);
                                            setViewmsg(mail.content);
                                            setViewUrl(uidToUrl(mail.rec));
                                            setViewName(mail.rec);
                                            setViewMode("send");
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
                            <div className="pageButton">
                                {Array.from(
                                    { length: sendTotalPages },
                                    (_, index) => (
                                        <button
                                            key={index}
                                            className={
                                                index === sendPage
                                                    ? "selected"
                                                    : ""
                                            }
                                            onClick={() =>
                                                handlePageClick(index)
                                            }
                                            disabled={index === sendPage}
                                        >
                                            {index + 1}
                                        </button>
                                    )
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <button
                    className="makeBtn"
                    onClick={() => {
                        setMake(true);
                        setSendTo("");
                    }}
                >
                    <IoMdSend size={25} />
                </button>
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
                                    defaultValue={sendTo || "선택"}
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
                                                    >
                                                        {char.name}
                                                    </option>
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
                    <div className="msgInfo">
                        <img src={viewUrl} alt={viewUrl} />
                        <p>{uidToName(viewName)}</p>
                    </div>
                    <div className="rightView">
                        <p>{viewmsg}</p>
                        <div className="buttonBox">
                            {viewMode === "receive" && (
                                <button
                                    onClick={() => {
                                        setMake(true);
                                        setSendTo(viewName);
                                    }}
                                >
                                    REPLY
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
