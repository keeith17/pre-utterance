import styled from "@emotion/styled";

//test
interface InputProps {
    fontSize: string;
    fontFamily: string;
    height: string;
    border: string;
}
interface ButtonProps {
    fontSize: string;
}

interface DropdownProps {
    height: string;
    fontFamily: string;
}

interface textAreaProps {
    fontFamily: string;
}

export const ButtonStyle = styled.button<ButtonProps>`
    width: 100%;
    height: 100%;
    border: 1px solid #fff;
    border-radius: 3px;
    color: #fff;
    font-size: ${(props) => props.fontSize};
    font-family: "Giants-Inline";
    transition: all 0.1s;
    &.selected {
        color: red;
    }
    &:hover {
        background: rgba(255, 255, 255, 0.1);
    }
`;

export const Out = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
`;

export const InputStyle = styled.input<InputProps>`
    width: 100%;
    height: ${(props) => props.height};
    text-indent: 10px;
    font-size: ${(props) => props.fontSize};
    background: transparent;
    border: ${(props) => props.border};
    border-radius: 3px;
    caret-color: #fff;
    color: #fff;
    font-family: ${(props) => props.fontFamily};
    &:focus {
        outline: none;
    }
    &::placeholder {
        color: #fff;
    }
`;

export const DropdownStyle = styled.select<DropdownProps>`
    width: 100%;
    height: ${(props) => props.height};
    font-family: ${(props) => props.fontFamily};
    // background: transparent;
    // border: 1px solid #fff;
    background-color: transparent;
    border: none;
    border-radius: 3px;
    caret-color: #fff;
    color: #fff;
    text-indent: 5px;
    &:focus {
        outline: none;
    }
    option {
        color: #000;
    }
`;

export const TextAreaStyle = styled.textarea<textAreaProps>`
    width: 100%;
    height: 150px;
    padding: 8px;
    background: transparent;
    color: #fff;
    font-family: ${(props) => props.fontFamily};
    // border: 1px solid #fff;
    border: none;
    border-radius: 3px;
    caret-color: #fff;
    resize: none;
    &:focus {
        outline: none;
    }
    &::placeholder {
        color: #fff;
    }
`;
