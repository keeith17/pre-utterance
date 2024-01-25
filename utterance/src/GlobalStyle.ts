import { css } from "@emotion/react";
import giantsInline from "./assets/fonts/Giants-Inline.ttf";
import nexonGothic from "./assets/fonts/NEXON_Lv2_Gothic_Light.ttf";
import spaceAge from "./assets/fonts/space_age.ttf";

export const defaultColor = "#5535b0";

export const GlobalStyle = css`
    @font-face {
        font-family: "Giants-Inline";
        src: url(${giantsInline}) format("truetype");
        font-display: swap;
    }
    @font-face {
        font-family: "nexonGothic";
        src: url(${nexonGothic}) format("truetype");
        font-display: swap;
    }
    @font-face {
        font-family: "spaceAge";
        src: url(${spaceAge}) format("truetype");
        font-display: swap;
    }
    @font-face {
        font-family: "neurimboGothic";
        src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-01@1.0/neurimboGothicRegular.woff2")
            format("woff2");
        font-weight: normal;
        font-style: normal;
    }

    * {
        margin: 0;
        padding: 0;
        vertical-align: middle;
        box-sizing: border-box;
    }

    html,
    body {
        width: 100%;
        height: 100vh;
    }

    body {
        font-family: "neurimboGothic", "nexonGothic", "Giants-Inline";
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        overflow-x: overlay;
        overflow-y: overlay;
        background: url(/images/main/background_1920x1080.webp) 50% 50%
            no-repeat;
        background-size: cover;
        color: #ffffff;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    ul,
    li {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    a {
        color: #333333;
        text-decoration: none;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-size: 14px;
        font-weight: normal;
    }

    i,
    address,
    em {
        font-style: normal;
    }

    header,
    main,
    footer,
    section,
    nav,
    aside,
    article {
        display: block;
    }

    #root {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
    }

    button {
        background: transparent;
        cursor: pointer;
        color: #fff;
    }
    video {
        overflow: hidden;
        position: fixed;
        z-index: 0;
    }

    &::-webkit-scrollbar {
        width: 5px;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 2px;
        background: rgba(255, 255, 255, 0.8);
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }
`;
