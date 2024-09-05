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
                border: none;
                ouline: none;
                border-radius: 5px;
                background: #fff;
                color: #444;
                font-weight: 700;
            }
        }
        .things {
            width: 100%;
            height: 95%;
            padding: 0.51vw 0;
            display: flex;
            flex-flow: wrap;
            gap: 0.5vw;
            .thing {
                width: 13%;
                height: 12vh;
                padding: 1%;
                border: 1px solid #fff;
                border-radius: 5px;
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
                    }
                }
                .thingName {
                    width: 100%;
                    height: 20%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
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
            width: 7vw;
            height: 100%;
            border: none;
            ouline: none;
            border-radius: 20px;
            background: ${defaultColor};
        }
    }
`;

export const ShopInfoWrap = styled.div`
    width: 100%;
    height: 30%;
`;

export const InventoryWrap = styled.div`
    width: 100%;
    height: 70%;
`;

export const AddShopWrap = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    .modal {
        width: 40%;
        height: 60%;
        background: rgba(0, 0, 0, 0.8);
        border: 2px solid #fff;
        border-radius: 10px;
        padding: 1vw;
        position: relative;
        form {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .category {
                width: 100%;
                height: 7%;
                display: flex;
                gap: 0.5vw;
                margin-bottom: 0.5vw;
                button {
                    width: 5vw;
                    height: 100%;
                    border: none;
                    ouline: none;
                    border-radius: 5px;
                    background: #fff;
                    color: #444;
                    font-weight: 700;
                }
            }
            .inputBox {
                width: 100%;
                height: 12%;
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
            .textBox {
                width: 100%;
                height: 30%;
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
                height: 8%;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                margin-top: 0.5vw;
                button {
                    width: 15%;
                    height: 100%;
                    border: none;
                    ouline: none;
                    border-radius: 20px;
                    background: ${defaultColor};
                }
            }
        }
    }
`;
