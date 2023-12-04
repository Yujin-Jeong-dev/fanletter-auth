const { createGlobalStyle } = require("styled-components");
import reset from 'styled-reset';


const Globalstyle = createGlobalStyle`
    ${reset}
    
    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
    }
    html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
    a, dl, dt, dd, ol, ul, li, form, label, table{
        margin: 0;
        padding: 0;
        border: 0;
        font-size:16px;
        vertical-align: baseline;
    }
    body{
        line-height: 1;
        width:100vw;
        height: 100vh;
        font-family: 'Noto Sans KR', sans-serif;
        text-align: center;
        color:white;
        background: linear-gradient(to right, #9796f0, #fbc7d4); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        margin-bottom: 100px;
    }

    ol, ul{
        list-style: none;
    }
    input,textarea{
        border: none;
        outline: none;
    }
    button {
        border: none;
        outline:none;
        cursor: pointer;
    }
`;

export default Globalstyle;
