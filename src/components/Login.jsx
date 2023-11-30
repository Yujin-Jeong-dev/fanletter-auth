import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userLogin } from '../redux/modules/authSlice';
import styled from 'styled-components';
import Button from 'ui/Button';
import { useNavigate } from 'react-router-dom';
import api from '../axios/api';

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const initialState = isLogin ? { id: '', password: '' } : { nickname: '', id: '', password: '' };
    const [form, setForm] = useState(initialState);

    //회원가입 버튼 클릭 시 로그인 화면 보여주기
    const showLogin = async () => {
        try {
            //회원가입 성공 시 회원가입 완료 메세지 나옴
            await api.post('/register', form);
        }
        catch (error) {
            //동일한 유저 id가 있고 알려줌. 
            console.log(error);
        }
        setIsLogin(true);
        setForm({ ...form, id: '', password: '' });

    }
    //입력값이 하나라도 공백이 있으면 false, 그렇지 않다면 true 
    const buttonActive = Object.values(form).includes('') ? true : false;
    const login = async () => {
        try {
            await api.post('/login', { id: form.id, password: form.password });
            // const { nickname, accessToken } = data;
            // localStorage.setItem('nickname', nickname);
            // localStorage.setItem('accessToken', accessToken);
        }
        catch (error) {
            console.log(error);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isLogin) {
            showLogin();
            return;
        }
        dispatch(userLogin(form));
        login();
        navigate('/');
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }
    return (
        <>
            <LoginForm onSubmit={handleSubmit}>
                {isLogin ? (<h1>Login</h1>) : (<h1>Sign Up</h1>)}
                {!isLogin && <input type='text' name='nickname' value={form.nickname || ''} onChange={handleChange} minLength={1} maxLength={10} placeholder='닉네임(1~10글자)' />}
                <input type='text' name='id' value={form.id || ''} onChange={handleChange} minLength={4} maxLength={10} placeholder='아이디(4-10글자)' />
                <input type='password' name='password' value={form.password || ''} onChange={handleChange} minLength={4} maxLength={15} placeholder='비밀번호(4-15글자)' />
                <div>
                    {isLogin && <Button type='submit' text='로그인' disabled={buttonActive} />}
                    {!isLogin && <Button type='submit' text='회원가입' disabled={buttonActive} />}
                </div>
                <ToggleMode>
                    <span onClick={() => setIsLogin(mode => !mode)}>{isLogin ? '회원가입' : '로그인'}</span>
                </ToggleMode>
            </LoginForm>
        </>
    );
}




const LoginForm = styled.form`
    width:500px;
    height: 350px;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin:2.5rem auto;
    background-color: #b8b8ff;
    border-radius: 1rem;

    h1{
        font-size: 2rem;
        padding: 1rem;
    }

    input{
        width:80%;
        text-align: center;
        background-color: transparent;
        margin-bottom: 1.5rem;
        border-bottom: 1px solid gray;
        padding:0.5rem 0;
    }

    button{
        width:8rem;
    }  
`;

const ToggleMode = styled.div`
    margin-top:1rem;

`;

