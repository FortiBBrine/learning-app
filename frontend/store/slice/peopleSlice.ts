import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RelationDto} from "../../api/relationApi";

interface PeopleState {
    relations: Array<RelationDto>,
    allPeople: Array<RelationDto>
}

const initialState: PeopleState = {
    relations: [],
    allPeople: []
}

export const peopleSlice = createSlice({
    name: "people",
    initialState,
    reducers: {
        setPeople: (state: PeopleState, action: PayloadAction<RelationDto[]>) => {
            state.relations = action.payload
        },
        setAllPeople: (state: PeopleState, action: PayloadAction<RelationDto[]>) => {
            state.allPeople = action.payload
        }
    }
})

export const { setPeople } = peopleSlice.actions;
export default peopleSlice.reducer