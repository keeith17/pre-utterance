import { defaultColor } from "@/GlobalStyle";
import styled from "@emotion/styled";

export const LoginWrap = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    background: url(/images/loginbackground.webp) no-repeat 50% 0;
    background-size: cover;
    .y_rotate {
        position: absolute;
        left: calc(50% - 453px);
    }
    .login {
        width: 480px;
        height: 565px;
        margin: auto;
        padding-bottom: 30px;
        position: relative;
        // display: flex;
        .logo {
            display: flex;
            justify-content: center;
            padding-bottom: 35px;
        }
    }
`;
export const InfoArea = styled.form`
    width: 100%;
    height: 246px;
    background: url(/images/index/login_frame.webp) no-repeat 50% 50%;
    background-size: cover;
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
        input {
            &::placeholder {
                font-family: "spaceAge";
            }
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
