import { createSlice } from "@reduxjs/toolkit";
import { Conference, mockConference } from "../Conference";

const temp = [];
for (let i = 0; i < 10; i++) {
	temp.push({ ...mockConference, id: i });
}

export interface ConferencesState {
	conferences: Conference[];
}

const initialState: ConferencesState = {
	conferences: temp,
};

const conferencesSlice = createSlice({
	name: "conferences",
	initialState,
	reducers: {},
});

export const conferencesReducer = conferencesSlice.reducer;
export const conferencesAction = conferencesSlice.actions;
