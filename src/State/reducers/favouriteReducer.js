const reducer = (state=false, action) => {
    if (action.type === 'setFavourite') {
        return action.payload;
    } else {
        return state;
    }
}

export default reducer;