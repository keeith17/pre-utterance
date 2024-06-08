import { RiCloseLine } from "react-icons/ri";
import { ButtonStyle, Out } from "../Style";
import { ExtractBox, ListBox, NameBox, PackerListModal } from "./pacekrStyle";
import { useState } from "react";
import { PackerWrite } from "./packerWrite";
import { useRecoilValue } from "recoil";
import { selectUserState, userState } from "@/atom";

interface PackerListProps {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PackerList: React.FC<PackerListProps> = ({ setModal }) => {
    const [write, setWrite] = useState<boolean>(false);
    const selectChar = useRecoilValue(selectUserState);
    const user = useRecoilValue(userState);
    return (
        <PackerListModal>
            <Out onClick={() => setModal(false)}>
                <RiCloseLine size={25} color="black" />
            </Out>
            {write && <PackerWrite setWrite={setWrite} />}
            <NameBox>
                <p className="mainTitle">DATA BASE 1</p>
                <p className="subTitle">보안이 취약한 데이터베이스입니다.</p>
            </NameBox>
            <ListBox>
                <div className="oneBox"></div>
                <div className="oneBox"></div>
                <div className="oneBox"></div>
                <div className="oneBox"></div>
                <div className="oneBox"></div>
                <div className="oneBox"></div>
                <div className="oneBox"></div>
                <div className="oneBox"></div>
                <div className="oneBox"></div>
                <div className="oneBox"></div>
            </ListBox>
            <ExtractBox>
                <div className="buttonWrap">
                    {selectChar.id === user.uid && (
                        <ButtonStyle
                            fontSize={"0.8vw"}
                            onClick={() => setWrite(true)}
                        >
                            EXTRACT
                        </ButtonStyle>
                    )}
                </div>
            </ExtractBox>
        </PackerListModal>
    );
};
