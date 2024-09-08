import { defaultColor } from "@/GlobalStyle";
import styled from "@emotion/styled";

export const ShopWrap = styled.div`
    width: 100%;
    height: 100%;
    padding: 2vw;
    display: flex;
    gap: 2vw;
    .shopList {
        width: 60%;
        height: 100%;
    }
    .infos {
        width: 40%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 2vw;
    }
`;

export const ShopListWrap = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    border: 2px solid #fff;
    border-radius: 10px;
    padding: 1vw;
    .thingBox {
        width: 100%;
        height: 95%;
        .category {
            width: 100%;
            height: 5%;
            display: flex;
            gap: 0.5vw;
            button {
                width: 5vw;
                height: 100%;
                padding-bottom: 0.2vw;
                border: none;
                ouline: none;
                border-radius: 5px;
                background: #fff;
                color: #444;
                font-weight: 700;
                font-size: 0.8vw;
                font-family: neurimboGothic;
                &.selected {
                    background: ${defaultColor};
                    color: #fff;
                }
            }
        }
        .things {
            width: 100%;
            height: 95%;
            overflow-y: scroll;
            padding: 0.5vw 0;
            display: flex;
            flex-flow: wrap;
            align-content: flex-start;
            gap: 0.5vw;
            .thing {
                width: 13%;
                height: 12vh;
                padding: 1%;
                border: 1px solid #fff;
                border-radius: 5px;
                cursor: pointer;
                overflow: hidden;
                background: rgba(0, 0, 0, 0.8);
                .thingImg {
                    width: 100%;
                    height: 80%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img {
                        height: 100%;
                        aspect-ratio: 1/1;
                        object-fit: cover;
                        -webkit-box-reflect: below -10px linear-gradient(to
                                    bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
                    }
                }
                .thingName {
                    width: 100%;
                    height: 20%;
                    padding-top: 0.3vw;
                    text-align: center;
                    // display: flex;
                    // align-items: flex-end;
                    // justify-content: center;
                    font-family: nexonGothic;
                    font-weight: 700;
                    font-size: 0.6vw;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    position: relative;
                    z-index: 3;
                }
            }
        }
    }
    .buttonBox {
        width: 100%;
        height: 5%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        button {
            width: 5vw;
            height: 100%;
            padding-bottom: 0.2vw;
            border: none;
            ouline: none;
            border-radius: 25px;
            background: ${defaultColor};
            font-size: 0.8vw;
            font-family: neurimboGothic;
        }
    }
`;

export const ShopInfoWrap = styled.div`
    width: 100%;
    height: 30%;
    background: rgba(0, 0, 0, 0.7);
    border: 2px solid #fff;
    border-radius: 10px;
    padding: 1vw;
    display: flex;
    .success {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .left {
        width: 35%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img {
            width: 55%;
            aspect-ratio: 1/1;
            object-fit: cover;
            -webkit-box-reflect: below -10px linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
        }
        p {
            width: 100%;
            text-align: center;
            padding-top: 1vw;
            font-weight: 700;
            font-family: nexonGothic;
            position: relative;
            z-index: 3;
        }
    }
    .right {
        width: 65%;
        height: 100%;
        position: relative;
        p {
            width: 100%;
            height: 100%;
            overflow-y: scroll;
            display: flex;
            align-items: center;
            justify-content: center;
            white-space: pre-wrap;
            font-family: nexonGothic;
            // background: rgba(0, 0, 0, 0.3);
        }
        .buttonBox {
            position: absolute;
            bottom: 0;
            right: 0;
            span {
                padding-right: 0.5vw;
                font-family: nexonGothic;
                font-size: 0.6vw;
                font-weight: 700;
            }
            button {
                width: 4vw;
                height: 1.5vw;
                padding-bottom: 0.2vw;
                border: none;
                ouline: none;
                border-radius: 5px;
                background: #fff;
                color: #444;
                font-weight: 700;
                font-size: 0.8vw;
                font-family: neurimboGothic;
                &.selected {
                    background: ${defaultColor};
                    color: white;
                }
            }
        }
    }
`;

export const InventoryWrap = styled.div`
    width: 100%;
    height: 70%;
    background: rgba(0, 0, 0, 0.7);
    border: 2px solid #fff;
    border-radius: 10px;
    padding: 1vw;
    display: flex;
    flex-flow: wrap;
    overflow-y: scroll;

    .category {
        width: 100%;
        padding: 0.5vw 0;
        display: flex;
        flex-flow: wrap;
        align-content: flex-start;
        justify-content: flex-start;
        gap: 0.4vw;
        .thing {
            width: 15.3%;
            height: 9vh;
            padding: 1%;
            border: 1px solid #fff;
            border-radius: 5px;
            cursor: pointer;
            overflow: hidden;
            background: rgba(0, 0, 0, 0.8);
            position: relative;
            .checkOn {
                position: absolute;
                z-index: 2;
                top: 0;
                right: 0;
                background: rgba(255, 255, 255, 0.7);
                padding: 0.1vw 0.1vw 0.2vw 0.1vw;
                color: ${defaultColor};
                font-weight: 700;
                font-family: nexonGothic;
                font-size: 0.6vw;
            }
            .thingImg {
                width: 100%;
                height: 70%;
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                    height: 100%;
                    aspect-ratio: 1/1;
                    object-fit: cover;
                    -webkit-box-reflect: below -10px linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
                }
            }
            .thingName {
                width: 100%;
                height: 30%;
                padding-top: 0.3vw;
                text-align: center;
                font-family: nexonGothic;
                font-weight: 700;
                font-size: 0.5vw;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                position: relative;
                z-index: 3;
            }
        }
        .title {
            width: 100%;
            height: 1.2vw;
            background: #fff;
            color: black;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding-bottom: 0.2vw;
            padding-left: 0.2vw;
        }
    }
`;

export const AddShopWrap = styled.div`
    width: 100%;
    height: 100%;
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    .modal {
        width: 40%;
        height: 50%;
        background: rgba(0, 0, 0, 0.8);
        border: 2px solid #fff;
        border-radius: 10px;
        padding: 1vw;
        position: relative;
        .category {
            width: 100%;
            height: 7%;
            display: flex;
            gap: 0.5vw;
            margin-bottom: 0.5vw;
            button {
                width: 5vw;
                height: 100%;
                padding-bottom: 0.2vw;
                border: none;
                ouline: none;
                border-radius: 5px;
                background: #fff;
                color: #444;
                font-weight: 700;
                font-size: 0.8vw;
                font-family: neurimboGothic;
                &.selected {
                    background: ${defaultColor};
                    color: white;
                }
            }
        }
        form {
            width: 100%;
            height: 93%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .topBox {
                width: 100%;
                height: 40%;
                display: flex;
                gap: 1vw;
                .imgBox {
                    height: 100%;
                    border: 1px solid #fff;
                    aspect-ratio: 1/1;
                    .imageBox {
                        width: 100%;
                        height: 100%;
                        .fileForm {
                            width: 100%;
                            height: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            cursor: pointer;
                            img {
                                width: 100%;
                                aspect-ratio: 1/1;
                                object-fit: cover;
                            }
                        }
                        .hidden {
                            display: none;
                        }
                    }
                }
                .textBox {
                    flex: 1 1 auto;
                    height: 100%;
                    .inputBox {
                        width: 100%;
                        height: 40%;
                        margin: 0.3vw 0;
                        display: flex;
                        flex-direction: column;
                        gap: 0.3vw;
                        .inputTitle {
                            width: 100%;
                            text-align: left;
                            font-size: 1vw;
                        }
                    }
                }
            }

            .textBox {
                width: 100%;
                height: 40%;
                display: flex;
                flex-direction: column;
                gap: 0.3vw;
                .textTitle {
                    width: 100%;
                    text-align: left;
                    font-size: 1vw;
                }
                textarea {
                    border: 1px solid #fff;
                }
            }
            .buttonBox {
                width: 100%;
                height: 15%;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                margin-top: 0.5vw;
                button {
                    width: 15%;
                    height: 60%;
                    border: none;
                    ouline: none;
                    border-radius: 25px;
                    font-size: 0.7vw;
                    background: ${defaultColor};
                    font-family: neurimboGothic;
                    padding-bottom: 0.2vw;
                }
            }
        }
    }
`;
