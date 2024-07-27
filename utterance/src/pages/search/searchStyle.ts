import { dangerColor } from "@/GlobalStyle";
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
                    font-size: 70px;
                    text-align: center;
                    padding: 2.3%;
                    color: ${dangerColor};
                }
                form {
                    width: 80%;
                    display: flex;
                    gap: 2%;
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
                    padding-left: 30%;
                    p {
                        font-size: 28px;
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
                        padding-left: 30%;
                        p {
                            font-size: 28px;
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
        padding: 2%;
        .guideWrap {
            width: 100%;
            height: 100%;
        }
        .imgWrap {
            width: 100%;
            height: 100%;
            overflow-y: scroll;
            padding-right: 5px;
            img {
                width: 100%;
            }
        }
    }
`;
