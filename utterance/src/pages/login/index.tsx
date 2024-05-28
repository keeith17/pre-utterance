import { useState } from "react";
import { InfoArea, LoginWrap } from "./loginStyle";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/firebaseApp";
import { useNavigate } from "react-router-dom";
import { InputStyle } from "@/components/Style";
import { useQueryClient } from "react-query";
import { defaultColor } from "@/GlobalStyle";

export default function LoginPage() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    //이메일, 비밀번호 변수
    const [serial, setSerial] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
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
            setError(true);
            console.log(error);
        }
    };
    return (
        <LoginWrap>
            {/* <video width="100%" muted autoPlay loop>
                <source src={"/videos/Untitled.mp4"} type="video/mp4" />
            </video> */}
            <div className="yImsi">
                <img
                    src="/images/index/ewcircle2.webp"
                    alt="y_rotate"
                    // height={500}
                />
            </div>
            <div className="yImsi2">
                <img
                    src="/images/index/circle2.webp"
                    alt="y_rotate"
                    // height={500}
                />
            </div>
            <div className="yImsi3">
                <img
                    src="/images/index/noongeum.webp"
                    alt="y_rotate"
                    // height={500}
                />
            </div>
            <div className="y_rotate">
                <img
                    src="/images/index/indexin.webp"
                    alt="y_rotate"
                    // height={500}
                />
            </div>
            <div className="login">
                <div className="logo">
                    <img src="/images/index/logo.webp" alt="로고" />
                </div>
                <InfoArea onSubmit={onSubmit}>
                    <div className="info">
                        <InputStyle
                            type="text"
                            id="serial"
                            name="serial"
                            className="loginInfo"
                            placeholder="ID"
                            height="45px"
                            fontSize="15px"
                            border={`1px solid ${defaultColor}`}
                            fontFamily="nexonGothic"
                            onChange={onChange}
                        />
                        <InputStyle
                            type="password"
                            id="password"
                            name="password"
                            className="loginInfo"
                            placeholder="PASSWORD"
                            height="45px"
                            fontSize="15px"
                            border={`1px solid ${defaultColor}`}
                            fontFamily="nexonGothic"
                            onChange={onChange}
                        />
                        {error && (
                            <div className="wrong">
                                로그인 정보를 다시 확인해 주세요.
                            </div>
                        )}
                    </div>
                    <div className="submit">
                        <button type="submit" className="loginSubmit">
                            Login
                        </button>
                    </div>
                </InfoArea>
            </div>
        </LoginWrap>
    );
}
