import {
    InputStyle,
    TextAreaStyle,
    DropdownStyle,
    Out,
} from "@/components/Style";
import { ProfileLayout, Save } from "./profileEditStyle";
import { RiCloseLine } from "react-icons/ri";
import { useNavigate } from "react-router";

export default function ProfileEditPage() {
    // 스타일링 통일
    const thisHeight: string = "30px";
    const thisFont: string = "nexonGothic";

    const navigate = useNavigate();

    return (
        <ProfileLayout>
            <div className="profileLayout">
                <Out
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    <RiCloseLine size={35} />
                </Out>
                <div className="profTitle">Personal Detail Report</div>
                <form className="formWrap">
                    <div className="profGroup">
                        <div className="inputGroup">
                            <div className="profBox">두상</div>
                            <div className="inputBox">
                                <InputStyle
                                    placeholder="1:1 비율의 gif 링크를 삽입해 주세요"
                                    fontSize=" 13px"
                                    border="none"
                                    height={thisHeight}
                                    fontFamily={thisFont}
                                ></InputStyle>
                            </div>
                        </div>
                        <div className="inputGroup">
                            <div className="profBox">이름</div>
                            <div className="inputBox">
                                <InputStyle
                                    placeholder="뭐든 써 주세요"
                                    fontSize=" 13px"
                                    border="none"
                                    height={thisHeight}
                                    fontFamily={thisFont}
                                ></InputStyle>
                            </div>
                        </div>
                        <div className="inputGroup">
                            <div className="profBox">나이</div>
                            <div className="inputBox">
                                <InputStyle
                                    placeholder="숫자만 입력해 주세요"
                                    fontSize=" 13px"
                                    border="none"
                                    height={thisHeight}
                                    fontFamily={thisFont}
                                ></InputStyle>
                            </div>
                        </div>
                        <div className="inputGroup">
                            <div className="profBox">키</div>
                            <div className="inputBox">
                                <InputStyle
                                    placeholder="숫자만 입력해 주세요"
                                    fontSize=" 13px"
                                    border="none"
                                    height={thisHeight}
                                    fontFamily={thisFont}
                                ></InputStyle>
                            </div>
                        </div>
                        <div className="inputGroup">
                            <div className="profBox">몸무게</div>
                            <div className="inputBox">
                                <InputStyle
                                    placeholder="숫자만 입력해 주세요"
                                    fontSize=" 13px"
                                    border="none"
                                    height={thisHeight}
                                    fontFamily={thisFont}
                                ></InputStyle>
                            </div>
                        </div>
                        <div className="inputGroup">
                            <div className="profBox">종족</div>
                            <div className="inputBox">
                                <DropdownStyle
                                    height={thisHeight}
                                    fontFamily={thisFont}
                                >
                                    <option value="루흘">루흘</option>
                                    <option value="아스화리탈">
                                        아스화리탈
                                    </option>
                                    <option value="우고트">우고트</option>
                                    <option value="테라">테라</option>
                                    <option value="하라간">하라간</option>
                                </DropdownStyle>
                            </div>
                        </div>
                        <div className="inputGroup">
                            <div className="profBox">행성</div>
                            <div className="inputBox">
                                <DropdownStyle
                                    height={thisHeight}
                                    fontFamily={thisFont}
                                >
                                    <option value="소버린">소버린</option>
                                    <option value="아스화리탈">
                                        아스화리탈
                                    </option>
                                    <option value="할라">할라</option>
                                    <option value="테라">테라</option>
                                    <option value="카르툼">카르툼</option>
                                </DropdownStyle>
                            </div>
                        </div>
                        <div className="inputGroup">
                            <div className="profBox">비밀</div>
                            <div className="inputBox">
                                <TextAreaStyle
                                    fontFamily={thisFont}
                                    placeholder="정보 권한 2등급에 해당되는 정보를 입력해 주세요."
                                />
                            </div>
                        </div>
                        <div className="inputGroup">
                            <div className="profBox">기밀</div>
                            <div className="inputBox">
                                <TextAreaStyle
                                    fontFamily={thisFont}
                                    placeholder="정보 권한 3등급에 해당되는 정보를 입력해 주세요."
                                />
                            </div>
                        </div>

                        <div className="inputGroup">
                            <div className="profBox">극비</div>
                            <div className="inputBox">
                                <TextAreaStyle
                                    fontFamily={thisFont}
                                    placeholder="정보 권한 4등급에 해당되는 정보를 입력해 주세요."
                                />
                            </div>
                        </div>

                        <div className="inputGroup">
                            <div className="profBox">소셜 네트워크 A</div>
                            <div className="inputBox">
                                <DropdownStyle
                                    height={thisHeight}
                                    fontFamily={thisFont}
                                >
                                    <option value="1번 친구">1번 친구</option>
                                    <option value="2번 친구">2번 친구</option>
                                    <option value="3번 친구">3번 친구</option>
                                </DropdownStyle>
                            </div>
                        </div>
                        <div className="inputGroup">
                            <div className="profBox"></div>
                            <div className="inputBox">
                                <InputStyle
                                    fontSize=" 13px"
                                    border="none"
                                    height={thisHeight}
                                    fontFamily={thisFont}
                                ></InputStyle>
                            </div>
                        </div>
                        <div className="inputGroup">
                            <div className="profBox">소셜 네트워크 B</div>
                            <div className="inputBox">
                                <DropdownStyle
                                    height={thisHeight}
                                    fontFamily={thisFont}
                                >
                                    <option value="1번 친구">1번 친구</option>
                                    <option value="2번 친구">2번 친구</option>
                                    <option value="3번 친구">3번 친구</option>
                                </DropdownStyle>
                            </div>
                        </div>
                        <div className="inputGroup">
                            <div className="profBox"></div>
                            <div className="inputBox">
                                <InputStyle
                                    fontSize=" 13px"
                                    border="none"
                                    height={thisHeight}
                                    fontFamily={thisFont}
                                ></InputStyle>
                            </div>
                        </div>
                        <div className="inputGroup">
                            <div className="profBox">소셜 네트워크 C</div>
                            <div className="inputBox">
                                <DropdownStyle
                                    height={thisHeight}
                                    fontFamily={thisFont}
                                >
                                    <option value="1번 친구">1번 친구</option>
                                    <option value="2번 친구">2번 친구</option>
                                    <option value="3번 친구">3번 친구</option>
                                </DropdownStyle>
                            </div>
                        </div>
                        <div className="inputGroup">
                            <div className="profBox"></div>
                            <div className="inputBox">
                                <InputStyle
                                    fontSize="13px"
                                    border="none"
                                    height={thisHeight}
                                    fontFamily={thisFont}
                                ></InputStyle>
                            </div>
                        </div>
                        <Save>
                            <button className="save">save</button>
                        </Save>
                    </div>
                </form>
            </div>
        </ProfileLayout>
    );
}
