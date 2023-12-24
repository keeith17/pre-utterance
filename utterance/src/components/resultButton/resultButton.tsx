import { GetButtonProps } from "@/pages/search";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const ResultButtonStyle = styled.div`
    border-radius: 10px;
    font-family: nexonGothic;
    background: rgba(255, 255, 255, 0.2);
    a {
        display: inline-block;
        padding: 7px 21px;
        font-family: nexonGothic;
        font-weight: 500;
        color: #fff;
    }
`;
interface ResultButtonProps {
    button: GetButtonProps;
}
export default function ResultButton({ button }: ResultButtonProps) {
    return (
        <ResultButtonStyle>
            <Link to={`/${button?.id}`}>{button.name}</Link>
        </ResultButtonStyle>
    );
}
