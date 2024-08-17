import styled from "@emotion/styled";

export const ProfileLayout = styled.div`
    width: 100%;
    height: 100%;
    padding: 0.5vw 0 0.2vw 0;
    // background: rgba(0, 0, 0, 0.7);
    // background: rgba(255, 255, 255, 0.1);
    position: relative;
    .profileLayout {
        width: 45vw; /* 고정된 너비 800px 설정 */
        height: 100%;
        padding: 0 4.5vw 3.5vw 4vw;
        margin: 0 auto;
        display: flex;
        flex-flow: wrap;
        justify-content: center;
        background: url(/images/profile_write/mainframe/mainframe_968x1043.webp)
            no-repeat;
        background-size: 100% 100%;
        .profTitle {
            width: 100%;
            height: 15%;
            border-bottom: 2px solid #fff;
            font-size: 2.2vw;
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
            height: calc(85% - 2vw);
            overflow: hidden;
            margin-top: 2vw;
            .profGroup {
                overflow-y: auto;
                width: 100%;
                height: 100%;
                padding-right: 0.8vw;
                display: flex;
                flex-direction: column;
                gap: 1.2vw;
                .inputGroup {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    gap: 0.7vw;
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
                        gap: 0.5vw;
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
    width: 5%;
    height: 5%;
    display: flex;
    flex-direction: column;
    gap: 1vw;
    position: absolute;
    bottom: 5%;
    right: 5%;
    button {
        background: white;
        color: black;
        font-weight: 700;
        padding-bottom: 0.2vw;
        &:hover {
            color: white;
        }
    }
`;
