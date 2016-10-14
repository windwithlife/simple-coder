

var get = function(path, params, cb){
    axios.get(path, params).then(function (response) {
            cb(response);
    }).catch(function (error) {
        console.log(err);
            cb();
    });
}
var post = function(path,params,cb){
    axios.post(path, params).then(function (response) {
           cb(response);
        })
        .catch(function (error) {
            console.log(error);
            cb();
        });
}

module.exports = {
    get:get,
    post:post
}