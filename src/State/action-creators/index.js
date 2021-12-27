export const setLogin = (isLogin) => {
    return (dispatch)=>{
        dispatch({
            type: 'setLogin',
            payload: isLogin
        })
    }
}

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

export const setLike = (isLiked) => {
    return (dispatch) => {
        dispatch({
            type: 'setLike',
            payload: isLiked
        })
    }
}

export const setFavourite = (isFavourite) => {
    return (dispatch) => {
        dispatch({
            type: 'setFavourite',
            payload: isFavourite
        })
    }
}

export const setWatchLater = (isWatchLater) => {
    return (dispatch) => {
        dispatch({
            type: 'setWatchLater',
            payload: isWatchLater
        })
    }
}