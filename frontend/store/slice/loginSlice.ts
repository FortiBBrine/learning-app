import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface LoginState {
    isLoggedIn: boolean;
}

const initialState: LoginState = {
    isLoggedIn: false,
}

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setLoggedIn: (state: LoginState, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
        }
    }
})

export const { setLoggedIn } = loginSlice.actions
export default loginSlice.reducer