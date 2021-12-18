const reducer = (state='', action) => {
    if (action.type === 'setCurrentVd') {
        return action.payload;
    } else {
        return state;
    }
}

export default reducer;