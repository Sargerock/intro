import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    * {
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        color: #292929;
    }

    body {
        background-color: #e6ecf0;
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
    }
`;

export default GlobalStyle;
