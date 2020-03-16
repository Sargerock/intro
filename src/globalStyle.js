import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    * {
        box-sizing: border-box;
    }
    body {
        background-color: #e6ecf0;
    }
    .container {
        max-width: 800px;
        margin: 0 auto;
    }

    button, input, textarea {
        &:focus {
				outline: none;
			}
    }

    button{
        width: fit-content;
        background-color: #98cff9;
        border: 2px solid #98cff9;
        color: #fff;
        font-weight: bolder;
        border-radius: 50px;
        padding: 10px 30px;
        
    }
`;

export default GlobalStyle;
