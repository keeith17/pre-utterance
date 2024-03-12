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
import { userState } from "@/atom";
import { useRecoilValue } from "recoil";
import { FaUserCircle } from "react-icons/fa";

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
    const user = useRecoilValue(userState);
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
    return (
        <NoticeStyle>
            <div className="noticeBox">
                {noticePosts &&
                    (noticePosts.length > 0 ? (
                        noticePosts?.map((post: PostProps, index: number) => (
                            <PostBoxStyle key={index}>
                                <div className="profile">
                                    <div className="postFlex">
                                        {user?.photoURL ? (
                                            <div className="imgBox">
                                                <img
                                                    src={
                                                        post.profileUrl
                                                            ? post.profileUrl
                                                            : "PROFILE_DEFAULT_URL"
                                                    }
                                                    alt="profile"
                                                    className="img"
                                                />
                                            </div>
                                        ) : (
                                            <FaUserCircle className="icon" />
                                        )}
                                        <div className="flexBetween">
                                            <div className="postFlex">
                                                <div className="email">
                                                    {post?.nickname
                                                        ? post?.nickname
                                                        : "no name"}
                                                </div>
                                                <div className="createdAt">
                                                    {post?.createdAt.slice(6)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
