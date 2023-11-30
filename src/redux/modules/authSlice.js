
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loginState: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.loginState = true;
        }
    }
});

export default authSlice.reducer;
export const { login } = authSlice.actions;