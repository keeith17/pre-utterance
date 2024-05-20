import {
    collection,
    doc,
    getDocs,
    orderBy,
    query,
    writeBatch,
} from "firebase/firestore";
import { ControlStyle } from "./adminStyle";
import { db } from "@/firebaseApp";
import { AllCharProps } from "@/atom";
import { useQuery } from "react-query";
import { ButtonStyle, DropdownStyle, InputStyle } from "@/components/Style";
import { useState } from "react";

interface UpdatesProps {
    id: string;
    data: {
        [credit: string]: number;
    };
}
export default function Control() {
    const [updates, setUpdates] = useState<UpdatesProps[]>([]);
    const [mode, setMode] = useState<string>("money");
    const fetchAllCharData = async () => {
        try {
            const charRef = collection(db, "character");
            const charQuery = query(charRef, orderBy("name", "asc"));
            const allCharSnapshot = await getDocs(charQuery);
            const data: AllCharProps[] = allCharSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as AllCharProps[];
            return data;
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };
    const { data: allChar } = useQuery("allChar", fetchAllCharData, {
        staleTime: 20000,
    });

    const searchCredit = (myId: string) => {
        if (allChar) {
            for (const char of allChar) {
                if (char.id === myId) {
                    return char.credit;
                }
            }
        }
    };

    const searchLeftCredit = (myId: string) => {
        if (updates) {
            for (const update of updates) {
                if (update.id === myId) {
                    return update.data.credit;
                }
            }
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { name, value },
        } = e;
        // const tempArr = updates.filter((update) => update.id !== name);
        const myCredit = searchCredit(name);
        if (myCredit) {
            setUpdates([
                ...updates.filter((update) => update.id !== name),
                { id: name, data: { credit: myCredit + Number(value) } },
            ]);
        }
        // setUpdates([...updates, { id: name, data: { credit: value } }]);
    };

    const handleSubmit = async () => {
        const batch = writeBatch(db);

        updates.forEach((update) => {
            const docRef = doc(db, "character", update.id);
            batch.update(docRef, update.data);
        });

        try {
            await batch.commit();
            console.log("Batch write successfully committed!");
        } catch (error) {
            console.error("Error writing batch: ", error);
        }
    };

    return (
        <ControlStyle>
            <div className="buttonWrap">
                <ButtonStyle
                    fontSize="15px"
                    onClick={() => {
                        setMode("money");
                        setUpdates([]);
                    }}
                >
                    재화
                </ButtonStyle>
                <ButtonStyle
                    fontSize="15px"
                    onClick={() => {
                        setMode("grade");
                        setUpdates([]);
                    }}
                >
                    등급
                </ButtonStyle>
            </div>
            {allChar && mode === "money"
                ? allChar?.map((character, index) => (
                      <li className="eachlow" key={index}>
                          <div className="charname">{character?.name}</div>
                          <div className="money">
                              {(character?.credit || 0) + "Q"}
                          </div>
                          <div className="makeMoney">
                              <InputStyle
                                  fontSize="13px"
                                  fontFamily="nexonGothic"
                                  height="20px"
                                  border="1px solid #fff"
                                  name={character.id}
                                  onChange={handleChange}
                              />
                          </div>
                          <div className="leftMoney">
                              {searchLeftCredit(character.id) ||
                                  character.credit}
                          </div>
                      </li>
                  ))
                : allChar?.map((character, index) => (
                      <li className="eachlow" key={index}>
                          <div className="charname">{character?.name}</div>
                          <div className="grade">
                              <DropdownStyle
                                  height="30px"
                                  fontFamily="nexonGothic"
                              >
                                  <option
                                      value="0"
                                      selected={character?.grade === "0"}
                                  >
                                      0 등급
                                  </option>
                                  <option
                                      value="1"
                                      selected={character?.grade === "1"}
                                  >
                                      1 등급
                                  </option>
                                  <option
                                      value="2"
                                      selected={character?.grade === "2"}
                                  >
                                      2 등급
                                  </option>
                                  <option
                                      value="3"
                                      selected={character?.grade === "3"}
                                  >
                                      3 등급
                                  </option>
                                  {/* <option>
                                      {(character?.grade || 0) + "등급"}
                                  </option> */}
                              </DropdownStyle>
                          </div>
                      </li>
                  ))}
            <div className="buttonWrap">
                <ButtonStyle fontSize="15px" onClick={handleSubmit}>
                    저장!
                </ButtonStyle>
            </div>
        </ControlStyle>
    );
}
