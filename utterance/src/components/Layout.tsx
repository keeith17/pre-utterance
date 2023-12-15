import { ReactNode } from "react";
import styled from "@emotion/styled";
import MyPageBox from "./myPage/MyPageBox";
import NoticeBox from "./notice/noticeBox";

const LayoutStyle = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    .contentInfo {
        width: 77%;
    }
    .fixedInfo {
        width: 23%;
    }
`;
interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <LayoutStyle>
            <div className="contentInfo">{children}</div>
            <div className="fixedInfo">
                <MyPageBox />
                <NoticeBox />
            </div>
        </LayoutStyle>
    );
};
