import { createGlobalStyle } from "styled-components"
import "./theme.css"

export const GlobalStyles = createGlobalStyle`
    ::-webkit-scrollbar {
        display: none;
    }

    html, body {
        height: 100%;
        background-color: var(--dark-aluminum);
        color: var(--white);
    }

    body {
        font-family: var(--font-primary);
        margin: 0;
    }

    main {
        margin: 1rem;
    }

    h1, h4, h5, h6 {
        cursor: default;
    }

    h5 {
        font-family: var(--font-secondary);
        text-transform: capitalize;
        font-size: 1rem;
        font-weight: 700;
    }

    a {
        color: var(--white);
        text-decoration: none;
    }

    hr {
        border: 0;
        clear:both;
        display:block;
        width: 96%;               
        background-color: var(--light-aluminum);
        height: 1px;
    }

    ul {
        list-style-type: none;
        list-style-position: inside;
        padding-inline-start: 0;
        margin-block-start: 0;
        margin-block-end: 0;
    }
`
