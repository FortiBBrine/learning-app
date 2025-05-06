import {UserDto} from "../api/relationApi";
import {create} from "zustand/react";

type PeopleStore = {
    relations: Array<UserDto>
    suggestions: Array<UserDto>
    profile: UserDto | null;
    setRelations: (relations: UserDto[]) => void
    setSuggestions: (relations: UserDto[]) => void
    setProfile: (user: UserDto) => void
}

export const usePeopleStore = create<PeopleStore>()((set) => ({
    relations: [],
    suggestions: [],
    profile: null,
    setRelations: (payload: UserDto[]) => {
        set((state: PeopleStore) => ({relations: payload}))
    },
    setSuggestions: (payload: UserDto[]) => {
        set((state: PeopleStore) => ({suggestions: payload}))
    },
    setProfile: (user: UserDto) => {
        set({profile: user});
    }
}));
