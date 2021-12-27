const reducer = (state=false, action) => {
    if (action.type === 'setLike') {
        return action.payload;
    } else {
        return state;
    }
}

export default reducer;