import { orangeColor } from "@/GlobalStyle";
import styled from "@emotion/styled";

export const SearcWrap = styled.div`
    width: 100%;
    height: 100%;
    .searchBox {
        width: 100%;
        height: 100%;
        display: flex;
        .content {
            width: 30%;
            height: 40%;
            margin: auto auto 18.3% auto;
            .pandora {
                width: 100%;
                font-size: 70px;
                text-align: center;
                padding: 2.3%;
                img {
                    width: 100%;
                }
            }
            .inputBox {
                width: 100%;
                display: flex;
                justify-content: center;
                input {
                    width: 100%;
                    background: rgba(0, 0, 0, 0.7);
                    &::placeholder {
                        font-family: "spaceAge";
                    }
                }
            }
            .linkButton {
                display: flex;
                gap: 2%;
                justify-content: center;
                margin-top: 3%;
            }
            form {
                display: flex;
                flex-direction: column;
                gap: 2%;
            }
        }
        .defaultContent {
            width: 50%;
            height: 45%;
            background: rgba(0, 0, 0, 0.7);
            border-radius: 30px;
            margin: auto auto 21% auto;
            .oneMorebox {
                width: 100%;
                height: 100%;
                background: url(/images/profile_write/mainframe/mainframe_968x1043.webp)
                    no-repeat;
                background-size: 100% 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .pandora {
                    width: 100%;
                    font-size: 3.5vw;
                    text-align: center;
                    padding: 2.3%;
                    color: ${orangeColor};
                    font-family: "Giants-Inline";
                }
                form {
                    width: 80%;
                    display: flex;
                    gap: 2%;
                    padding-bottom: 1.5vw;
                    .inputBox {
                        width: 80%;
                        display: flex;
                        flex-flow: column;
                        gap: 1vw;
                    }
                    .submitBox {
                        width: 20%;
                    }
                }
            }
        }
    }
    .underBar {
        width: calc(100vw - 23%);
        position: fixed;
        bottom: 0;
        left: 0;
        img {
            width: 100%;
        }
    }
`;

export const SearcDetailWrap = styled.div`
    width: 100%;
    height: 100%;
    padding-right: 10px;
    display: flex;
    background: url(/images/world/menu/decoration_168x1080.webp) 0 50% no-repeat;
    background-size: auto 100%;
    .buttonArea {
        width: 30%;
        height: 100%;
        background: url(/images/world/menu/pda_214x726.webp) 0 50% no-repeat;
        background-size: auto 68%;
        display: flex;
        align-items: flex-end;
        .buttonBox {
            width: 100%;
            height: 75%;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.5%;
            .buttonWrap {
                width: 60%;
                height: 8%;
                button {
                    width: 100%;
                    height: 100%;
                    border: none;
                    outline: none;
                    background: url(/images/world/menu/menu_266x61.webp) 0 50%
                        no-repeat;
                    background-size: auto 100%;
                    padding-left: 20%;
                    p {
                        font-size: 1.1vw;
                        // background: red;
                        padding-top: 1px;
                        color: black;
                        font-family: "neurimboGothic";
                    }
                }
                &.selected {
                    width: 60%;
                    height: 8%;
                    button {
                        width: 100%;
                        height: 100%;
                        border: none;
                        outline: none;
                        background: url(/images/world/menu/menu_hover_266x61.webp)
                            0 50% no-repeat;
                        background-size: auto 100%;
                        padding-left: 20%;
                        p {
                            font-size: 1.1vw;
                            // background: red;
                            padding-top: 1px;
                            color: white;
                            font-family: "neurimboGothic";
                        }
                    }
                }
            }
        }
    }
    .contentArea {
        width: 70%;
        height: 100%;
        padding: 2% 2% 0 0;
        .guideWrap {
            width: 100%;
            height: 100%;
        }
        .imgWrap {
            width: 100%;
            height: 100%;
            padding: 3.5vw 0 1vw 0;
            background: url(/images/world/mainframe/mainframe_969x950.webp) 50%
                50% no-repeat;
            background-size: auto 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .imgBox {
                width: 90%;
                height: 90%;
                padding-right: 0.2vw;
                padding-left: 0.2vw;
                overflow-y: scroll;
                img {
                    width: 100%;
                }
            }
        }
    }
`;
