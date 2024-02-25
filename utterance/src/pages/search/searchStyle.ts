import styled from "@emotion/styled";

export const SearcWrap = styled.div`
    width: 100%;
    height: 100%;
    .searchBox {
        width: 100%;
        height: 100%;
        display: flex;
        .content {
            width: 50%;
            height: 40%;
            margin: auto auto 360px auto;
            .pandora {
                font-size: 70px;
                text-align: center;
                padding: 20px;
            }
            .inputBox {
                width: 100%;
                display: flex;
                justify-content: center;
                input {
                    width: 610px;
                    background: rgba(0, 0, 0, 0.7);
                    &::placeholder {
                        font-family: "spaceAge";
                    }
                }
            }
            .linkButton {
                display: flex;
                gap: 10px;
                justify-content: center;
                margin-top: 20px;
            }
            form {
                display: flex;
                flex-direction: column;
                gap: 10px;
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
