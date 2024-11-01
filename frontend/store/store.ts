import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector, useStore} from "react-redux";
import {peopleSlice} from "./slice/peopleSlice";
import {loginSlice} from "./slice/loginSlice";

export const store = configureStore({
    reducer: {
        people: peopleSlice.reducer,
        login: loginSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore: () => AppStore = useStore
