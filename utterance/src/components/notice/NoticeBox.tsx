import styled from "@emotion/styled";

const NoticeStyle = styled.div`
    width: 100%;
    height: 74%;
    .noticeBox {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.2);
    }
`;
export default function NoticeBox() {
    return (
        <NoticeStyle>
            <div className="noticeBox">공지사항</div>
        </NoticeStyle>
    );
}
