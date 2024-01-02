import styled from "@emotion/styled";

export const CharacterWrap = styled.div`
    width: 100%;
    height: 100%;
    padding-right: 10px;
`;

export const Character = styled.div`
    width: 100%;
    height: 78%;
    display: flex;
    .charContent {
        width: 60%;
        height: 100%;
        .charDefault {
            width: 100%;
            height: 40%;
            display: flex;
            .headGif {
                width: 35%;
                height: 100%;
                padding: 15px;
                display: flex;
                justify-content: left;
                img {
                    height: 100%;
                    object-fit: cover;
                    aspect-ratio: 1/1;
                }
            }
            .charInfo {
                width: 40%;
                height: 100%;
                padding: 40px;
                .charName {
                    width: 100%;
                    height: 30%;
                    padding: 15px;
                    font-family: "nexonGothic";
                    display: flex;
                    align-items: center;
                    border-bottom: 1px solid #fff;
                    img {
                        height: 100%;
                        object-fit: cover;
                    }
                }
            }
            .charBadge {
                width: 25%;
                height: 100%;
                padding: 35px;
                display: flex;
                justify-content: center;
                transform: perspective(300px) rotateZ(0deg);
                animation: move 8s linear infinite;
                img {
                    height: 100%;
                    object-fit: cover;
                }
                @keyframes move {
                    0% {
                        transform: perspective(300px) rotateY(0deg);
                    }
                    100% {
                        transform: perspective(300px) rotateY(-360deg);
                    }
                }
            }
        }
        .charSecret {
            width: 100%;
            height: 60%;
            overflow-y: auto;
            padding: 15px;
            // display: flex;
            // flex-direction: column;
            // gap: 20px;
            .secret {
                width: 100%;
                height: 300px;
                padding: 15px;
                margin-bottom: 20px;
                border: 1px solid #fff;
                overflow-y: auto;
                p {
                    font-family: "nexonGothic";
                    text-align: justify;
                }
            }
        }
    }
    .charRelation {
        width: 40%;
        height: 100%;
    }
`;
export const CharList = styled.div`
    width: 100%;
    height: 22%;
    padding: 15px 150px;
    display: flex;
    background: rgba(255, 255, 255, 0.1);
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
            img {
                width: 100%;
            }
            &.selected {
                border: 3px solid purple;
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
