import {RelationDto} from "../api/relationApi";
import {create} from "zustand/react";

type PeopleStore = {
    relations: Array<RelationDto>,
    allPeople: Array<RelationDto>,
    setPeople: (relations: RelationDto[]) => void
    setAllPeople: (relations: RelationDto[]) => void
}

export const usePeopleStore = create<PeopleStore>()((set) => ({
    relations: [],
    allPeople: [],
    setPeople: (payload: RelationDto[]) => {
        set((state: PeopleStore) => ({relations: payload}))
    },
    setAllPeople: (payload: RelationDto[]) => {
        set((state: PeopleStore) => ({allPeople: payload}))
    }
}))