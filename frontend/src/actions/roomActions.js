import axios from 'axios' ;

import RoomConstants from '../constants/roomConstants' ;

export const getAllRooms = (keyword = '', currentPage = 1, price=[0, 1000], category, rating = 0) => async (dispatch) => {
    try{

        dispatch({
            type: RoomConstants.ALL_ROOMS_REQUEST
        }) ;


        let link = `/api/v1/room`
        //?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`

        if (category) {
            link = `/api/v1/room?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`
        }

        const { data } = await axios.get(`http://localhost:4000${link}`)
        console.log(data) ;

        dispatch({
            type: RoomConstants.ALL_ROOMS_SUCCESS ,
            payload: data
        })
    }catch(error) {
        console.log(error) ;
        dispatch({
            type: RoomConstants.ALL_ROOMS_FAIL ,
            payload: error
        })
    }
}