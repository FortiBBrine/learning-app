import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface PeopleState {
    people: Array<Person>
}

export interface Person {
    id: string;
    name: string;
}

const initialState: PeopleState = {
    people: [
        {
            id: "1",
            name: "Ім'я Прізвище",
        },
        {
            id: "2",
            name: "Ім'я Прізвище2",
        }
    ]
}

export const peopleSlice = createSlice({
    name: "people",
    initialState,
    reducers: {
        setPeople: (state: PeopleState, action: PayloadAction<Person[]>) => {
            state.people = action.payload

        }
    }
})

export const { setPeople } = peopleSlice.actions;
export default peopleSlice.reducer