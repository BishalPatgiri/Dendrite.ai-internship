import * as types from "./actionTypes"

const initData={
    isLoading:false,
    isError:false,
    musics:[],
    favMusic:[]
}

export const reducer=(state=initData,action)=>{
    const {type,payload}=action
    switch(type){
        case types.GET_MUSIC_REQUEST:return {...state,isLoading:true}
        case types.GET_MUSIC_SUCCESS:return {...state,isLoading:false,musics:payload}
        case types.GET_MUSIC_FAILURE:return {...state,isError:true}
        case types.GET_FAV_MUSIC:return {...state,favMusic:[...state.favMusic,payload]}
        
        default : return state
    }

}