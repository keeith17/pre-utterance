import { css } from "@emotion/react";
import giantsInline from "./assets/fonts/Giants-Inline.ttf";
import nexonGothic from "./assets/fonts/NEXON_Lv2_Gothic_Light.ttf";

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
        font-family: "Giants-Inline", "nexonGothic";
    }

    body {
        font-family: "Giants-Inline", "nexonGothic";
        overflow-x: overlay;
        overflow-y: overlay;
        background: url(https://images.pexels.com/photos/1694000/pexels-photo-1694000.jpeg)
            no-repeat;
        background-size: cover;
        color: #ffffff;
        position: relative;
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
`;
