import styled from "@emotion/styled";

export const NoticeStyle = styled.div`
    width: 100%;
    height: 75%;
    .noticeBox {
        width: 100%;
        height: 100%;
        padding: 11% 7% 8% 7%;
        background: rgba(255, 255, 255, 0.2);
        background: url("/images/twitter/twitterframe.webp") no-repeat 50% 50%;
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .messageBox {
        width: 100%;
        height: 100%;
        padding: 11% 7% 8% 7%;
        background: rgba(255, 255, 255, 0.2);
        background: url("/images/twitter/twitterframe.webp") no-repeat 50% 50%;
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .msgBox {
            width: 100%;
            height: 100%;
            .messages {
                width: 100%;
                height: 90%;
                .buttonBox {
                    width: 100%;
                    height: 8%;
                    button {
                        width: 50%;
                        height: 100%;
                        border: none;
                        border-bottom: 2px solid rgb(85, 53, 176);
                        &.on {
                            background: rgba(85, 53, 176, 0.6);
                        }
                    }
                }
                .letters {
                    width: 100%;
                    height: 92%;
                    .letter {
                        width: 100%;
                        height: 8%;
                        border-bottom: 2px solid rgb(85, 53, 176);
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        .name {
                            width: 25%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-weight: 700;
                        }
                        .preview {
                            width: 75%;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                    }
                }
            }
            .makeBtnBox {
                width: 100%;
                height: 10%;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                .makeBtn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: none;
                    outline: none;
                    padding: 0.5vw;
                    border-radius: 40px;
                    background: rgb(85, 53, 176);
                }
            }
        }
    }
    .makeMsg {
        width: 25%;
        height: 55%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 30;
        position: absolute;
        bottom: 9%;
        right: 23%;
        border: 2px solid #fff;
        border-radius: 5px;
        .success {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1vw;
        }
        form {
            width: 100%;
            height: 100%;
            .selectBox {
                width: 90%;
                height: 8%;
                padding: 0.5vw;
            }
            .writeBox {
                width: 100%;
                height: 80%;
                padding: 0.5vw;
                textarea {
                    width: 100%;
                    height: 100%;
                    background: transparent;
                    border: none;
                    border-top: 1px solid white;
                    padding: 1vw 0.5vw;
                    caret-color: white;
                    color: white;
                    resize: none;
                    &:focus {
                        outline: none;
                    }
                }
            }
        }
        .submitBox {
            width: 100%;
            height: 12%;
            padding: 0.5vw;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            button {
                border: none;
                outline: none;
                padding: 0.6vw 1vw;
                border-radius: 2vw;
                background: rgb(85, 53, 176);
            }
        }
    }
    .recMsg {
        width: 30%;
        height: 30%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 30;
        position: absolute;
        top: 0;
        left: 0;
        border: 2px solid #fff;
        border-radius: 5px;
        p {
            white-space: pre-wrap;
        }
    }
`;

export const PostBoxStyle = styled.div`
    width: 100%;
    height: 15.5%;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.5);
    background: rgba(75, 31, 165, 0.4);
    .profile {
        padding: 2% 2%;
        height: 100%;
        .postFlex {
            display: flex;
            gap: 2%;
            align-items: center;
        }
        .postContent {
            color: #fff;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 3;
            line-height: 1.15;
            font-weight: 500;
            padding: 1%;
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
