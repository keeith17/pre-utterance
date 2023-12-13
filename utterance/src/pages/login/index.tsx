import { InfoArea, LoginWrap } from "./loginStyle";

export default function LoginPage() {
    return (
        <LoginWrap>
            <div className="login">
                <div className="logo">프로젝트 PANDORA</div>
                <InfoArea>
                    <div className="info">
                        <input
                            type="text"
                            id="loginId"
                            className="loginInfo"
                            placeholder="Id"
                        />
                        <input
                            type="text"
                            id="loginPw"
                            className="loginInfo"
                            placeholder="Password"
                        />
                    </div>
                    <div className="submit">
                        <button type="submit" className="loginSubmit">
                            로그인
                        </button>
                    </div>
                </InfoArea>
            </div>
        </LoginWrap>
    );
}
