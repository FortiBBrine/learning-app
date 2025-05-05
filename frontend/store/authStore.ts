import {create} from "zustand/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {logout} from "../api/loginApi";

type AuthStore = {
    accessToken: string | null;
    refreshToken: string | null;
    isAuth: () => boolean;
    setAccessToken: (token: string | null) => Promise<void>;
    setRefreshToken: (token: string | null) => Promise<void>;
    initializeAuthState: () => Promise<void>;
    logout: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
    accessToken: null,
    refreshToken: null,

    isAuth: () => !!get().accessToken,

    initializeAuthState: async () => {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        set({ accessToken, refreshToken });
    },

    setAccessToken: async (token) => {
        if (token === null) {
            await AsyncStorage.removeItem("accessToken");
        } else {
            await AsyncStorage.setItem("accessToken", token);
        }
        set({ accessToken: token });
    },
    setRefreshToken: async (token) => {
        if (token === null) {
            await AsyncStorage.removeItem("refreshToken");
        } else {
            await AsyncStorage.setItem("refreshToken", token);
        }
        set({ refreshToken: token });
    },

    logout: async () => {
        const refreshToken = get().refreshToken;

        set({accessToken: null, refreshToken: null});

        if (!!refreshToken) {
            await logout(refreshToken);
        }
    }

}));