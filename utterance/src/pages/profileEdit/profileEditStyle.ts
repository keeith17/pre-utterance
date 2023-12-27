import styled from "@emotion/styled";

export const ProfileLayout = styled.div`
    .profileLayout {
        width: 800px; /* 고정된 너비 800px 설정 */
        margin: 0 auto; /* 가로 중앙 정렬을 위한 margin 설정 */
        display: flex;
        flex-direction: column; /* 수직 방향으로 표시 */
        border: 2.5px solid #fff;
        min-height: 900px;
        height: 90%;
    }
    
    .profTitle {
        display: flex;
        justify-content: center;
        font-size: 45px;
        margin-top: 25px;
    }

    .profGroup {
        margin-top: 30px;
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
        height: 25px;
    }

    .profRelationBox {
        display: flex;
        align-items: center; /* 세로 중앙 정렬 */
        justify-content: center; /* 가로 중앙 정렬 */
        margin-right: 30px;
        width: 180px;
        box-sizing: border-box; /* border-box를 사용하여 너비 계산 */
        height: 25px;
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
        border: 2px solid #fff;
        margin-right: 10px;
        margin-bottom: 10px;
    }
`;

export const DropdownStyle = styled.select`
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
    background-color: black;
    width: 540px;
`

