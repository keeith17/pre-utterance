import { InfoArea, LoginWrap } from "./loginStyle";

export default function LoginPage() {
    return (
        <LoginWrap>
            <video width="100%" muted autoPlay loop>
                <source src="/public/videos/Untitled.mp4" type="video/mp4" />
            </video>
            <div className="login">
                <div className="logo">프로젝트 PANDORA</div>
                <InfoArea>
                    <div className="info">
                        <input
                            type="text"
                            id="loginId"
                            className="loginInfo"
                            placeholder="ID"
                        />
                        <input
                            type="text"
                            id="loginPw"
                            className="loginInfo"
                            placeholder="PASSWORD"
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
