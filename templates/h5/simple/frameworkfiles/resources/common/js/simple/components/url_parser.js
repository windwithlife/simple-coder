define(['jquery'], function ($) {

    var reURL = /^([^:\s]+):\/{2,3}([^\/\s:]+)(?::(\d{1,5}))?(\/[^\?\s#]+)?(\?[^#\s]+)?(#[^\s]+)?/;

    var reSearch = (/(?:[\?&])(\w+)=([^#&\s]*)/g),
        URLLi = "protocol host port path search hash";
    var reHash = (/(?:[\?&])(\w+)=([^#&\s]*)/g);
    var parser = {

        parseURL: function (url) {
            if (!url) {
                url = location.href;
            }

            var arr = url.match(reURL),
                temp = {};

            $.each(URLLi.split(" "), function (i, item) {
                console.log(arr[i+1]);
                console.log(temp[item]);
                temp[item] = arr[i+1];
            });

            console.log(temp);
            return temp;
        },
        getPath: function (url) {
            if (!url) {
                url = location.href;
            }

            var arr = url.match(reURL),
                temp = {};

            $.each(URLLi.split(" "), function (i, item) {
                temp[item] = arr[i+1];
            });

            //var path =  "/" + temp.path.split("/")[1];
            console.log(JSON.stringify(temp));
            var path;
           
            if (temp.path[temp.path.length-1] != '/'){
            	path = temp.path + '/';
            }else{
            	path = temp.path;
            }
            console.log('current path is：' + path);
            return path;
        },

        parseSearch: function (search) {
            if (!search) {
                search = location.search;
            }

            if (search.charAt(0) !== '?') {
                search = '?' + search;
            }

            var temp = {};

            search.replace(reSearch, function (a, f, s) {
                temp[f] = decodeURIComponent(s);
            });

            return temp;
        },

        parseHash: function (hash) {
            if (!hash) {
                var tempArray = location.href.split("#");
                hash = tempArray[1];
                console.log(hash);
            }
            var temp = {};
            hash.replace(reHash, function (a, f, s) {
                temp[f] = decodeURIComponent(s);
            });

            return temp;
        }


    };

    return parser;

});
