import styled from "@emotion/styled";

export const ProfileLayout = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    .profileLayout {
        width: 800px; /* 고정된 너비 800px 설정 */
        height: 100%;
        padding: 70px 90px;
        margin: 0 auto; /* 가로 중앙 정렬을 위한 margin 설정 */
        display: flex;
        flex-flow: wrap;
        justify-content: center;
        background: rgba(255, 255, 255, 0.05);
        border: 2px solid rgba(255, 255, 255, 0.5);
        border-radius: 10px;
        .profTitle {
            display: flex;
            width: 100%;
            height: 10%;
            border-bottom: 2px solid #fff;
            justify-content: center;
            font-size: 45px;
        }
        .formWrap {
            width: 100%;
            height: calc(90% - 40px);
            overflow: hidden;
            margin-top: 40px;
            .profGroup {
                overflow-y: scroll;
                width: 100%;
                height: 100%;
                padding-right: 10px;
                display: flex;
                flex-direction: column;
                gap: 25px;
                .inputGroup {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    gap: 15px;
                    .profBox {
                        width: 25%;
                        // height: 30px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-right: 2px solid #fff;
                        // background: rgba(255, 255, 255, 0.13);
                        // border-radius: 5px;
                    }
                    .inputBox {
                        width: 75%;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                    }
                }
            }
        }
    }
`;

export const Save = styled.div`
    width: 15%;
    height: 15%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: absolute;
    bottom: 4%;
    right: 4%;
`;
