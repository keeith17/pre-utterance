import { ReactNode } from "react";
import styled from "@emotion/styled";
import MyPageBox from "./myPage/MyPageBox";
import NoticeBox from "./notice/NoticeBox";

const LayoutStyle = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    position: relative;
    .contentInfo {
        width: 77%;
        position: relative;
    }
    .fixedInfo {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
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
