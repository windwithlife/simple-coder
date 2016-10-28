import Immutable from 'immutable'


const initialItems = Immutable.List([1, 2, 3])

export default function items(state = initialItems, action) {
    switch(action.type) {
        case "DELETE_ITEM":
            return state.delete(state.indexOf(action.item))
        case "DELETE_ALL":
            return state.clear()
        default:
            return state
    }
}
