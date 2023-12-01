import React, { useState } from 'react';
import Button from 'ui/Button';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import userImg from '../asset/user.png'
import { GiLoveLetter } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { __onAddLetter } from '../redux/modules/lettersSlice';
import { letterFilters } from '../redux/modules/filtersSlice';



export default function LetterForm() {
    const filters = letterFilters;
    const dispatch = useDispatch();
    const [form, setForm] = useState(initialState);
    const auth = useSelector((state) => state.auth);
    const userId = auth.userId;
    const nickname = auth.nickname;
    const sendTo = filters.filter(who => who !== 'All');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.content.trim() === '') {
            alert('내용은 필수 입력값입니다.');
            return;
        }
        //입력한 값을 LetterList에 추가
        const newLetter = {
            ...form,
            id: uuidv4(),
            userId,
            nickname,
            avatar: userImg,
            createdAt: new Date(),
        };
        dispatch(__onAddLetter(newLetter));
        setForm(initialState);

    }
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <h1><GiLoveLetter /></h1>
                <NicknameSection>
                    <label htmlFor="nickname">Nickname:</label>
                    <span>{nickname}</span>
                </NicknameSection>
                <Section>
                    <label htmlFor="content">Content:</label>
                    <Textarea id='content' name='content' value={form.content} onChange={handleChange} placeholder='최대 100자까지만 작성 가능합니다.' maxLength={100} />
                </Section>
                <Section>
                    <label htmlFor='who'>TO:</label>
                    <Select id='who' name='writedTo' onChange={handleChange} value={form.writedTo}>
                        {sendTo.map((member, idx) => (
                            <option key={idx}>{member}</option>
                        ))}
                    </Select>
                </Section>
                <Button text="Register" />
            </Form>
        </>
    );
}

const initialState = { content: '', writedTo: '민지' };
const Form = styled.form`
    width:500px;
    height: 350px;
    margin:1rem auto;
    background-color:#b8b8ff;
    border-radius: 1.5rem;
    padding:1.5rem;

    h1{
        font-size:2rem;
    }
`;

const NicknameSection = styled.section`
    display:flex;
    justify-content: flex-start;
    align-items: center;

    span{
        font-size:1.2rem;
        margin-left: 1rem;
    }
`

const Section = styled.section`
    display:flex;
    justify-content: center;
    align-items: center;
    margin:1rem 0;

`;


const Textarea = styled.textarea`
    width:100%;
    height: 7rem;
    font-size: 1.2rem;
    margin-left: 1.2rem;
    padding:1rem 0.5rem;
    resize: none;   
`;

const Select = styled.select`
    width:4rem;
    margin-left:0.5rem;
`;

