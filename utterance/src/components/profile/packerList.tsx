import { RiCloseLine } from "react-icons/ri";
import { Out } from "../Style";
import { ListBox, NameBox, PackerListModal, SubmitBox } from "./pacekrStyle";

interface PackerListProps {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PackerList: React.FC<PackerListProps> = ({ setModal }) => {
    return (
        <PackerListModal>
            <Out onClick={() => setModal(false)}>
                <RiCloseLine size={25} color="black" />
            </Out>
            <NameBox>
                <p>DATA BASE 1</p>
                <p>보안이 취약한 데이터베이스입니다.</p>
            </NameBox>
            <ListBox></ListBox>
            <SubmitBox></SubmitBox>
        </PackerListModal>
    );
};
