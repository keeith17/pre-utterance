import styled from "@emotion/styled";

export const SearcWrap = styled.div`
    width: 100%;
    height: 100%;
    .searchBox {
        width: 100%;
        height: 100%;
        display: flex;
        .content {
            width: 50%;
            height: 40%;
            margin: auto auto 360px auto;
            .pandora {
                font-size: 70px;
                text-align: center;
                padding: 20px;
            }
            .inputBox {
                width: 100%;
                display: flex;
                justify-content: center;
                input {
                    width: 610px;
                    background: rgba(0, 0, 0, 0.7);
                    &::placeholder {
                        font-family: "spaceAge";
                    }
                }
            }
            .linkButton {
                display: flex;
                gap: 10px;
                justify-content: center;
                margin-top: 20px;
            }
            form {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
        }
    }
    .underBar {
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
    }
`;

export const SearcDetailWrap = styled.div`
    width: 100%;
    height: 100%;
    padding-right: 10px;
    display: flex;
    .buttonArea {
        width: 40%;
        height: 100%;
        .buttonWrap {
            width: 100%;
            height: 50px;
            padding: 5px 200px;
        }
    }
    .contentArea {
        width: 60%;
        height: 100%;
        .guideWrap {
            width: 100%;
            height: 100%;
        }
        .imgWrap {
            width: 100%;
            height: 100%;
            overflow-y: scroll;
            padding-right: 5px;
            img {
                width: 100%;
            }
        }
    }
`;
