import { useState } from "react";
import { app } from "../../firebaseApp";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function AddIdPage() {
    console.log(process.env.REACT_APP_API_KEY);
    const [serial, setSerial] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();
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
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const auth = getAuth(app);
            await createUserWithEmailAndPassword(auth, serial, password);
            navigate("/");
            alert("등록 완");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <form className="addId" onSubmit={onSubmit}>
                <input
                    type="text"
                    name="serial"
                    id="serial"
                    placeholder="serial"
                    value={serial}
                    required
                    onChange={onChange}
                />
                <input
                    type="text"
                    name="password"
                    id="password"
                    placeholder="password"
                    value={password}
                    required
                    onChange={onChange}
                />
                <button type="submit" className="submitButton">
                    아이디 등록
                </button>
            </form>
        </div>
    );
}
