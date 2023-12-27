import styled from "@emotion/styled";

export const MyPageStyle = styled.div`
    width: 100%;
    height: 25%;
    .myPageBox {
        width: 100%;
        height: 100%;
        position: relative;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.2);
        .logoutArea {
            width: 100%;
            height: 12%;
            position: absolute;
            top: 5px;
            right: 5px;
            padding: 0 0 0 85%;
        }
        .myInfoArea {
            width: 100%;
            height: 70%;
            display: flex;
            .badge {
                width: 30%;
                height: 100%;
                padding: 15px 20px;
                display: flex;
                justify-content: right;
                img {
                    height: 100%;
                    object-fit: cover;
                }
            }
            .profilePhoto {
                height: 100%;
                aspect-ratio: 1 / 1;
                padding: 15px;
                position: relative;
                img {
                    width: 100%;
                    object-fit: cover;
                    border-radius: 50%;
                }
                .myname {
                    width: 100%;
                    height: 10%;
                    position: absolute;
                    bottom: -10px;
                    left: 0;
                    text-align: center;
                    font-family: "nexonGothic";
                }
            }
            .grade {
                width: 30%;
                height: 100%;
                padding: 5px 0;
                display: flex;
                justify-content: left;
                img {
                    width: 70%;
                    object-fit: cover;
                }
            }
        }
        .shortCutArea {
            width: 100%;
            height: 30%;
            padding: 10px;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            .shortCutIcon {
                width: 100%;
                display: flex;
                justify-content: center;
                gap: 15px;
                .icons {
                    cursor: pointer;
                    transition: all 0.2s;
                    &:hover {
                        color: pink;
                    }
                }
            }
        }
    }
`;
