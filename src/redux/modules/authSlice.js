
import { createSlice } from '@reduxjs/toolkit';

const initialState = getUser();

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLogin: (state, action) => {
            const { id, nickname } = action.payload;
            state = { id, nickname };
        }
    }
});

function getUser() {
    const id = localStorage.getItem('userId');
    const nickname = localStorage.getItem('nickname');
    return id && nickname ? { id, nickname } : { id: '', nickname: '' };
}

export default authSlice.reducer;
export const { userLogin } = authSlice.actions;