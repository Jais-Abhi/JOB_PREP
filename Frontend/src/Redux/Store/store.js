import {configureStore} from "@reduxjs/toolkit"
import userReducers from "../Slice/user.slice.js"


export const store = configureStore({
    reducer : {
        user : userReducers
    }
})