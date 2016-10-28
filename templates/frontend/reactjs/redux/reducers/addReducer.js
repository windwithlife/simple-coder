import Immutable from 'immutable'


const initialItems = Immutable.List([1, 2, 3])

export default function items(state = initialItems, action) {
    switch(action.type) {
        case "ADD_ITEM":
            return state.list.push(state.size !== 0 ? state.get(-1) + 1 : 1)
        default:
            return state
    }
}
