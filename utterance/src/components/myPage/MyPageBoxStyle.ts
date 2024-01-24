import styled from "@emotion/styled";

export const MyPageStyle = styled.div`
    width: 100%;
    height: 25%;
    .myPageBox {
        width: 100%;
        height: 100%;
        position: relative;
        background: url(/images/main/frame/frame_442x271.webp) no-repeat;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
        .contentArea {
            width: 85%;
            height: 60%;
            padding: 5px 0 7px 5px;
            .myInfoArea {
                width: 100%;
                height: 100%;
                display: flex;
                .profilePhoto {
                    width: 28%;
                    height: 100%;
                    position: relative;
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
                        padding: 0 10px;
                        .grade {
                            width: 100%;
                            img {
                                width: 30px;
                            }
                        }
                        .gradeName {
                            line-height: 20px;
                        }
                        .myName {
                            line-height: 20px;
                            font-size: 25px;
                        }
                    }
                    .icons {
                        height: 50%;
                        display: flex;
                        justify-content: flex-end;
                        align-items: flex-end;
                        gap: 5px;
                        button {
                            border: none;
                        }
                    }
                }
            }
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
