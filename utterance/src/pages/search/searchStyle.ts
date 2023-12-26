import styled from "@emotion/styled";

export const SearcWrap = styled.div`
    width: 100%;
    height: 100%;
    padding-right: 10px;
    .searchBox {
        width: 100%;
        height: 100%;
        background: rgba(255, 200, 200, 0.1);
        display: flex;
        .content {
            width: 50%;
            height: 40%;
            margin: auto;
            .pandora {
                font-size: 70px;
                text-align: center;
                padding: 20px;
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
            &::-webkit-scrollbar {
                width: 10px;
            }
            &::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.3);
            }
            &::-webkit-scrollbar-track {
                background: transparent;
            }
            img {
                width: 100%;
            }
        }
    }
`;
