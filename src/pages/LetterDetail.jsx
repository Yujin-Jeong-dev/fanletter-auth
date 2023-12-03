import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from 'ui/Button';
import { SlEnvolopeLetter } from 'react-icons/sl'
import { useDispatch, useSelector } from 'react-redux';
import { __onDeleteLetter, __onUpdateLetter } from '../redux/modules/lettersSlice';



export default function LetterDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const userNickname = useSelector(state => state.auth).nickname;
    let { id, avatar, content, createdAt, nickname, writedTo } = location.state.letter;
    const [editable, setEditable] = useState(false);
    const [text, setText] = useState('');
    const [updateText, setUpdateText] = useState(content);



    const editLetter = (e) => {
        setEditable(true);
        setText(e.target.value);
    }

    const updateLetter = () => {
        //text가 공백인 경우 : 기존에 있는 content 값을 다 지우거나 수정을 안한 경우 
        if (text === updateText || text === '') {
            alert('수정된 사항이 없거나 1자 이상 입력하지 않는 경우 수정되지 않아요!');
            return;
        }
        if (window.confirm('수정하시겠습니까?')) {
            setEditable(false);
            setUpdateText(text);
            //수정한 text가 담긴 편지 정보 데이터를 전달함
            const updateLetter = { id, avatar, content: text, createdAt, nickname, writedTo };
            if (!localStorage.getItem('accessToken')) return;
            dispatch(__onUpdateLetter(updateLetter));
            navigate('/');

        }
    }
    const deleteLetter = () => {
        if (window.confirm('정말로 삭제하시겠습니까?')) {
            if (!localStorage.getItem('accessToken')) return;
            dispatch(__onDeleteLetter(id));
            alert('해당 편지가 삭제되었습니다');
            navigate('/');
        }

    }
    return (
        <>
            <Detail>
                <header>
                    <Avatar>
                        <img src={avatar} alt='avatar' />
                        <span>{nickname}</span>
                    </Avatar>
                    <time>{new Date(createdAt).toLocaleString()}</time>
                </header>

                <WriteTo><SlEnvolopeLetter /> TO. {writedTo}</WriteTo>
                {editable ? (<Content as="textarea" defaultValue={updateText} onChange={editLetter} />) : (<Content>{updateText}</Content>)}
                {userNickname === nickname &&
                    <Buttons>
                        {/* 수정이 가능하게 되면 수정완료 버튼과 취소 버튼으로 변경.  */}
                        {editable ? (<Button text="수정완료" onClick={updateLetter} />) : (<Button text="수정" onClick={editLetter} />)}
                        {editable ? (<Button text="취소" onClick={() => setEditable(false)} />) : (<Button text="삭제" onClick={deleteLetter} />)}
                    </Buttons>}
            </Detail>
        </>

    );
}


const Detail = styled.div`
    width:800px;
    min-height: 400px;
    margin:2rem auto;
    padding:2rem;
    background-color: #b8b8ff;
    border-radius: 1rem;
    
    header{
        display:flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
    }

    img{
        width:5rem;
        height:5rem;
        border-radius:50%;
        margin-right:0.5rem;
    }
    span{
        font-size:2rem;
        font-weight: bold;
    }

    p{
        font-size: 1.5rem;
    }
    textarea{
        resize:none;
    }
 
`;

const Avatar = styled.div`
    display:flex;
    align-items: center;
`;

const WriteTo = styled.p`
    height:3rem;
    color: rgb(82 82 91);
    padding-top:1rem;
    background-color:#ffeedd;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
`;
const Content = styled.p`
    width:100%;
    height:200px;
    font-size:1.5rem;
    text-align: start;
    background-color:pink;
    padding:1rem 1.5rem;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius:1rem;
    margin-bottom: 1rem;
`;


const Buttons = styled.div`
    display: flex;
    justify-content: flex-end;
    gap:1rem;
`;

