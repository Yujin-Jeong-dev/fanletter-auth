import React, { useEffect } from 'react';
import styled from 'styled-components';
import Letter from './Letter';
import LetterForm from './LetterForm';
import { useSelector, useDispatch } from 'react-redux';
import { __getLetters, filterLetters } from '../redux/modules/lettersSlice';


export default function LetterList() {
    const { isLoading, error, letters } = useSelector((state) => state.letters);
    const filter = useSelector((state) => state.filters.filter);
    const filtered = filterLetters(letters, filter);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(__getLetters());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    console.log(letters, filtered)
    return (
        <>
            <LetterForm />
            {!filtered.length && <p>{filter === 'All' ? '모두' : filter}에게 남긴 편지가 없습니다. 편지를 작성해주세요! ✏️</p>}
            {letters.length > 0 &&
                < StyleLetter >
                    {filtered.length > 0 && <Letter />}
                </StyleLetter >
            }
        </>
    );
}

const StyleLetter = styled.ul`
    width:500px;
    display:flex;
    flex-direction: column;
    margin:auto;
    padding:1.5rem;
    gap:1.5rem;
    border-radius: 1rem;
    cursor:pointer;
`;



