import { RiCloseLine } from "react-icons/ri";
import { ButtonStyle, InputStyle, Out, TextAreaStyle } from "../Style";
import {
    PackerWriteModal,
    SubmitBox,
    WriteBodyBox,
    WriteTitleBox,
} from "./pacekrStyle";
import { useRecoilValue } from "recoil";
import { selectUserState, userState } from "@/atom";

interface PackeWriteProps {
    setWrite: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PackerWrite: React.FC<PackeWriteProps> = ({ setWrite }) => {
    const selectChar = useRecoilValue(selectUserState);
    const user = useRecoilValue(userState);

    return (
        <PackerWriteModal>
            <Out onClick={() => setWrite(false)}>
                <RiCloseLine size={25} color="black" />
            </Out>
            <form>
                <WriteTitleBox>
                    <InputStyle
                        fontSize={"1.8vw"}
                        fontFamily={"nexonGothic"}
                        height={"100%"}
                        border={"none"}
                        placeholder="제목을 입력해 주세요"
                    />
                </WriteTitleBox>
                <WriteBodyBox>
                    <InputStyle
                        fontSize={"0.8vw"}
                        fontFamily={"nexonGothic"}
                        height={"6%"}
                        border={"none"}
                        placeholder="이미지 url 입력 (필수가 아닙니다)"
                    />
                    <TextAreaStyle
                        fontFamily={"nexonGothic"}
                        placeholder="내용 입력"
                    />
                </WriteBodyBox>
                <SubmitBox>
                    <div className="buttonWrap">
                        {selectChar.id === user.uid && (
                            <ButtonStyle
                                fontSize={"0.8vw"}
                                onClick={() => setWrite(true)}
                            >
                                PACKING
                            </ButtonStyle>
                        )}
                    </div>
                </SubmitBox>
            </form>
        </PackerWriteModal>
    );
};
