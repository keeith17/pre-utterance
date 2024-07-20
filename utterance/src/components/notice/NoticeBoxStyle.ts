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
        background: url("/images/twitter/messageframe.webp") no-repeat 50% 50%;
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
                    .letterBox {
                        width: 100%;
                        height: 96%;
                        .letter {
                            width: 100%;
                            height: 8%;
                            border-bottom: 2px solid rgb(85, 53, 176);
                            display: flex;
                            align-items: center;
                            cursor: pointer;
                            transition: all 0.1s;
                            &:hover {
                                background: rgba(85, 53, 176, 0.3);
                            }
                            .name {
                                width: 25%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-weight: 700;
                            }
                            .preview {
                                width: 75%;
                                padding-right: 1vw;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }
                        }
                    }
                    .pageButton {
                        width: 100%;
                        height: 4%;
                        display: flex;
                        justify-content: center;
                        align-items: flex-end;
                        button {
                            outline: none;
                            border: none;
                            padding: 0.2vw;
                            font-weight: 700;
                            font-size: 0.7vw;
                            &.selected {
                                color: rgb(85, 53, 176);
                                font-size: 0.8vw;
                            }
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
        width: 20%;
        height: 55%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 30;
        position: absolute;
        bottom: 14%;
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
                color: white;
                option {
                    color: white;
                }
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
                padding: 0.5vw 0.9vw;
                border-radius: 2vw;
                background: rgb(85, 53, 176);
            }
        }
    }
    .recMsg {
        width: 28%;
        height: 25%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 30;
        position: absolute;
        top: 5%;
        right: 23%;
        border: 2px solid #fff;
        border-radius: 5px;
        padding: 0.8vw;
        display: flex;
        align-items: flex-start;
        gap: 0.6vw;
        .msgInfo {
            width: 28%;
            img {
                width: 100%;
                height: auto;
                object-fit: contain;
            }
            p {
                width: 100%;
                text-align: center;
                padding-top: 0.5vw;
            }
        }
        .rightView {
            width: 72%;
            height: 100%;
            p {
                width: 100%;
                height: 80%;
                white-space: pre-wrap;
            }
            .buttonBox {
                width: 100%;
                height: 20%;
                display: flex;
                align-items: flex-end;
                justify-content: flex-end;
                button {
                    border: none;
                    outline: none;
                    padding: 0.5vw 0.9vw;
                    border-radius: 2vw;
                    background: rgb(85, 53, 176);
                }
            }
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
        // background: white;
        .postFlex {
            display: flex;
            gap: 2%;
            align-items: center;
        }
        .postContent {
            padding: 1%;
            p {
                color: #fff;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 3;
                line-height: 1.15;
                font-weight: 500;
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
