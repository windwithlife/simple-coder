import { combineReducers } from 'redux'
import homeReducer from './homeReducer.js'
import listReducer from './listReducer.js'
import addReducer from './addReducer.js'
import updateReducer from './updateReducer.js'
import deleteReducer from './deleteReducer.js'
import filter from './filter'

const rootReducer = combineReducers({
    "homeData":homeReducer,
    "listData":listReducer,
    "updateData":updateReducer,
    "deleteData":deleteReducer,
    "addData":addReducer
})

export default rootReducer
