import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        isLoading: false,
        authChecked: false
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setAuthChecked: (state, action) => {
            state.authChecked = action.payload
        }
    }
});

export const {setUser, setLoading, setAuthChecked} = userSlice.actions;
export default userSlice.reducer;