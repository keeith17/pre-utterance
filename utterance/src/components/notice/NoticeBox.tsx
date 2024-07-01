import {
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    where,
} from "firebase/firestore";
import { NoticeStyle, PostBoxStyle } from "./NoticeBoxStyle";
import { db } from "@/firebaseApp";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { AllCharProps, mailState } from "@/atom";
import { useState } from "react";
import MessageBox from "./MessageBox";
import { DropdownStyle, Out } from "../Style";
import { RiCloseLine } from "react-icons/ri";
// import { userState } from "@/atom";
// import { useRecoilValue } from "recoil";
// import { FaUserCircle } from "react-icons/fa";

export interface CommentProps {
    id: string;
    comment: string;
    uid: string;
    email: string;
    createdAt: string;
    profileUrl: string;
    imgUrl: string;
    nickname: string;
}

export interface PostProps {
    id: string; // 포스트 아이디
    content: string;
    createdAt: string;
    imgUrl?: string;
    uid: string; // 유저 아이디
    likes?: string[];
    likeCount?: number;
    comments?: CommentProps[];
    profileUrl?: string;
    nickname?: string;
    tag: string;
}

export default function NoticeBox() {
    const mail = useRecoilValue(mailState);
    const [make, setMake] = useState<boolean>(false);
    const [rec, setRec] = useState<boolean>(false);
    // const user = useRecoilValue(userState);
    //공지 데이터 받아오기
    const fetchNoticeData = async () => {
        try {
            const postRef = collection(db, "posts");
            const postQuery = query(
                postRef,
                where("tag", "==", "notice"),
                orderBy("createdAt", "desc"),
                limit(6)
            );
            const NoticePostsSnapshot = await getDocs(postQuery);
            const data = NoticePostsSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as PostProps[];
            return data;
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };
    const { data: noticePosts } = useQuery("noticePosts", fetchNoticeData, {
        staleTime: 20000,
    });
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
    return mail ? (
        <NoticeStyle>
            <div className="noticeBox">
                <MessageBox setMake={setMake} setRec={setRec} />
            </div>
            {make && (
                <div className="makeMsg">
                    <Out onClick={() => setMake(false)}>
                        <RiCloseLine size={25} color="white" />
                    </Out>
                    <div className="selectBox">
                        <DropdownStyle
                            height={"100%"}
                            fontFamily={"nexonGothic"}
                            defaultValue={"선택"}
                        >
                            <option value="선택">상대방을 선택해 주세요</option>
                            {allChar &&
                                allChar.map((char) => (
                                    <option value={char.name} key={char.name}>
                                        {char.name}
                                    </option>
                                ))}
                        </DropdownStyle>
                    </div>
                    <div className="writeBox">
                        <textarea placeholder="메시지를 입력해 주세요" />
                    </div>
                    <div className="submitBox">
                        <button>SEND</button>
                    </div>
                </div>
            )}

            {rec && (
                <div className="recMsg">
                    <Out onClick={() => setRec(false)}>
                        <RiCloseLine size={25} color="white" />
                    </Out>
                    임시
                </div>
            )}
        </NoticeStyle>
    ) : (
        <NoticeStyle>
            <div className="noticeBox">
                {noticePosts &&
                    (noticePosts.length > 0 ? (
                        noticePosts?.map((post: PostProps, index: number) => (
                            <PostBoxStyle key={index}>
                                <div className="profile">
                                    <div className="postFlex">📢🚨</div>
                                    <div className="postContent">
                                        {post?.content}
                                    </div>
                                </div>
                            </PostBoxStyle>
                        ))
                    ) : (
                        <div className="text">해당하는 게시 글이 없습니다</div>
                    ))}
            </div>
            {/* <div className="noticeBox">
                {noticePosts &&
                    (noticePosts.length > 0 ? (
                        noticePosts?.map((post: PostProps, index: number) => (
                            <div className="postBox" key={index}>
                                {post.content}
                            </div>
                        ))
                    ) : (
                        <div className="text">해당하는 게시 글이 없습니다</div>
                    ))}
            </div> */}
        </NoticeStyle>
    );
}
