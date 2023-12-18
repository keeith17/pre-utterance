import styled from "@emotion/styled";

const LoaderWrap = styled.div`
    width: 50px;
    height: 50px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border: 5px solid white;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    z-index: 99;

    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

export default function Loader() {
    return <LoaderWrap></LoaderWrap>;
}
