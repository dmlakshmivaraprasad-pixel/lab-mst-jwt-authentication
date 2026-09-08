export const selectPostText = (state) => state.post.text;

export const selectSelectedPlatforms = (state) =>
    state.post.selectedPlatforms;

export const selectCharacterCount = (state) =>
    state.post.text.length;