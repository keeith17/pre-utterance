import styled from "@emotion/styled";

export const LoginWrap = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    .login {
        width: 530px;
        height: 280px;
        margin: auto;
        // background: rgba(255, 255, 255, 0.2);
        border: 1px solid #fff;
        position: relative;
        display: flex;
        .logo {
            width: 400px;
            font-size: 50px;
            text-align: center;
            position: absolute;
            top: -30%;
            left: 50%;
            transform: translateX(-200px);
        }
    }
`;
export const InfoArea = styled.div`
    width: 100%;
    height: 40%;
    margin: auto;
    padding: 0 30px;
    display: flex;
    justify-content: space-between;

    .info {
        width: 330px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .loginInfo {
            width: 100%;
            height: 50px;
            text-indent: 10px;
            font-size: 15px;
            background: transparent;
            border: 1px solid #fff;
            border-radius: 3px;
            caret-color: #fff;
            &:focus {
                outline: none;
            }
            &::placeholder {
                color: #fff;
            }
        }
    }
    .submit {
        width: 125px;
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
