export const selectPosts = (state) => {
    return state.posts.posts;
};

export const selectTotalPosts = (state) => {
    return state.posts.posts.length;
};

export const selectReactPosts = (state) => {
    return state.posts.posts.filter(
        (post) => post.category === "React"
    );
};