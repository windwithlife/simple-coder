import model from '../../models/model.js';
export function queryList() {
    return dispatch => {
        model.query(function(response){
            console.log(JSON.stringify(response.data));
            dispatch({type: "HOME_ALL",list:response.data});
        })
    }
}
export function addNew(params) {
    return dispatch => {
        model.add(params,function(response){
            dispatch({type: "ADD_ITEM",list:response.data});
        })
    }
}
export function update(params) {
    return dispatch => {
        model.update(params,function(response){
            dispatch({type: "UPDATE_ITEM",list:response.data});
        })
    }
}
export function remove(params) {
    return dispatch => {
        model.remove(params,function(response){
            dispatch({type: "DELETE_ITEM",list:response.data});
        })
    }
}
export function removeALL(params) {
    return dispatch => {
        model.remove(params,function(response){
            dispatch({type: "DELETE_ALL"});
        })
    }
}

export function filterItem(e) {
    let filterItem = e.target.value

    return {
        type: "FILTER_ITEM",
        filterItem
    }
}
