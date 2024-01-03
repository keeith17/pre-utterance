import { useState } from "react";
import { InfoArea, LoginWrap } from "./loginStyle";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/firebaseApp";
import { useNavigate } from "react-router-dom";
import { InputStyle } from "@/components/Style";
import { useQueryClient } from "react-query";

export default function LoginPage() {
    const queryClient = useQueryClient();
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
            await queryClient.invalidateQueries("charData");
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
                        <InputStyle
                            type="text"
                            id="serial"
                            name="serial"
                            className="loginInfo"
                            placeholder="ID"
                            height="50px"
                            fontSize="15px"
                            border="1px solid #fff"
                            fontFamily="Giants-Inline"
                            onChange={onChange}
                        />
                        <InputStyle
                            type="text"
                            id="password"
                            name="password"
                            className="loginInfo"
                            placeholder="PASSWORD"
                            height="50px"
                            fontSize="15px"
                            border="1px solid #fff"
                            fontFamily="Giants-Inline"
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
