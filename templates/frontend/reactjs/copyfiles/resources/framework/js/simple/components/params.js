/**
 * Created by ctrip on 16/1/6.
 */
define(['urlparser'],function (urlParser) {
  //  var Params = {};
  // var globalUrlParams = urlParser.parseSearch();
    function getFromUrl(key) {
        var value;
        var urlParams = urlParser.parseSearch();
        for (var field in urlParams){
            if (key == field){
                value = urlParams[field];
                return value;
            }
        }
        var urlHashParams = urlParser.parseHash();
        for (var field in urlHashParams){
            if (key == field){
                value = urlHashParams[field];
                return value;
            }
        }
        return value;
    }
    function getFromUrls() {
        var urlParams = urlParser.parseSearch();
    }
    function getFromLocalStorage(key) {
        //var urlParams = urlParser.parseSearch();
    }
    function getParam(key) {
        var urlParam =  getFromUrl(key);
        if (urlParam !=="undefined"){
            return urlParam;
        }
    }
    function Params(key) {
        if (key === 'undefined'){
            return getFromUrls();
        }else{
            return getParam(key);
        }
    }
    return Params;
});