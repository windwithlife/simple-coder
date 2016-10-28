import Immutable from 'immutable'


const initialItems = Immutable.List([1, 2, 3])

export default function items(state = initialItems, action) {
    switch(action.type) {
        case "UPDATE_ITEM":
            return state.list = action.list;
        default:
            return state
    }
}
