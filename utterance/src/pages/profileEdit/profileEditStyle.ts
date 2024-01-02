import styled from "@emotion/styled";

export const ProfileLayout = styled.div`
    width: 100%;
    height: 100%;
    .profileLayout {
        width: 800px; /* 고정된 너비 800px 설정 */
        height: 100%;
        padding: 60px 100px;
        margin: 0 auto; /* 가로 중앙 정렬을 위한 margin 설정 */
        display: flex;
        flex-flow: wrap;
        justify-content: center;
        position: relative;
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
            height: 90%;
            overflow: hidden;
            margin-top: 50px;
            .profGroup {
                overflow-y: scroll;
                width: 100%;
                height: calc(100% - 50px);
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
                    }
                }
            }
        }
    }
`;

export const Save = styled.div`
    display: flex;
    justify-content: flex-end; /* 오른쪽 정렬 */

    .save {
        width: 50px;
        border: 2px solid #fff;
        margin-right: 8px;
        margin-bottom: 10px;
    }
`;
