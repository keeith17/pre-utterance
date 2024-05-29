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
                padding: 15px;
                display: flex;
                justify-content: left;
                position: relative;
                img {
                    position: absolute;
                    top: 15px;
                    left: 15px;
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
                width: 35%;
                height: 100%;
                background: url(/images/profile/infoframe.webp) 0% 50% no-repeat;
                background-size: 85% 85%;
                padding: 35px 15px 90px 40px;
                position: relative;
                .charWrap {
                    width: 84%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    gap: 5px;
                    .charDiv {
                        width: 100%;
                        height: 33.333%;
                        // padding: 15px 15px 25px 15px;
                        font-size: 18px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding-bottom: 10px;
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
                            gap: 5px;
                            font-size: 18px;
                            .charFrom {
                                width: 50%;
                                height: 100%;
                                display: flex;
                                padding-bottom: 10px;
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
                                padding-bottom: 10px;
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
                    width: 50px;
                    border: 1px solid #fff;
                    position: absolute;
                    bottom: 25px;
                    right: 55px;
                    .gradeImg {
                        width: 48px;
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
                    margin-bottom: 15px;
                    display: flex;
                    align-items: flex-end;
                    border: 1px solid #fff;
                    background: url(/images/profile/information1.webp) no-repeat;
                    background-size: 100% 100%;
                    p {
                        width: 100%;
                        height: 90%;
                        padding: 10px 15px 15px 15px;
                        overflow-y: scroll;
                        font-family: "nexonGothic";
                        text-align: justify;
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
                            padding: 10px;
                            border-radius: 50%;
                            position: absolute;
                            bottom: -5px;
                            left: 0;
                            z-index: 1;
                            aspect-ratio: 1/1;
                        }
                        .headFrame {
                            height: 100%;
                            position: absolute;
                            bottom: -5px;
                            left: 0;
                            z-index: 2;
                        }
                    }
                }
                .relaContent {
                    width: 68%;
                    height: 100%;
                    padding: 0 20px 5px 10px;
                    .textBox {
                        width: 100%;
                        height: 100%;
                        padding: 5px 5px 5px 0;
                        background: url(/images/profile/gwangyenaeyong.webp) 0
                            100% no-repeat;
                        background-size: 100% 100%;
                        p {
                            width: 100%;
                            height: 100%;
                            overflow-y: scroll;
                            font-family: "nexonGothic";
                            font-size: 14px;
                            line-height: 20px;
                            text-align: justify;
                            display: flex;
                            padding: 15px 20px;
                        }
                    }
                }
            }
            .relationName {
                width: 100%;
                height: 30%;
                display: flex;
                justify-content: flex-end;
                padding: 0 20px;
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
export const CharList = styled.div`
    width: 100%;
    height: 22%;
    padding: 15px 150px;
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
        padding: 10px 30px;
        display: flex;
        justify-content: center;
    }
    .gifWrap {
        width: 70%;
        display: flex;
        flex: 1;
        flex-flow: wrap;
        justify-content: flex-start;
        gap: 15px;
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
