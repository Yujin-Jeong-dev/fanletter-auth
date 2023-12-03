import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import letterApi from '../../axios/letterApi';



const initialState = {
    letters: [],
    isLoading: false,
    isError: false,
    error: null,
};


export const __getLetters = createAsyncThunk(
    'getLetters',
    async (payload, thunkAPI) => {
        try {
            const response = await letterApi.get(`${process.env.REACT_APP_LETTER_SERVER_URL}/letters?_sort=createdAt&_order=desc`);
            return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


export const __onAddLetter = createAsyncThunk(
    "ADD_LETTER",
    async (payload, thunkAPI) => {
        try {
            const response = await letterApi.patch(`${process.env.REACT_APP_LETTER_SERVER_URL}/letters`, payload);
            return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const __onUpdateLetter = createAsyncThunk(
    "UPDATE_LETTER",
    async (payload, thunkAPI) => {
        try {
            const { id } = payload;
            const response = await letterApi.patch(`${process.env.REACT_APP_LETTER_SERVER_URL}/letters/${id}`, payload);
            return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const __onDeleteLetter = createAsyncThunk(
    "DELETE_LETTER",
    async (payload, thunkAPI) => {
        try {
            const response = await letterApi.delete(`${process.env.REACT_APP_LETTER_SERVER_URL}/letters/${payload}`);
            return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);





const lettersSlice = createSlice({
    name: 'letters',
    initialState,
    extraReducers: {
        [__getLetters.pending]: (state, action) => {
            state.isLoading = true;
            state.isError = false;
        },
        [__getLetters.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.letters = action.payload;
        },
        [__getLetters.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload;
        },
        [__onAddLetter.fulfilled]: (state, action) => {
            state.letters.push(action.payload);
        },
        [__onUpdateLetter.fulfilled]: (state, action) => {
            state.letters.map(letter => letter.id === action.payload.id ? action.payload : letter);
        },
        [__onDeleteLetter.fulfilled]: (state, action) => {
            state.letters.filter(letter => letter.id !== action.payload.id);
        }
    }
})



export const filterLetters = (letters, filter) => {
    if (filter === 'All') return letters;
    return letters.filter(letter => letter.writedTo === filter);
}

export default lettersSlice.reducer;

