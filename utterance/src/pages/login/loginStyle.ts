import styled from "@emotion/styled";

export const LoginWrap = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    .login {
        width: 480px;
        height: 240px;
        margin: auto;
        // background: rgba(255, 255, 255, 0.2);
        // border: 1px solid #fff;
        position: relative;
        display: flex;
        .logo {
            width: 600px;
            font-size: 50px;
            text-align: center;
            position: absolute;
            top: -150%;
            left: 50%;
            transform: translateX(-300px);
            z-index: 0;
            img {
                width: 100%;
            }
        }
    }
`;
export const InfoArea = styled.form`
    width: 100%;
    height: 40%;
    margin: auto;
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 1;
    .info {
        width: 320px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .submit {
        width: 85px;
        height: 100%;
        .loginSubmit {
            width: 100%;
            height: 100%;
            border: 1px solid #fff;
            border-radius: 3px;
            color: #fff;
            font-size: 20px;
            transition: all 0.1s;
            &:hover {
                background: rgba(255, 255, 255, 0.1);
            }
        }
    }
`;
