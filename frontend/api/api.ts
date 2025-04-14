import axios from "axios";
import { useAuthStore } from "../store/authStore";

export const api = axios.create({
    baseURL: "https://learning-app-1ll5.onrender.com/api/v1",
})

api.interceptors.request.use((request) => {

    const token = useAuthStore.getState().token;

    if (token !== null) {
        request.headers["Authorization"] = "Bearer " + token;
    }

    return request;
})

api.interceptors.response.use(async (response) => {
    if (response.statusText === "Unauthorized") {
        await useAuthStore.getState().setToken(null);
    }

    return response;
}/*, async (error) => {
    if (axios.isAxiosError(error)) {
        if (error.response !== undefined) {
            console.error(error.response.status + " " + JSON.stringify(error.response.data));
        }
        if (error.response !== undefined && error.response.status === 401) {
            await useAuthStore.getState().setToken(null);
        }
    }
}*/)
