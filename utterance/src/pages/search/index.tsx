import { InputStyle } from "@/components/Style";
import { SearcWrap } from "./searchStyle";

export default function SearchPage() {
    return (
        <SearcWrap>
            <div className="searchBox">
                <div className="content">
                    <div className="pandora">Πανδώρα</div>
                    <InputStyle
                        type="text"
                        height="54px"
                        fontSize="18px"
                        placeholder="무엇이 궁금하신가요?"
                    />
                    <div className="linkButton"></div>
                </div>
            </div>
        </SearcWrap>
    );
}
