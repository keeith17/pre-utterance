import React from "react";

interface ModalStateProps {
    setMake: React.Dispatch<React.SetStateAction<boolean>>;
    setRec: React.Dispatch<React.SetStateAction<boolean>>;
}

const MessageBox: React.FC<ModalStateProps> = ({ setMake, setRec }) => {
    return (
        <div className="msgBox">
            <div onClick={() => setMake(true)}>임시 make</div>
            <div onClick={() => setRec(true)}>임시 rec</div>
        </div>
    );
};

export default MessageBox;
