import React, { useState } from 'react';
import styled from 'styled-components';
import userImg from '../asset/user.png';
import { useSelector } from 'react-redux';
import Button from 'ui/Button';

export default function Profile() {
    const [editable, setEditable] = useState(false);
    const [file, setFile] = useState();
    const [text, setText] = useState('');
    const { userId, nickname, avatar } = useSelector(state => state.auth);
    const [updateText, setUpdateText] = useState(nickname);



    const updateProfile = () => {

        if (window.confirm('수정하시겠습니까?')) {
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                //axios로 프로필 사진 변경\ 요청
            }
            if (text) setUpdateText(text);
            setEditable(false);
        }


    }



    const handleChange = (e) => {
        setText(e.target.value);
    }
    return (
        <ProfileLayout>
            <label htmlFor='userImg'>
                {file ? (<img src={URL.createObjectURL(file)} alt='avatar' />) : (<img src={avatar ? avatar : userImg} alt='avatar' />)}
                {editable && <FileInput type='file' id='userImg' accept='image/*' onChange={(e) => setFile(e.target.files[0])} />}
            </label>
            {editable ? (<NicknameInput type='text' defaultValue={updateText} maxLength={10} onChange={handleChange} />) : (<p>{updateText}</p>)}
            <p>{userId}</p>
            {editable ? (<Button text="수정완료" onClick={updateProfile} disabled={(file || text) ? false : true} />) : (<Button text="수정" onClick={() => setEditable(true)} />)}
            {editable && (<Button text="취소" onClick={() => setEditable(false)} />)}
        </ProfileLayout>
    );
}

const ProfileLayout = styled.div`
            display:flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap:0.5rem;
            width:40%;
            height:40%;
            margin:10rem auto;
            padding: 2rem;
            border-radius: 1rem;
            background-color: #b8c0ff;

            img{
                width:5rem;
            height:5rem;
            border-radius: 50%;
    }


            `;

const FileInput = styled.input`
            display:none;
            `

const NicknameInput = styled.input`
            font-size:1.2rem;
            padding:0.3rem 0.5rem;
            `



const InfoBox = styled.div`
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding:1rem;
            gap:1rem;
            `

