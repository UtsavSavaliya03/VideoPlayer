// export const setLogin = (isLogin) => {
//     return (dispatch)=>{
//         dispatch({
//             type: 'setLogin',
//             payload: isLogin
//         })
//     }
// }

export const setUser = (user) => {
    return (dispatch) => {
        dispatch({
            type: 'setUser',
            payload: user
        })
    }
}

export const setUserChannel = (userChannel) => {
    return (dispatch) => {
        dispatch({
            type: 'setUserChannel',
            payload: userChannel
        })
    }
}