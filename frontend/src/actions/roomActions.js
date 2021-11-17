import axios from 'axios' ;

import RoomConstants from '../constants/roomConstants' ;

export const getAllRooms = () => async (dispatch) => {
    try{

        dispatch({
            type: RoomConstants.ALL_ROOMS_REQUEST
        }) ;


        const {data} = await axios.get('http://localhost:4000/api/v1/room') ;
        console.log(data) ;
        dispatch({
            type: RoomConstants.ALL_ROOMS_SUCCESS ,
            payload: data
        })
    }catch(error) {
        dispatch({
            type: RoomConstants.ALL_ROOMS_FAIL ,
            payload: error
        })
    }
}