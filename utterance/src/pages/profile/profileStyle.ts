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
                justify-content: center;
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
                img {
                    height: 100%;
                    object-fit: cover;
                }
            }
        }
        .charSecret {
            width: 100%;
            height: 60%;
            background: rgba(200, 255, 255, 0.1);
        }
    }
    .charRelation {
        width: 40%;
        height: 100%;
        background: rgba(255, 200, 255, 0.1);
    }
`;
export const CharList = styled.div`
    width: 100%;
    height: 22%;
    padding: 10px;
    background: rgba(255, 255, 200, 0.1);
    display: flex;
    gap: 15px;
    .charGif {
        cursor: pointer;
        height: 50%;
        border-radius: 50%;
        overflow: hidden;
        aspect-ratio: 1/1;
        border: none;
        outline: none;
        img {
            width: 100%;
        }
    }
`;
