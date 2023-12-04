
import { createSlice } from '@reduxjs/toolkit';


const initialState = getUser();


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLogin: (state, action) => {
            const { id, nickname } = action.payload;
            console.log(id, nickname);
            state = { ...state, userId: id, nickname };
        },
        userLogout: (state, action) => {
            removeUserInfo();
            state = { userId: '', nickname: '', avartar: null, accessToken: '' };
        },
        userUpdate: (state, action) => {
            const { nickname, avatar } = action.payload;
            console.log(nickname, avatar);
            if (!nickname && !avatar) state = { ...state, nickname, avatar };
            if (nickname && !avatar) state = { ...state, nickname };
            if (!nickname && avatar) state = { ...state, avatar };
        },
    }
});

function getUser() {
    const userId = localStorage.getItem('userId');
    const nickname = localStorage.getItem('nickname');
    const accessToken = localStorage.getItem('accessToken');
    const avatar = localStorage.getItem('avatar');
    const initialState = { userId: '', nickname: '', avartar: null, accessToken: '' }
    return accessToken ? { userId, nickname, accessToken, avatar } : initialState;
}

function removeUserInfo() {
    localStorage.removeItem('userId');
    localStorage.removeItem('nickname');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('avatar');
}

export default authSlice.reducer;
export const { userLogin, userLogout, userUpdate } = authSlice.actions;