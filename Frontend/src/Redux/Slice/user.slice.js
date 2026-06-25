import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user : null,
    loading: true
}

const userSlice = createSlice({
    name : "User",
    initialState,
    reducers: {
        setUser : (state, action)=>{
            state.user = action.payload
        },
        setLoading : (state, action)=>{
            state.loading = action.payload
        }
    }
})

export const {setUser, setLoading} = userSlice.actions
export default userSlice.reducer;