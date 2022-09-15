import * as types from "./actionTypes"


export const getMusicRequest=()=>{
    return {type:types.GET_MUSIC_REQUEST}
}


export const getMusicSuccess=(payload)=>{
    return {type:types.GET_MUSIC_SUCCESS,payload:payload}
}

export const getMusicFailure=()=>{
    return {type:types.GET_MUSIC_FAILURE}
}

export const addFav=(payload)=>{
    return {type:types.GET_FAV_MUSIC,payload:payload}
}