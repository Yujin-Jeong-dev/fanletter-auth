import { createSlice } from '@reduxjs/toolkit';

export const letterFilters = ['All', '민지', '하니', '다니엘', '해린', '혜인'];
const initialState = {
    filter: letterFilters[0]
};

//export const filterInitialState = letterFilters[0];
//const FILTER_CHANGE = 'filter/change';

// export const onFilterChange = (payload) => {
//     return {
//         type: FILTER_CHANGE,
//         payload
//     };
// }


// const filter = (state = filterInitialState, action) => {
//     switch (action.type) {
//         case FILTER_CHANGE:
//             return action.payload;
//         default:
//             return state;
//     }
// };

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        onFilterChange: (state, action) => {
            state.filter = action.payload;
        }
    }
});

export default filtersSlice.reducer;
export const { onFilterChange } = filtersSlice.actions;