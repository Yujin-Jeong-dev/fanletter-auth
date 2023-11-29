import fakeLetter from '../../letters/fakeData.json';
import { createSlice } from '@reduxjs/toolkit';
// const ADD_LETTER = 'letter/add';
// const DELETE_LETTER = 'letter/delete';
// const UPDATE_LETTER = 'letter/update';

const initialState = getLetters();
let letters;

// export const onAddLetter = (payload) => {
//     return {
//         type: ADD_LETTER,
//         payload
//     };
// }

// export const onDeleteLetter = (payload) => {
//     return {
//         type: DELETE_LETTER,
//         payload
//     };
// }

// export const onUpdateLetter = (payload) => {
//     return {
//         type: UPDATE_LETTER,
//         payload
//     };
// }

export const filterLetters = (letters, filter) => {
    if (filter === 'All') return letters;
    return letters.filter(letter => letter.writedTo === filter);
}



// const letter = (state = letters, action) => {
//     switch (action.type) {
//         case ADD_LETTER:
//             letters = [...state, action.payload];
//             saveLetters();
//             return letters;
//         case DELETE_LETTER:
//             letters = state.filter(letter => letter.id !== action.payload);
//             saveLetters();
//             return letters;
//         case UPDATE_LETTER:
//             letters = state.map(letter => letter.id === action.payload.id ? action.payload : letter);
//             saveLetters();
//             return letters;
//         default:
//             return state;
//     }
// };

const lettersSlice = createSlice({
    name: 'letters',
    initialState,
    reducers: {
        onAddLetter: (state, action) => {
            letters = [...state, action.payload]
            saveLetters();
            return letters;
        },
        onDeleteLetter: (state, action) => {
            letters = state.filter(letter => letter.id !== action.payload);
            saveLetters();
            return letters;
        },
        onUpdateLetter: (state, action) => {
            const { id } = action.payload;
            letters = state.map(letter => letter.id === id ? action.payload : letter);
            saveLetters();
            return letters;
        }

    }
})

function getLetters() {
    const letters = localStorage.getItem('letters');
    return letters ? JSON.parse(letters) : fakeLetter
}

function saveLetters() {
    localStorage.setItem('letters', JSON.stringify(letters))
}

export default lettersSlice.reducer;
export const { onAddLetter, onDeleteLetter, onUpdateLetter } = lettersSlice.actions;
