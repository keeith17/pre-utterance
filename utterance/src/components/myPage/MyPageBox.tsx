import styled from "@emotion/styled";

const MyPageStyle = styled.div`
    width: 100%;
    height: 25%;
    padding: 10px;
    .myPageBox {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.2);
    }
`;
export default function MyPageBox() {
    return (
        <MyPageStyle>
            <div className="myPageBox"> 내 정보</div>
        </MyPageStyle>
    );
}
