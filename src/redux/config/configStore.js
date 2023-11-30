import letters from '../modules/lettersSlice';
import filters from '../modules/filtersSlice'
import { configureStore } from '@reduxjs/toolkit';
import auth from './../modules/authSlice';


const store = configureStore({
    reducer: {
        letters,
        filters,
        auth
    }
})

export default store;


