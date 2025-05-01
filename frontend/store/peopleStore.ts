import {UserDto} from "../api/relationApi";
import {create} from "zustand/react";

type PeopleStore = {
    relations: Array<UserDto>,
    suggestions: Array<UserDto>,
    setRelations: (relations: UserDto[]) => void
    setSuggestions: (relations: UserDto[]) => void
}

export const usePeopleStore = create<PeopleStore>()((set) => ({
    relations: [],
    suggestions: [],
    setRelations: (payload: UserDto[]) => {
        set((state: PeopleStore) => ({relations: payload}))
    },
    setSuggestions: (payload: UserDto[]) => {
        set((state: PeopleStore) => ({suggestions: payload}))
    }
}));
