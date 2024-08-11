import {configureStore} from '@reduxjs/toolkit';
import reducer from './authSlice';


export default store = configureStore({
    reducer,
})