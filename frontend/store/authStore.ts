import {create} from "zustand/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthStore = {
    token: string | null;
    setToken: (token: string | null) => Promise<void>;
}

export const useAuthStore = create<AuthStore>()((set) => ({
    token: null,
    setToken: async (token: string | null) => {

        if (token == null) {
            await AsyncStorage.removeItem("token");
        } else {
            await AsyncStorage.setItem("token", token)
        }

        set((state: AuthStore) => ({token: token}));
    }
}))
