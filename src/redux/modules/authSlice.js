
import { createSlice } from '@reduxjs/toolkit';
import userImg from '../../asset/user.png';

const initialState = getUser();


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLogin: (state, action) => {
            const { id, nickname } = action.payload;
            state = { ...state, id, nickname };
        }
    }
});

function getUser() {
    const id = localStorage.getItem('userId');
    const nickname = localStorage.getItem('nickname');
    const accessToken = localStorage.getItem('accessToken');
    const initialState = { id: '', nickname: '', avartar: userImg, accessToken: '' }
    return accessToken ? { id, nickname, accessToken, avatar: userImg } : initialState;
}

export default authSlice.reducer;
export const { userLogin } = authSlice.actions;