import styled from "@emotion/styled";

export const ControlStyle = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    font-size: 18px;
    font-family: nexonGothic;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;
    gap: 20px;
    position: relative;

    .controlBox {
        width: 10vw;
        height: 13vw;
        padding: 0.5vw;
        border: 1px solid rgba(255, 255, 255, 0.5);
        background: rgba(0, 0, 0, 0.7);
        position: absolute;
        top: 0;
        left: 0;
        .boxWrap {
            width: 100%;
            display: flex;
            flex-flow: wrap;
            justify-content: center;
            .eachBox {
                width: 100%;
                padding-bottom: 1vw;
                display: flex;
                flex-flow: wrap;
                p {
                    width: 100%;
                    padding-right: 1vw;
                }
            }
            button {
                border: none;
                outline: none;
                border: 1px solid white;
                padding: 0.3vw;
            }
        }
    }

    .centerWrap {
        width: 80%;
        height: 100%;
        .eachlow {
            width: 100%;
            padding: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: 1px solid #fff;
            .charname {
                width: 30%;
                font-weight: 700;
                text-align: center;
            }
            .money {
                width: 20%;
                text-align: center;
            }
            .makeMoney {
                width: 20%;
            }
            .leftMoney {
                width: 30%;
                color: #ee4466;
                text-align: center;
            }
            .grade {
                width: 70%;
            }
            .badge {
                width: 70%;
            }
        }
    }

    .buttonWrap {
        width: 80%;
        height: 40px;
        display: flex;
        gap: 10px;
        .on {
            background: white;
            color: black;
        }
    }
`;
