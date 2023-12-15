import { css } from "@emotion/react";
import giantsInline from "./assets/fonts/Giants-Inline.ttf";

export const GlobalStyle = css`
    @font-face {
        font-family: "Giants-Inline";
        src: url(${giantsInline}) format("truetype");
        font-display: swap;
    }

    * {
        margin: 0;
        padding: 0;
        vertical-align: middle;
        box-sizing: border-box;
        font-family: "Giants-Inline";
    }

    html,
    body {
        width: 100%;
    }

    body {
        font-family: "Giants-Inline";
        overflow-x: overlay;
        overflow-y: overlay;
        background: url(https://images.pexels.com/photos/1694000/pexels-photo-1694000.jpeg)
            no-repeat;
        background-size: cover;
        color: #ffffff;
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
