import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    * {
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
    }
    body {
        background-color: #e6ecf0;
    }

    button, input, textarea {
        &:focus {
				outline: none;
			}
    }
`;

export default GlobalStyle;
