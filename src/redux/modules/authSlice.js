
import { createSlice } from '@reduxjs/toolkit';

const initialState = getUser();

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const { id, nickname } = action.payload;
            localStorage.setItem('id', id);
            localStorage.setItem('nickname', nickname);
            state = { id, nickname };
        }
    }
});

function getUser() {
    const id = localStorage.getItem('id');
    const nickname = localStorage.getItem('nickname');
    return id && nickname ? { id, nickname } : { id: '', nickname: '' };
}

export default authSlice.reducer;
export const { login } = authSlice.actions;