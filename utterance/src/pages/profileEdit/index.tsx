import { InputStyle } from "@/components/Style";
import { ProfileLayout, Save, TextAreaStyle } from "./profileEditStyle";

export default function ProfileEditPage() {
    return (
        <ProfileLayout>
            <div className="profileLayout">
                <div className="profTitle">Personal Detail Report</div>
                <form>
                    <div className="profGroup">
                        <div className="inputGroup">
                            <div className="profBox">두상</div>
                            <InputStyle className="profWrite" fontSize="11px" height="23px"></InputStyle>
                        </div>
                        <div className="inputGroup">
                            <div className="profBox">이름</div>
                            <InputStyle className="profWrite" fontSize="11px" height="23px"></InputStyle>
                        </div>
                        <div className="inputGroup">
                            <div className="profBox">키 / 몸무게</div>
                            <InputStyle className="profWrite" fontSize="11px" height="23px"></InputStyle>
                        </div>
                        <div className="inputGroup">
                            <div className="profBox">종족</div>
                            <InputStyle className="profWrite" fontSize="11px" height="23px"></InputStyle>
                        </div>
                        <div className="inputGroup">
                            <div className="profBox">행성</div>
                            <InputStyle className="profWrite" fontSize="11px" height="23px"></InputStyle>
                        </div>
                        <div className="inputGroup">
                            <div className="profBox">정보 권한 1 정보</div>
                            <TextAreaStyle className="profWrite" rows={7} cols={57} />
                        </div>
                        
                        <div className="inputGroup">
                            <div className="profBox">정보 권한 2 정보</div>
                            <InputStyle className="profWrite" fontSize="11px" height="auto"></InputStyle>
                        </div>
                        
                        <div className="inputGroup">
                            <div className="profBox">정보 권한 3 정보</div>
                            <InputStyle className="profWrite" fontSize="11px" height="23px"></InputStyle>
                        </div>

                        <div className="inputGroup">
                            <div className="profBox">1번 관계 이름</div>
                            <InputStyle className="profWrite" fontSize="11px" height="23px"></InputStyle>
                        </div>

                        <div className="inputGroup">
                            <div className="profBox">1번 관계 내용</div>
                            <InputStyle className="profWrite" fontSize="11px" height="23px"></InputStyle>
                        </div>

                        <div className="inputGroup">
                            <div className="profBox">2번 관계 이름</div>
                            <InputStyle className="profWrite" fontSize="11px" height="23px"></InputStyle>
                        </div>

                        <div className="inputGroup">
                            <div className="profBox">2번 관계 내용</div>
                            <InputStyle className="profWrite" fontSize="11px" height="23px"></InputStyle>
                        </div>

                        <div className="inputGroup">
                            <div className="profBox">3번 관계 이름</div>
                            <InputStyle className="profWrite" fontSize="11px" height="23px"></InputStyle>
                        </div>

                        <div className="inputGroup">
                            <div className="profBox">3번 관계 내용</div>
                            <InputStyle className="profWrite" fontSize="11px" height="23px"></InputStyle>
                        </div>
                    </div>
                </form>
            </div>
            <Save>
                <button className="save">save</button>
            </Save>
        </ProfileLayout>
    );
}