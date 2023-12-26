import styled from "@emotion/styled";
interface InputProps {
    fontSize: string;
    height: string;
}
interface ButtonProps {
    fontSize: string;
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

export const ButtonStyle = styled.button<ButtonProps>`
    width: 100%;
    height: 100%;
    border: 1px solid #fff;
    border-radius: 3px;
    color: #fff;
    font-size: ${(props) => props.fontSize};
    transition: all 0.1s;
    &.selected {
        color: red;
    }
    &:hover {
        background: rgba(255, 255, 255, 0.1);
    }
`;
