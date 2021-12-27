const reducer = (state=false, action) => {
    if (action.type === 'setWatchLater') {
        return action.payload;
    } else {
        return state;
    }
}

export default reducer;