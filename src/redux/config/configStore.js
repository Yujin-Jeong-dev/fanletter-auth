import letters from '../modules/lettersSlice';
import filters from '../modules/filtersSlice'
import { configureStore } from '@reduxjs/toolkit';


const store = configureStore({
    reducer: {
        letters,
        filters,
    }
})

export default store;


