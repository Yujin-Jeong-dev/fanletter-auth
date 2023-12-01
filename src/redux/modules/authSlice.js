
import { createSlice } from '@reduxjs/toolkit';
import userImg from '../../asset/user.png';

const initialState = getUser();


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLogin: (state, action) => {
            const { id, nickname } = action.payload;
            state = { ...state, userId: id, nickname };
        }
    }
});

function getUser() {
    const userId = localStorage.getItem('userId');
    const nickname = localStorage.getItem('nickname');
    const accessToken = localStorage.getItem('accessToken');
    const initialState = { userId: '', nickname: '', avartar: userImg, accessToken: '' }
    return accessToken ? { userId, nickname, accessToken, avatar: userImg } : initialState;
}

export default authSlice.reducer;
export const { userLogin } = authSlice.actions;