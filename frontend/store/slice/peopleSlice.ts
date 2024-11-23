import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RelationDto} from "../../api/relationApi";

interface PeopleState {
    people: Array<RelationDto>
}

const initialState: PeopleState = {
    people: []
}

export const peopleSlice = createSlice({
    name: "people",
    initialState,
    reducers: {
        setPeople: (state: PeopleState, action: PayloadAction<RelationDto[]>) => {
            state.people = action.payload
        }
    }
})

export const { setPeople } = peopleSlice.actions;
export default peopleSlice.reducer