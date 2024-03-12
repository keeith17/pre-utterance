import styled from "@emotion/styled";

export const NoticeStyle = styled.div`
    width: 100%;
    height: 75%;
    .noticeBox {
        width: 100%;
        height: 100%;
        padding: 7% 5% 2% 5%;
        background: rgba(255, 255, 255, 0.2);
        background: url("images/twitter/twitterframe.webp") no-repeat 50% 50%;
        background-size: 100% 100%;
        .postBox {
            width: 100%;
            height: 16.66666%;
            border-bottom: 1px solid rgba(255, 255, 255, 0.5);
        }
    }
`;

export const PostBoxStyle = styled.div`
    width: 100%;
    height: 16.66666%;
    overflow: hidden;
    padding: 10px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    .profile {
        padding: 0 10px;
        .postFlex {
            display: flex;
            gap: 10px;
            align-items: center;

            .img,
            .icon {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                object-fit: cover;
            }

            .flexBetween {
                display: flex;
                width: 100%;
                justify-content: space-between;
                .email,
                .createdAt {
                    font-size: 12px;
                    color: "#9ca3af";
                }
                .tagged {
                    font-size: 12px;
                    background: #708090;
                    padding: 3px 5px;
                    border-radius: 8px;
                }
            }
        }
        .postContent {
            color: #fff;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 3;
            font-weight: 500;
            padding: 4px;
            whitespace: "pre-line";
            .imgDiv {
                padding: 10px;
            }
        }
    }
    .postFooter {
        padding: 0 16px;
        margin-top: 10px;
        font-size: 14px;
        display: flex;
        gap: 8px;
        flex-direction: row-reverse;
        .postDelete {
            background: #681313;
        }
        .postEdit {
            background: #3f434d;
            a {
                color: #fff;
            }
        }
        .postLike,
        .postComments {
            display: flex;
            gap: 5px;
            align-items: center;
        }
    }
`;
