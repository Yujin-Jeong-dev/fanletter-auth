import React from 'react';
import image from '../asset/newjeans.jpg'
import styled from 'styled-components';

const Background = styled.div`
    width:100%;
    height:35%;
    background:url(${image}) no-repeat center;
    background-size: cover;
    margin-bottom: 0.5rem;
`;





export default function Banner() {
    return (
        <>
            <Background />
        </>
    );
}

