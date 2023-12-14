import { useState } from "react";
import { InfoArea, LoginWrap } from "./loginStyle";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebaseApp";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    console.log(process.env.REACT_APP_API_KEY);
    const navigate = useNavigate();
    //이메일, 비밀번호 변수
    const [serial, setSerial] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    //입력된 이메일, 비밀번호 값 변경
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { name, value },
        } = e;
        if (name === "serial") {
            setSerial(value);
        }
        if (name === "password") {
            setPassword(value);
        }
    };
    //로그인
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const auth = getAuth(app);
            await signInWithEmailAndPassword(auth, serial, password);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <LoginWrap>
            <video width="100%" muted autoPlay loop>
                <source src={"/videos/Untitled.mp4"} type="video/mp4" />
            </video>
            <div className="login">
                <div className="logo">프로젝트 PANDORA</div>
                <InfoArea onSubmit={onSubmit}>
                    <div className="info">
                        <input
                            type="text"
                            id="serial"
                            name="serial"
                            className="loginInfo"
                            placeholder="ID"
                            onChange={onChange}
                        />
                        <input
                            type="text"
                            id="password"
                            name="password"
                            className="loginInfo"
                            placeholder="PASSWORD"
                            onChange={onChange}
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
