import React, { useState } from 'react';
import styled from 'styled-components';
import userImg from '../asset/user.png';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'ui/Button';
import api from '../axios/api';
import { userUpdate } from '../redux/modules/authSlice';
//import { __user__onUpdateLetter } from '../redux/modules/lettersSlice';

export default function Profile() {
    const dispatch = useDispatch();
    const [editable, setEditable] = useState(false);
    const [text, setText] = useState('');
    const { userId, nickname, avatar } = useSelector(state => state.auth);
    const [file, setFile] = useState();
    const [updateText, setUpdateText] = useState(nickname);


    const updateProfile = async () => {
        if (window.confirm('수정하시겠습니까?')) {
            const formData = new FormData();
            formData.append('file', file);
            let updateInfo = { nickname: text, avatar: file };
            if (!text) updateInfo = { nickname: text };
            if (!file) updateInfo = { avatar: file };


            try {
                //api로 수정된 부분만 변경 요청
                await api.patch('/profile', updateInfo, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                dispatch(userUpdate(updateInfo));
                // dispatch(__user__onUpdateLetter({ ...updateInfo, userId }))
                if (text) setUpdateText(text);
            }
            catch (error) {
                console.log(error);
            }
        }
        setEditable(false);


    }


    const handleChange = (e) => {
        setText(e.target.value);
    }


    return (
        <ProfileLayout>
            <label htmlFor='userImg'>
                {file && <img src={URL.createObjectURL(file)} alt='avatar' />}
                {!file && <img src={avatar ? avatar : userImg} alt='avatar' />}
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



// const InfoBox = styled.div`
//             display: flex;
//             flex-direction: column;
//             justify-content: center;
//             padding:1rem;
//             gap:1rem;
//  `

