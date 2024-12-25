import axios from "axios";
import {store, useAppDispatch} from "../store/store";
import {setToken} from "../store/slice/loginSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const api = axios.create({
    baseURL: "https://learning-app-1ll5.onrender.com/api",
})

api.interceptors.request.use((request) => {
    const token = store.getState().login.token;

    if (token !== null) {
        request.headers["Authorization"] = "Bearer " + token;
    }

    return request;
})

api.interceptors.response.use((response) => {
    if (response.statusText === "Unauthorized") {
        store.dispatch(setToken(null));

        AsyncStorage.removeItem("token").then()
    }

    return response;
}, (error) => {
    if (axios.isAxiosError(error)) {
        if (error.response !== undefined && error.response.status === 401) {
            store.dispatch(setToken(null));

            AsyncStorage.removeItem("token").then()
        }
        console.log(error.toJSON());
    }
})
