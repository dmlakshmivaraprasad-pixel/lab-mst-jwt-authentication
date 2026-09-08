import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    text: "",
    selectedPlatforms: [],
};

const postSlice = createSlice({
    name: "post",
    initialState,

    reducers: {
        togglePlatform: (state, action) => {
            const platform = action.payload;

            if (state.selectedPlatforms.includes(platform)) {
                state.selectedPlatforms = state.selectedPlatforms.filter(
                    (item) => item !== platform
                );
            } else {
                state.selectedPlatforms.push(platform);
            }
        },

        setPostText: (state, action) => {
            state.text = action.payload;
        },

        clearPost: (state) => {
            state.text = "";
            state.selectedPlatforms = [];
        },
    },
});

export const {
    togglePlatform,
    setPostText,
    clearPost,
} = postSlice.actions;

export default postSlice.reducer;