import { Global } from "@emotion/react";
import { GlobalStyle } from "./GlobalStyle";
import Router from "./components/Router";

export default function App() {
    return (
        <>
            <Global styles={GlobalStyle} />
            <Router />
        </>
    );
}
