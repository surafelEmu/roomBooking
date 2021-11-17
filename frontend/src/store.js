import {createStore , applyMiddleware} from 'redux' ;
import thunk from 'redux-thunk' ;
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducers from './reducers/rootReducers';
import {persistStore} from 'redux-persist' ;

let initialState = {}

const middleware = [thunk] ;
export const store = createStore(rootReducers , initialState , composeWithDevTools(applyMiddleware(...middleware)))
export const persistor = persistStore(store)

export default store ;