import { dangerColor, defaultColor } from "@/GlobalStyle";
import styled from "@emotion/styled";

export const LoginWrap = styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    position: relative;
    background: url(/images/loginbackground.webp) no-repeat 50% 0;
    background-size: 100% 100%;
    .yImsi {
        width: 100%;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            width: 35%;
        }
        animation: turn1 12s linear infinite;
        // background: pink;
    }
    .yImsi2 {
        width: 100%;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            width: 38%;
        }
        animation: turn2 30s linear infinite;
        // background: pink;
    }
    .yImsi3 {
        width: 100%;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            width: 32%;
        }
        animation: rotate 30s linear infinite;
        // background: pink;
    }
    .y_rotate {
        width: 100%;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 22%;
        img {
            width: 50%;
        }
        // animation: rotate 20s linear infinite;
        // background: pink;
    }

    @keyframes turn1 {
        0% {
            transform: perspective(2000px) rotateX(0deg) rotateY(0deg);
        }
        12.5% {
            transform: perspective(2000px) rotateX(45deg) rotateY(-135deg);
        }
        25% {
            transform: perspective(2000px) rotateX(90deg) rotateY(-270deg);
        }
        37.5% {
            transform: perspective(2000px) rotateX(135deg) rotateY(-405deg);
        }
        50% {
            transform: perspective(2000px) rotateX(180deg) rotateY(-540deg);
        }
        62.5% {
            transform: perspective(2000px) rotateX(225deg) rotateY(-675deg);
        }
        75% {
            transform: perspective(2000px) rotateX(270deg) rotateY(-810deg);
        }
        87.5% {
            transform: perspective(2000px) rotateX(315deg) rotateY(-945deg);
        }
        100% {
            transform: perspective(2000px) rotateX(360deg) rotateY(-1080deg);
        }
    }

    @keyframes turn2 {
        0% {
            transform: perspective(2000px) rotateX(90deg) rotateY(-270deg);
        }
        12.5% {
            transform: perspective(2000px) rotateX(135deg) rotateY(-405deg);
        }
        25% {
            transform: perspective(2000px) rotateX(180deg) rotateY(-540deg);
        }
        37.5% {
            transform: perspective(2000px) rotateX(225deg) rotateY(-675deg);
        }
        50% {
            transform: perspective(2000px) rotateX(270deg) rotateY(-810deg);
        }
        62.5% {
            transform: perspective(2000px) rotateX(315deg) rotateY(-945deg);
        }
        75% {
            transform: perspective(2000px) rotateX(360deg) rotateY(-1080deg);
        }
        87.5% {
            transform: perspective(2000px) rotateX(405deg) rotateY(-1215deg);
        }
        100% {
            transform: perspective(2000px) rotateX(450deg) rotateY(-1350deg);
        }
    }

    @keyframes rotate {
        to {
            transform: perspective(2000px) rotateZ(360deg);
        }
    }
    .login {
        width: 20%;
        height: 565px;
        margin: auto;
        padding-bottom: 30px;
        position: relative;
        // display: flex;
        .logo {
            width: 100%;
            display: flex;
            justify-content: center;
            padding-bottom: 30px;
            img {
                width: 90%;
            }
        }
    }
`;
export const InfoArea = styled.form`
    width: 100%;
    height: 45%;
    background: url(/images/index/login_frame.webp) no-repeat 50% 50%;
    background-size: 100% 100%;
    margin: auto;
    padding: 0 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    position: relative;
    z-index: 1;
    .info {
        width: 250px;
        height: 40%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        input {
            &::placeholder {
                font-family: "spaceAge";
            }
        }
        .wrong {
            color: ${dangerColor};
            position: absolute;
            bottom: -20px;
            left: 5px;
            font-size: 13px;
        }
    }
    .submit {
        width: 100px;
        height: 40%;
        .loginSubmit {
            width: 100%;
            height: 100%;
            border: 1px solid ${defaultColor};
            background: ${defaultColor};
            border-radius: 3px;
            color: #fff;
            font-size: 20px;
            transition: all 0.1s;
            font-family: spaceAge;
            &:hover {
                background: #8852fd;
            }
        }
    }
`;
