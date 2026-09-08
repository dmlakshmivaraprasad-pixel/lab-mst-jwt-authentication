import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [
        {
            id: 1,
            title: "React",
            description: "Learn React Basics",
            category: "React",
        },
        {
            id: 2,
            title: "Redux Toolkit",
            description: "Learn Global State Management",
            category: "Redux",
        },
    ],
};

const postSlice = createSlice({
    name: "posts",

    initialState,

    reducers: {
        addPost: (state, action) => {
            state.posts.push(action.payload);
        },

        deletePost: (state, action) => {
            state.posts = state.posts.filter(
                (post) => post.id !== action.payload
            );
        },
    },
});

export const { addPost, deletePost } = postSlice.actions;

export default postSlice.reducer;