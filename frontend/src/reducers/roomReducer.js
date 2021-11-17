import RoomConstants from '../constants/roomConstants' ;

export const roomsReducer = (state = {rooms: []} , action) => {
    switch(action.type) {
        case RoomConstants.ALL_ROOMS_REQUEST :
            return {
                loading: true ,
                rooms: []
            }
        case RoomConstants.ALL_ROOMS_SUCCESS: 
            return {
                loading: false ,
                rooms: action.payload.data 
            }
        case RoomConstants.ALL_ROOMS_FAIL: 
            return {
                loading: false ,
                error: action.payload.error
            }
        case RoomConstants.CLEAR_ERRORS: 
            return {
                ...state,
                error: null 
            }
        default: 
            return state ;
    }
}