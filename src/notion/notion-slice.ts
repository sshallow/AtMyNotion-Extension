import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {SpaceInfo, UserInfo, UserPreferences} from "~notion/notion-model";

export interface NotionState {
    preferences: UserPreferences;
    user: UserInfo;
    spaces: SpaceInfo[];
}

export const initialState: NotionState = {
    preferences: null,
    user: null,
    spaces: [],
};

const notionSlice = createSlice({
    name: "notion",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserInfo>) => {
            state.user = action.payload;
        },
        setSpaces: (state, action: PayloadAction<SpaceInfo[]>) => {
            state.spaces = action.payload;
        },
        setPreferences: (state, action: PayloadAction<UserPreferences>) => {
            state.preferences = action.payload;
        }
    },
});

export const {
    setUser,
    setSpaces,
    setPreferences
} = notionSlice.actions;

export default notionSlice.reducer;
