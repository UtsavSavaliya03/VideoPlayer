const reducer = (state='', action) => {
    if (action.type === 'setUserChannel') {
        return action.payload;
    } else {
        return state;
    }
}

export default reducer;