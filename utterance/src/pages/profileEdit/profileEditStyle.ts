import styled from "@emotion/styled";

export const ProfileLayout = styled.div`
    .profileLayout {
        width: 800px; /* 고정된 너비 800px 설정 */
        margin: 0 auto; /* 가로 중앙 정렬을 위한 margin 설정 */
        display: flex;
        flex-direction: column; /* 수직 방향으로 표시 */
        border: 1px solid red;
        min-height: 900px;
        height: 90%;
    }
    
    .profTitle {
        display: flex;
        justify-content: center;
        font-size: 50px;
        margin-top: 27px;
    }

    .profLine {
        border: 1px solid blue;
    }

    .profGroup {
        margin-top: 30px;
        border: 1px solid green;
    }

    .inputGroup {
        display: flex; /* 수평 방향으로 표시 */
        margin-bottom: 10px;
        padding: 0 130px;
    }

    .profBox {
        display: flex;
        align-items: center; /* 세로 중앙 정렬 */
        justify-content: center; /* 가로 중앙 정렬 */
        margin-right: 30px;
        border: 1px solid white;
        width: 180px;
        box-sizing: border-box; /* border-box를 사용하여 너비 계산 */
    }

    .profWrite {
        white-space: pre-wrap; /* 추가: 자동으로 줄바꿈되도록 설정 */
        /* 추가적인 스타일을 원하면 여기에 작성 */
    }
`;

export const TextAreaStyle = styled.textarea`
    background: transparent;
    border: 1px solid #fff;
    border-radius: 3px;
    caret-color: #fff;
    color: #fff;
    &:focus {
        outline: none;
    }
    &::placeholder {
        color: #fff;
    }
`;

export const Save = styled.div`
    display: flex;
    justify-content: flex-end; /* 오른쪽 정렬 */

    .save {
        width: 50px;
        border: 1px solid yellow;
    }
`;

