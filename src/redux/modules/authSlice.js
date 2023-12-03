
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
        }
    }
});

function getUser() {
    const userId = localStorage.getItem('userId');
    const nickname = localStorage.getItem('nickname');
    const accessToken = localStorage.getItem('accessToken');
    const initialState = { userId: '', nickname: '', avartar: null, accessToken: '' }
    return accessToken ? { userId, nickname, accessToken, avatar: null } : initialState;
}

function removeUserInfo() {
    localStorage.removeItem('userId');
    localStorage.removeItem('nickname');
    localStorage.removeItem('accessToken');
}

export default authSlice.reducer;
export const { userLogin, userLogout } = authSlice.actions;