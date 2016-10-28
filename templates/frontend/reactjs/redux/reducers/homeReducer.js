import Immutable from 'immutable'


const initialItems = Immutable.List([1, 2, 3])

export default function homeReducer(state = initialItems, action) {
    switch(action.type) {
        case "HOME_ALL":
            return state.list = action.list;
        case "DELETE_ALL":
            return state.list.clear();
        default:
            return state
    }
}
