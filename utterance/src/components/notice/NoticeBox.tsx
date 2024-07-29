import {
    collection,
    doc,
    getDoc,
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
import { AllCharProps, mailState, userState } from "@/atom";
import MessageBox from "./MessageBox";
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
    const user = useRecoilValue(userState);
    const userUid = user.uid;

    // 내 캐릭터 정보 세팅 함수
    const fetchCharData = async (userUid: string | null) => {
        if (userUid) {
            const charRef = doc(db, "character", userUid);
            const charSnap = await getDoc(charRef);
            const data = { ...(charSnap?.data() as AllCharProps), id: userUid };
            return data;
        } else {
            throw new Error("사용자 UID가 존재하지 않습니다.");
        }
    };
    // 내 캐릭터 정보
    const { data: myChar } = useQuery<AllCharProps>(
        "charData",
        () => fetchCharData(userUid),
        {
            staleTime: 60000,
        }
    );

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

    return mail ? (
        <NoticeStyle>
            <MessageBox />
        </NoticeStyle>
    ) : (
        <NoticeStyle>
            <div className="noticeBox">
                {myChar?.nick ? (
                    noticePosts &&
                    (noticePosts.length > 0 ? (
                        noticePosts?.map((post: PostProps, index: number) => (
                            <PostBoxStyle key={index}>
                                <div className="profile">
                                    <div className="postFlex">📢🚨</div>
                                    <div className="postContent">
                                        <p>{post?.content}</p>
                                    </div>
                                </div>
                            </PostBoxStyle>
                        ))
                    ) : (
                        <div className="text">해당하는 게시 글이 없습니다</div>
                    ))
                ) : (
                    <div className="locked">접근 권한이 없습니다</div>
                )}
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
