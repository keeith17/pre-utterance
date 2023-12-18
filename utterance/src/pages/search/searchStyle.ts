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
            .submit {
                padding: 10px 0;
            }
        }
    }
`;
