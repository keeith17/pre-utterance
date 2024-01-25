import styled from "@emotion/styled";

export const ProfileLayout = styled.div`
    width: 100%;
    height: 100%;
    padding: 10px 0 5px 0;
    position: relative;
    .profileLayout {
        width: 968px; /* 고정된 너비 800px 설정 */
        height: 100%;
        padding: 0 90px 70px 80px;
        margin: 0 auto; /* 가로 중앙 정렬을 위한 margin 설정 */
        display: flex;
        flex-flow: wrap;
        justify-content: center;
        background: url(/images/profile_write/mainframe/mainframe_968x1043.webp)
            no-repeat;
        background-size: 100% 100%;
        // .mainframe {
        //     height: 99%;
        //     position: absolute;
        //     top: 0.5%;
        //     left: calc(50% - 434px);
        // }
        .profTitle {
            width: 100%;
            height: 15%;
            border-bottom: 2px solid #fff;
            font-size: 45px;
            display: flex;
            justify-content: center;
            align-items: center;
            .titleBox {
                width: 60%;
                .title {
                    width: 100%;
                }
            }
        }
        .formWrap {
            position: relatve;
            z-index: 2;
            width: 100%;
            height: calc(85% - 40px);
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
                        width: 20%;
                        // height: 30px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-right: 2px solid #fff;
                        // background: rgba(255, 255, 255, 0.13);
                        // border-radius: 5px;
                    }
                    .inputBox {
                        width: 80%;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                        input {
                            background: rgba(0, 0, 0, 0.8);
                        }
                        select {
                            background: rgba(0, 0, 0, 0.8);
                        }
                        textarea {
                            background: rgba(0, 0, 0, 0.8);
                        }
                    }
                }
            }
        }
    }
`;

export const Save = styled.div`
    width: 15%;
    height: 12%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: absolute;
    bottom: 2%;
    right: 5%;
`;
