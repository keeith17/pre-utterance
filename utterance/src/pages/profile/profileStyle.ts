import { defaultColor } from "@/GlobalStyle";
import styled from "@emotion/styled";

export const CharacterWrap = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`;

export const Character = styled.div`
    width: 100%;
    height: 78%;
    display: flex;
    position: relative;
    .selectDoc {
        width: 100%;
        height: 100%;
        padding: 3%;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        font-size: 40px;
        animation: slowBlink 1.4s infinite;
        @keyframes slowBlink {
            0%,
            49% {
                opacity: 1;
            }
            50%,
            100% {
                opacity: 0;
            }
        }
    }
    .charContent {
        width: 65%;
        height: 100%;
        .charDefault {
            width: 100%;
            height: 35%;
            display: flex;
            .headGif {
                width: 24%;
                height: 100%;
                padding: 1.3%;
                display: flex;
                justify-content: left;
                position: relative;
                img {
                    position: absolute;
                    top: 5.5%;
                    left: 6.1%;
                }
                .headGifFrame {
                    z-index: 2;
                    height: 90%;
                }
                .head {
                    height: 72%;
                    z-index: 1;
                    margin: 10%;
                    border: 1px solid rgba(255, 255, 255, 0.7);
                    // object-fit: cover;
                    // aspect-ratio: 1/1;
                    // clip-path: polygon(
                    //     0% 0%,
                    //     50% 0%,
                    //     100% 50%,
                    //     100% 100%,
                    //     0% 100%
                    // );
                }
            }
            .charInfo {
                width: 32%;
                height: 100%;
                display: flex;
                align-items: center;
                position: relative;
                .charWrap {
                    width: 92%;
                    height: 85%;
                    padding: 4% 3%;
                    background: url(/images/profile/infoframe.webp) 0% 50%
                        no-repeat;
                    background-size: 100% 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    // justify-content: space-between;
                    gap: 3%;
                    .charDiv {
                        width: 90%;
                        height: 22.5%;
                        // padding: 15px 15px 25px 15px;
                        font-size: 0.7vw;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding-bottom: 2%;
                        &.charName {
                            background: url(/images/profile/infoname.webp)
                                no-repeat;
                            background-size: 100% 100%;
                        }
                        &.charKimom {
                            background: url(/images/profile/kimom.webp)
                                no-repeat;
                            background-size: 100% 100%;
                        }
                        &.planet {
                            padding: 0;
                            display: flex;
                            gap: 1.5%;
                            font-size: 0.7vw;
                            .charFrom {
                                width: 50%;
                                height: 100%;
                                display: flex;
                                padding-bottom: 2%;
                                justify-content: center;
                                align-items: center;
                                background: url(/images/profile/jongjok.webp)
                                    no-repeat;
                                background-size: 100% 100%;
                            }
                            .charPlanet {
                                width: 50%;
                                height: 100%;
                                display: flex;
                                padding-bottom: 2%;
                                justify-content: center;
                                align-items: center;
                                background: url(/images/profile/hangsung.webp)
                                    no-repeat;
                                background-size: 100% 100%;
                            }
                        }
                    }
                }
                .imgBox {
                    height: 15%;
                    // border: 1px solid #fff;
                    position: absolute;
                    bottom: 8%;
                    right: 8%;
                    .gradeImg {
                        height: 100%;
                    }
                }
            }
            .charBadge {
                width: 21%; //하고 나면 20% 남음..
                height: 100%;
                padding: 35px;
                display: flex;
                justify-content: center;
                transform: perspective(2000px) rotateZ(0deg);
                animation: move 8s linear infinite;
                img {
                    height: 100%;
                    object-fit: cover;
                }
                @keyframes move {
                    0% {
                        transform: perspective(2000px) rotateY(0deg);
                    }
                    100% {
                        transform: perspective(2000px) rotateY(-360deg);
                    }
                }
            }
        }
        .charSecretWrap {
            width: 100%;
            height: 65%;
            background: url(/images/profile/maimframe.webp) 60% 50% no-repeat;
            background-size: 96% 95%;
            padding: 3.9% 4.3% 4.8% 4.3%;
            .charSecret {
                width: 100%;
                height: 100%;
                overflow-y: scroll;
                padding-right: 0.5%;
                // display: flex;
                // flex-direction: column;
                // gap: 20px;
                .secret {
                    width: 100%;
                    height: 57%;
                    // height: 250px;
                    margin-bottom: 1.5%;
                    display: flex;
                    align-items: flex-end;
                    border: 1px solid #fff;
                    background: url(/images/profile/information1.webp) no-repeat;
                    background-size: 100% 100%;
                    p {
                        width: 100%;
                        height: 90%;
                        padding: 0.9% 1.3% 1.3% 1.3%;
                        overflow-y: scroll;
                        font-family: "nexonGothic";
                        text-align: justify;
                        white-space: pre-wrap;
                        line-height: 1vw;
                    }
                }
            }
        }
    }
    .charRelation {
        width: 35%;
        height: 100%;
        background: url(/images/profile/gwangyeframe.webp) 0 100% no-repeat;
        background-size: 95% 97%;
        padding: 3% 1%;
        .relations {
            width: 93%;
            height: 25%;
            .relationInfo {
                width: 100%;
                height: 70%;
                display: flex;
                .relaPhoto {
                    width: 32%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .imgBox {
                        width: 70%;
                        height: 95%;
                        position: relative;
                        .headRela {
                            display: flex;
                            height: 100%;
                            padding: 8%;
                            border-radius: 50%;
                            position: absolute;
                            bottom: -3%;
                            left: 0;
                            z-index: 1;
                            aspect-ratio: 1/1;
                        }
                        .headFrame {
                            height: 100%;
                            position: absolute;
                            bottom: -3%;
                            left: 0;
                            z-index: 2;
                        }
                    }
                }
                .relaContent {
                    width: 68%;
                    height: 100%;
                    padding: 0 3.4% 0.8% 1.6%;
                    .textBox {
                        width: 100%;
                        height: 100%;
                        padding: 1.3% 1.3% 1.3% 0;
                        background: url(/images/profile/gwangyenaeyong.webp) 0
                            100% no-repeat;
                        background-size: 100% 100%;
                        p {
                            width: 100%;
                            height: 100%;
                            overflow-y: scroll;
                            font-family: "nexonGothic";
                            font-size: 0.55vw;
                            line-height: 0.78vw;
                            text-align: justify;
                            display: flex;
                            padding: 3.98% 6.38%;
                        }
                    }
                }
            }
            .relationName {
                width: 100%;
                height: 30%;
                display: flex;
                justify-content: flex-end;
                padding: 0 3.5%;
                .nameBox {
                    width: 50%;
                    height: 100%;
                    display: flex;
                    justify-content: flex-end;
                    // padding-left: 50px;
                    // padding-top: 8px;
                    background: url(/images/profile/gwangyename.webp) 0 100%
                        no-repeat;
                    background-size: 100% 100%;
                    p {
                        width: 83%;
                        height: 78%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }
            }
        }
    }
`;

export const SynapsePacker = styled.div`
    width: 41.5%;
    height: 100%;
    display: flex;
    align-items: center;
    .packerBack {
        width: 100%;
        height: 90%;
        padding: 16% 12% 14% 12%;
        background: url(/images/profile/whijangframe.webp) no-repeat;
        background-size: 100% 100%;
        .database {
            width: 100%;
            height: 100%;
            color: #444;
            .db {
                width: 100%;
                height: 33.333%;
                display: flex;
                align-items: center;
                gap: 3%;

                .quasa2 {
                    .count1 {
                        background: #f1ceac;
                    }
                    .count2 {
                        background: #fd8719;
                    }
                    .count3 {
                        background: #e86c00;
                    }
                }

                .quasa3 {
                    .count1 {
                        background: #b6e0e6;
                    }
                    .count2 {
                        background: #1bddfa;
                    }
                    .count3 {
                        background: #00b3ce;
                    }
                }

                .quasa1 {
                    .count1 {
                        background: #adf1a6;
                    }
                    .count2 {
                        background: #adf1a6;
                    }
                    .count3 {
                        background: #adf1a6;
                    }
                }
                .dbTitle {
                    width: 10%;
                    padding-top: 1%;
                    text-align: center;
                }
                .gage {
                    width: 90%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    gap: 1.7%;
                    .count {
                        width: 3.8%;
                        height: 60%;
                        border: 1px solid #aaa;
                    }
                }
            }
        }
    }
`;
export const CharList = styled.div`
    width: 100%;
    height: 22%;
    padding: 0.83% 8.3%;
    display: flex;
    background: url(/images/profile/listbackground.webp) no-repeat;
    background-size: 100% 100%;
    position: relative;
    .leftArrow {
        width: 10%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
            background: linear-gradient(
                to left,
                transparent,
                rgba(0, 0, 0, 0.5)
            );
        }
    }
    .badgeWrap {
        width: 30%;
        height: 100%;
        // padding: 0.6% 1.8%;
        padding: 0.6% 1.8% 0 1.8%;
        display: flex;
        justify-content: center;
        // 거울 효과
        // -webkit-box-reflect: below 0px
        //     linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
    }
    .gifWrap {
        width: 70%;
        display: flex;
        flex: 1;
        flex-flow: wrap;
        justify-content: flex-start;
        gap: 1.3%;
        .charGif {
            cursor: pointer;
            height: 45%;
            border-radius: 50%;
            overflow: hidden;
            aspect-ratio: 1/1;
            border: none;
            outline: none;
            border: 1px solid #fff;
            img {
                width: 100%;
            }
            &.selected {
                border: 1px solid ${defaultColor};
            }
        }
    }
    .rightArrow {
        width: 10%;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
            background: linear-gradient(
                to right,
                transparent,
                rgba(0, 0, 0, 0.5)
            );
        }
    }
`;
