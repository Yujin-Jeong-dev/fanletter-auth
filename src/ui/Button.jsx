import React from 'react';
import styled from 'styled-components';


const StyleButton = styled.button`
    width:6rem;
    height:2rem;
    font-size: 1.2rem;
    color:white;
    padding:0.3rem;
    background-color: #83bcff;
    
     &:hover{
        transform:scale(1.1);
     }

     &:disabled{
        background-color: #bcb8b1;
     }
`;

export default function Button({ text, onClick, disabled }) {

    return (
        <StyleButton onClick={onClick} disabled={disabled}>{text}</StyleButton>
    );
}

