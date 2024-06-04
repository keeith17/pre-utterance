import { selectUserState } from "@/atom";
import { GetButtonProps } from "@/pages/search";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";

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
    const setSelectChar = useSetRecoilState(selectUserState);
    const handleProfileSet = () => {
        if (button?.link === "/ProfilePage") {
            setSelectChar({
                badge: "",
                badgeImg: "",
                gifUrl: "",
                grade: "",
                gradeImg: "",
                name: "",
                nick: "",
                credit: 0,
                id: "",
                height: "",
                weight: "",
                from: "",
                planet: "",
                secret1: "",
                secret2: "",
                secret3: "",
                rela1: "",
                desc1: "",
                rela2: "",
                desc2: "",
                rela3: "",
                desc3: "",
            });
        }
    };
    return (
        <ResultButtonStyle onClick={handleProfileSet}>
            <Link
                to={button?.link !== "" ? `${button?.link}` : `/${button?.id}`}
            >
                {button.name}
            </Link>
        </ResultButtonStyle>
    );
}
