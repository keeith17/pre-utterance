import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";

interface ModalStateProps {
    setMake: React.Dispatch<React.SetStateAction<boolean>>;
    setRec: React.Dispatch<React.SetStateAction<boolean>>;
}

const MessageBox: React.FC<ModalStateProps> = ({ setMake, setRec }) => {
    const [box, setBox] = useState<string>("receive");
    return (
        <div className="msgBox">
            <div className="messages">
                <div className="buttonBox">
                    <button
                        className={box === "receive" ? "on" : ""}
                        onClick={() => {
                            setBox("receive");
                        }}
                    >
                        RECEIVE
                    </button>
                    <button
                        className={box === "send" ? "on" : ""}
                        onClick={() => {
                            setBox("send");
                        }}
                    >
                        SEND
                    </button>
                </div>
                <div className="letters" onClick={() => setRec(true)}>
                    임시 rec
                </div>
            </div>
            <div className="makeBtnBox" onClick={() => setMake(true)}>
                <button className="makeBtn">
                    <IoMdSend size={25} />
                </button>
            </div>
        </div>
    );
};

export default MessageBox;
