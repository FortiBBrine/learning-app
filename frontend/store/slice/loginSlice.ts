import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface LoginState {
    token: string | null;
}

const initialState: LoginState = {
    token: null,
}

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setToken: (state: LoginState, action: PayloadAction<string | null>) => {
            state.token = action.payload

            // if (state.token != null) {
            //     AsyncStorage
            //         .setItem("token", state.token)
            //         .then()
            // } else {
            //     AsyncStorage
            //         .removeItem("token")
            //         .then()
            // }
        }
    }
})

export const { setToken } = loginSlice.actions
export default loginSlice.reducer