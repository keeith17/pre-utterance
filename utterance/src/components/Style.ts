import styled from "@emotion/styled";
interface InputProps {
    fontSize: string;
    height: string;
}
export const InputStyle = styled.input<InputProps>`
    width: 100%;
    height: ${(props) => props.height};
    text-indent: 10px;
    font-size: ${(props) => props.fontSize};
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
