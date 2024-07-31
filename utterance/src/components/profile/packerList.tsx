import { RiCloseLine } from "react-icons/ri";
import { ButtonStyle, Out } from "../Style";
import { ExtractBox, ListBox, NameBox, PackerListModal } from "./pacekrStyle";
import { useCallback, useEffect, useRef, useState } from "react";
import { DataProps, PackerWrite } from "./packerWrite";
import { useRecoilValue } from "recoil";
import { selectUserState, userState } from "@/atom";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/firebaseApp";
import { useQuery } from "react-query";

interface PackerListProps {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    packer: string;
}

export const PackerList: React.FC<PackerListProps> = ({ setModal, packer }) => {
    const [mode, setMode] = useState<string>("list");
    const [record, setRecord] = useState<DataProps>({
        title: "",
        image: "",
        content: "",
        createdAt: "",
        id: "",
    });
    const selectChar = useRecoilValue(selectUserState);
    const user = useRecoilValue(userState);
    const modalRef = useRef<HTMLDivElement>(null);

    const fetchData = async () => {
        if (selectChar.id) {
            try {
                const docRef = collection(
                    db,
                    "database",
                    selectChar.id,
                    packer
                );
                const docQuery = query(docRef, orderBy("createdAt", "desc"));
                const docSnapshot = await getDocs(docQuery);
                const data: DataProps[] = docSnapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                })) as DataProps[];
                return data;
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }
    };

    const { data } = useQuery([packer, selectChar.id], fetchData, {
        staleTime: 30000,
    });

    const handleClickOutside = useCallback(
        (e: MouseEvent) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(e.target as Node)
            ) {
                setModal(false);
            }
        },
        [setModal]
    );

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleClickOutside]);

    return (
        <PackerListModal ref={modalRef}>
            <Out onClick={() => setModal(false)}>
                <RiCloseLine size={25} color="black" />
            </Out>
            {mode !== "list" && (
                <PackerWrite
                    setMode={setMode}
                    mode={mode}
                    packer={packer}
                    record={record}
                />
            )}
            {/* {read && <PackerDetail setRead={setRead} record={record} />} */}
            <NameBox>
                <p className="mainTitle">{packer.toUpperCase()}</p>
                <p className="subTitle">보안이 취약한 데이터베이스입니다.</p>
            </NameBox>
            <ListBox>
                {data &&
                    data.map((each) => (
                        <div
                            className="oneBox"
                            key={each.id}
                            onClick={() => {
                                setMode("detail");
                                setRecord(each);
                            }}
                        >
                            <div className="listTitle">{each.title}</div>
                            <div className="listPreview">{each.content}</div>
                        </div>
                    ))}
            </ListBox>
            <ExtractBox>
                <div className="buttonWrap">
                    {selectChar.id === user.uid && (
                        <ButtonStyle
                            fontSize={"0.8vw"}
                            onClick={() => {
                                if (data && data?.length < 45) {
                                    setMode("write");
                                } else {
                                    alert("DB에 공간이 부족합니다!");
                                }
                            }}
                        />
                    )}
                </div>
            </ExtractBox>
        </PackerListModal>
    );
};
