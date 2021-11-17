import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";

import { roomsReducer } from "./roomReducer";

const persistConfig = {
    key: 'root' ,
    storage ,
    whitelist: ['rooms']
}

const rootReducer = combineReducers({
    rooms: roomsReducer
})

export default 
    persistReducer(persistConfig , 
        
        rootReducer
        ) ;