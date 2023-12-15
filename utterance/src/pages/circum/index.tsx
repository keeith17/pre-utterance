import { useRecoilValue } from "recoil";
import { userState } from "../../atom";

export default function CircumPage() {
    const user = useRecoilValue(userState);
    console.log(user);
    return <div>환경 페이지</div>;
}
