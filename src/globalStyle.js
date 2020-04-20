import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    * {
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
    }

    body {
        margin: 0;
    }

    button, input, textarea {
        &:focus {
				outline: none;
			}
    }

    input[type="checkbox"]:hover {
        cursor: pointer;
    }

    a {
        text-decoration: none;
        color: #000;
    }
`;

export default GlobalStyle;
