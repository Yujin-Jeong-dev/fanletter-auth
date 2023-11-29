import Members from 'components/Members';
import React from 'react';
import styled from 'styled-components';
import LetterList from 'components/LetterList';


export default function Home() {
    return (
        <>
            <FlexUl>
                <Members />
            </FlexUl>
            <LetterList />
        </>
    );
}

const FlexUl = styled.ul`
    display:flex;
    justify-content: center;
    gap:1rem;
    margin-top:1.5rem;
`;
