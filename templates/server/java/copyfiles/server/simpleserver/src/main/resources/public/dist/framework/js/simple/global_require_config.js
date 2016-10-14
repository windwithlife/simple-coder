/**
 * Created by zhangyq on 2015/7/22.
 */
(function(){
    require.config({
        baseUrl: "/dist/framework/js",
        paths: {
            jquery: "3rd/jquery.min",
            underscore: "3rd/underscore-min",
            backbone: "3rd/backbone-min",
            text: "3rd/text",
            urlparser: "simple/components/url_parser",
            pagenavigator: "simple/components/page_navigator",
            router: "simple/components/router",
            model: "simple/components/model",
            params: "simple/components/params",
            simple: "simple/components/simple",

        },
        shim: {
            underscore: {exports: "_"},
            backbone: {
                deps: ["underscore","jquery"],
                exports: "Backbone"
            },
            simple: {
                deps: ["backbone","underscore","jquery"],
                exports: "Simple"
            }
        }
    });

})();