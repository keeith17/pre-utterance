import { dangerColor } from "@/GlobalStyle";
import styled from "@emotion/styled";

export const MyPageStyle = styled.div`
    width: 100%;
    height: 25%;
    .myPageBox {
        width: 100%;
        height: 100%;
        position: relative;
        background: url(/images/main/frame/frame_442x271.webp) no-repeat;
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .contentArea {
            width: 85%;
            height: 60%;
            padding: 1.1% 0 1.54% 1.1%;
            .myInfoArea {
                width: 100%;
                height: 100%;
                display: flex;
                .profilePhoto {
                    width: 28%;
                    height: 100%;
                    position: relative;
                    cursor: pointer;
                    img {
                        width: 100%;
                        height: 100%;
                        border: 1px solid #fff;
                        object-fit: cover;
                    }
                }
                .shortCutArea {
                    width: 72%;
                    height: 100%;
                    .texts {
                        width: 100%;
                        height: 50%;
                        padding: 0 3.5%;
                        .grade {
                            width: 100%;
                            img {
                                width: 1.5vw;
                            }
                        }
                        .gradeName {
                            line-height: 1vw;
                        }
                        .myName {
                            line-height: 1vw;
                            font-size: 1.1vw;
                        }
                    }
                    .icons {
                        height: 50%;
                        display: flex;
                        justify-content: flex-end;
                        align-items: flex-end;
                        gap: 2%;
                        button {
                            display: flex;
                            height: 35%;
                            align-items: flex-end;
                            border: none;
                            position: relative;
                            img {
                                height: 100%;
                            }
                            .new {
                                width: 0.4vw;
                                height: 0.4vw;
                                border-radius: 50%;
                                background: ${dangerColor};
                                position: absolute;
                                top: 0%;
                                right: 0%;
                            }
                        }
                    }
                }
            }
        }
        .logoutArea {
            position: absolute;
            top: 20%;
            right: 10%;
        }
        // .shortCutArea {
        //     width: 100%;
        //     height: 30%;
        //     padding: 10px;
        //     display: flex;
        //     justify-content: center;
        //     align-items: flex-end;
        //     .shortCutIcon {
        //         width: 100%;
        //         display: flex;
        //         justify-content: center;
        //         gap: 15px;
        //         .icons {
        //             cursor: pointer;
        //             transition: all 0.2s;
        //             border: none;
        //             outline: none;
        //             &:hover {
        //                 color: pink;
        //             }
        //         }
        //     }
        // }
    }
`;
