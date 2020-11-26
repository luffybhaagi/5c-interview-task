import { combineReducers } from "redux"
import ActivityReducer from "./Reducer/ActivityReducer"

const RootReducer=combineReducers({
    ActivityReducer:ActivityReducer
})

export default RootReducer