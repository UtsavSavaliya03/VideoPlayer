const reducer = (state='', action) => {
    if (action.type === 'setLogin') {
        return action.payload;
    } else {
        return state;
    }
}

export default reducer;