import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id : "",
    userName: "",
    email: "",
    isAuth: false,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserLoginDetails: (state, action) => {
            state._id = action.payload.user._id;
            state.userName = action.payload.user.userName;
            state.email = action.payload.user.email;
            state.isAuth = action.payload.auth;
        },
        setSignOutState: (state) => {
            state._id = "";
            state.userName = "";
            state.email = "";
            state.isAuth = false;
        }
    }});    
    export const { setUserLoginDetails, setSignOutState } = userSlice.actions;
    export default userSlice.reducer;
