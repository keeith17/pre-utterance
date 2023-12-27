import { InputStyle } from "@/components/Style";
import { DropdownStyle, Out, ProfileLayout, Save, TextAreaStyle } from "./profileEditStyle";

export default function ProfileEditPage() {
    return (
        <ProfileLayout>
            <div className="profileLayout">
                <Out>
                    <button className="out">X</button>
                </Out>
                <div className="profTitle">Personal Detail Report</div>
                <form>
                    <div className="profGroup">
                        <div className="inputGroup">
                            <div className="profBox">두상</div>
                            <InputStyle fontSize=" 13px" height="23px"></InputStyle>
                        </div>
                        <div className="inputGroup">
                            <div className="profBox">이름</div>
                            <InputStyle fontSize=" 13px" height="23px"></InputStyle>
                        </div>
                        <div className="inputGroup">
                            <div className="profBox">키 / 몸무게</div>
                            <InputStyle fontSize=" 13px" height="23px"></InputStyle>
                        </div>
                        <div className="inputGroup">
                            <div className="profBox">종족</div>
                            <DropdownStyle className="profWrite">
                                <option value="루흘">루흘</option>
                                <option value="아스화리탈">아스화리탈</option>
                                <option value="우고트">우고트</option>
                                <option value="테라">테라</option>
                                <option value="하라간">하라간</option>
                            </DropdownStyle>
                        </div>
                        <div className="inputGroup">
                            <div className="profBox">행성</div>
                            <DropdownStyle className="profWrite">
                                <option value="소버린">소버린</option>
                                <option value="아스화리탈">아스화리탈</option>
                                <option value="할라">할라</option>
                                <option value="테라">테라</option>
                                <option value="카르툼">카르툼</option>
                            </DropdownStyle>
                        </div>
                        <div className="inputGroup">
                            <div className="profBox">비밀</div>
                            <TextAreaStyle placeholder="정보 권한 2등급에 해당되는 정보를 입력해 주세요." rows={6} cols={57} />
                        </div>
                        
                        <div className="inputGroup">
                            <div className="profBox">기밀</div>
                            <TextAreaStyle placeholder="정보 권한 3등급에 해당되는 정보를 입력해 주세요." rows={6} cols={57} />
                        </div>
                        
                        <div className="inputGroup">
                            <div className="profBox">극비</div>
                            <TextAreaStyle placeholder="정보 권한 4등급에 해당되는 정보를 입력해 주세요." rows={6} cols={57} />
                        </div>

                        <div className="inputGroup">
                            <div className="profBox">소셜 네트워크 A</div>
                            <DropdownStyle className="profWrite">
                                <option value="1번 친구">1번 친구</option>
                                <option value="2번 친구">2번 친구</option>
                                <option value="3번 친구">3번 친구</option>
                            </DropdownStyle>
                        </div>

                        <div className="inputGroup">
                            <div className="profRelationBox"></div>
                            <InputStyle fontSize=" 13px" height="23px"></InputStyle>
                        </div>

                        <div className="inputGroup">
                            <div className="profBox">소셜 네트워크 B</div>
                            <DropdownStyle className="profWrite">
                                <option value="1번 친구">1번 친구</option>
                                <option value="2번 친구">2번 친구</option>
                                <option value="3번 친구">3번 친구</option>
                            </DropdownStyle>
                        </div>

                        <div className="inputGroup">
                            <div className="profRelationBox"></div>
                            <InputStyle fontSize=" 13px" height="23px"></InputStyle>
                        </div>

                        <div className="inputGroup">
                            <div className="profBox">소셜 네트워크 C</div>
                            <DropdownStyle className="profWrite">
                                <option value="1번 친구">1번 친구</option>
                                <option value="2번 친구">2번 친구</option>
                                <option value="3번 친구">3번 친구</option>
                            </DropdownStyle>
                        </div>

                        <div className="inputGroup">
                            <div className="profRelationBox"></div>
                            <InputStyle fontSize=" 13px" height="23px"></InputStyle>
                        </div>
                    </div>
                </form>
                <Save>
                    <button className="save">save</button>
                </Save>
            </div>
        </ProfileLayout>
    );
}